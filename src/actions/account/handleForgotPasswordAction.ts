"use server";

import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/app/schema/account/forgotPasswordSchema";
import { validateForgetPasswordToken } from "./validateForgetPasswordToken";
import prisma from "@/app/api/db";
import bcrypt from "bcryptjs";
import { auth } from "@/app/api/auth/auth";
import signInAction from "@/app/api/auth/signInAction";
import { getTranslations } from "next-intl/server";

export const handleForgotPasswordAction = async (
  formData: ResetPasswordSchemaType,
  email: string,
  tokenId: string
) => {
  try {
    const isSafe = resetPasswordSchema.safeParse(formData);
    if (!isSafe.success) {
      return { message: "Invalid form data", status: 400 };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    const validateUUID = await validateForgetPasswordToken(
      tokenId,
      user?.username!
    );

    if (validateUUID.status !== 200) {
      return { message: validateUUID.message, status: validateUUID.status };
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);
    await prisma.user.update({
      where: { email },
      data: {
        hashedPassword,
      },
    });

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user?.id },
    });

    const session = await auth();
    if (!session) {
      await signInAction({
        username: user?.username!,
        password: formData.password,
      });
    }

    const t = await getTranslations("ForgotPasswordPage");
    return {
      message: t("passwordResetSuccess"),
      status: 200,
    };
  } catch (error) {
    return {
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
