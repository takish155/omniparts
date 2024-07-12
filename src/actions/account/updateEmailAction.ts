"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/db";
import {
  UpdateEmailSchemaType,
  updateEmailSchema,
} from "@/app/schema/account/updateEmailSchema";
import { getLocale, getTranslations } from "next-intl/server";
import bcrypt from "bcryptjs";
import createVerificationToken from "@/app/api/auth/createVerificationToken";

export const updateEmailAction = async (data: UpdateEmailSchemaType) => {
  try {
    const dataIsSafe = updateEmailSchema.safeParse(data);
    if (!dataIsSafe.success) {
      throw new Error("Invalid data");
    }

    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const t = await getTranslations("AccountSecurity");
    if (user.email === data.newEmail) {
      throw new Error(t("sameEmailError"));
    }

    const emailExists = await prisma.user.findUnique({
      where: { email: data.newEmail },
    });
    if (emailExists) {
      throw new Error(t("emailAlreadyTaken"));
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.hashedPassword!
    );
    if (!passwordMatch) {
      throw new Error(t("incorrectPassword"));
    }

    await prisma.user.update({
      where: { id: session.user?.id },
      data: { email: data.newEmail, emailVerified: null },
    });

    const locale = await getLocale();
    await createVerificationToken(
      user.id,
      user.username!,
      data.newEmail,
      locale,
      t("emailVerification")
    );

    return { message: t("emailUpdated"), status: 200 };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: 400 };
    }
    return { message: "An error occurred", status: 400 };
  }
};
