"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/db";
import {
  UpdatePasswordSchemaType,
  updatePasswordSchema,
} from "@/app/schema/account/updatePasswordSchema";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";

export const updatePasswordAction = async (data: UpdatePasswordSchemaType) => {
  try {
    const isDataSafe = updatePasswordSchema.safeParse(data);
    if (!isDataSafe.success) {
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
    if (data.newPassword !== data.confirmPassword) {
      throw new Error(t("passwordsDoNotMatch"));
    }
    if (data.newPassword === data.currentPassword) {
      throw new Error(t("samePasswordError"));
    }

    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.hashedPassword!
    );
    if (!isPasswordValid) {
      throw new Error(t("invalidPasswordError"));
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await prisma.user.update({
      where: { id: session.user?.id },
      data: { hashedPassword },
    });

    return { message: t("passwordUpdated"), status: 200 };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: 400 };
    }
    return { message: "An error occurred", status: 400 };
  }
};
