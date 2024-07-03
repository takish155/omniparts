"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/db";
import {
  UpdateUsernameSchemaType,
  updateUsernameSchema,
} from "@/app/schema/account/updateUsernameSchema";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";

export const updateUsernameAction = async (data: UpdateUsernameSchemaType) => {
  try {
    const dataIsSafe = updateUsernameSchema.safeParse(data);
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

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.hashedPassword!
    );
    const t = await getTranslations("AccountSecurity");
    if (!isPasswordValid) {
      throw new Error(t("invalidPasswordError"));
    }

    if (data.newUsername === user.username) {
      throw new Error(t("sameUsernameError"));
    }

    const usernameExists = await prisma.user.findUnique({
      where: { username: data.newUsername },
    });
    if (usernameExists) {
      throw new Error(t("usernameAlreadyTaken"));
    }

    await prisma.user.update({
      where: { id: session.user?.id },
      data: { username: data.newUsername },
    });

    return { message: t("usernameUpdated"), status: 200 };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: 400 };
    }
    return { message: "Something went wrong", status: 500 };
  }
};
