"use server";

import {
  SignUpSchemaType,
  signUpSchema,
} from "@/app/schema/account/authSchema";
import prisma from "../db";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcryptjs";
import signInAction from "./signInAction";

const signUpAction = async (data: SignUpSchemaType) => {
  try {
    const isSafe = signUpSchema.safeParse(data);
    if (!isSafe.success) {
      throw new Error("Invalid data");
    }

    const { username, email, password } = data;

    const usernameExist = prisma.user.findUnique({
      where: { username },
    });

    const translation = getTranslations("SignUpPage");
    const [usernameFound, t] = await Promise.all([usernameExist, translation]);

    if (usernameFound) {
      throw new Error(t("usernameTakenError"));
    }

    const emailExist = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExist) {
      throw new Error(t("emailTakenError"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    await signInAction({ username, password });
    return { message: t("signUpComplete"), status: 200 };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { message: error.message, status: 400 };
    }
    return { message: "An error occurred", status: 500 };
  }
};

export default signUpAction;
