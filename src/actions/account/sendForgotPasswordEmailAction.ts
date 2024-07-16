"use server";

import prisma from "@/app/api/db";
import {
  sendForgotPasswordEmailSchema,
  SendForgotPasswordEmailSchemaType,
} from "@/app/schema/account/authSchema";
import { getLocale, getTranslations } from "next-intl/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import ForgotPasswordEN from "../../../emails/en/forgot-password";
import ForgotPasswordJA from "../../../emails/ja/forgot-password";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendForgotPasswordEmailAction = async (
  email: SendForgotPasswordEmailSchemaType
) => {
  try {
    const translation = getTranslations("AccountSecurity");

    const isSafe = sendForgotPasswordEmailSchema.safeParse(email);
    if (!isSafe.success) throw new Error("Invalid email");

    const userExist = prisma.user.findUnique({
      where: {
        email: email.email,
      },
    });
    const [user, t] = await Promise.all([userExist, translation]);
    if (!user) throw new Error(t("emailNotFound"));

    const oneHour = 1000 * 60 * 60;
    const unhashedToken = uuidv4();
    const hashedToken = await bcrypt.hash(unhashedToken, 10);

    console.log(unhashedToken);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + oneHour),
        token: hashedToken,
      },
    });

    const locale = await getLocale();
    const url = `${process.env
      .NEXT_PUBLIC_BASE_URL!}/${locale}/account/forgot-password/${
      user.username
    }/${unhashedToken}`;

    await resend.emails.send({
      from: "Omniparts <omniparts@takish155.dev>",
      to: user.email,
      subject: t("forgotPasswordRequest"),
      react:
        locale === "en"
          ? ForgotPasswordEN({ username: user.username!, url })
          : ForgotPasswordJA({ username: user.username!, url }),
    });

    return { message: "SUCCESS", status: 200 };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: 400 };
    }

    return { message: "An error occurred", status: 500 };
  }
};

export default sendForgotPasswordEmailAction;
