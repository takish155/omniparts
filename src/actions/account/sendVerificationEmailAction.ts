"use server";

import { auth } from "@/app/api/auth/auth";
import createVerificationToken from "@/app/api/auth/createVerificationToken";
import prisma from "@/app/api/db";
import { getLocale, getTranslations } from "next-intl/server";

const sendVerificationEmailAction = async () => {
  try {
    const session = await auth();
    const t = await getTranslations("PageMessages");

    if (!session) {
      return { status: 400, message: t("notLoggedIn") };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });
    if (!user) {
      return { status: 400, message: t("userNotFound") };
    }

    if (user.emailVerified) {
      return { status: 400, message: t("emailAlreadyVerified") };
    }

    const locale = await getLocale();

    await createVerificationToken(
      user.id,
      user.username!,
      user.email,
      locale,
      t("verifyYourEmail")
    );

    return {
      status: 200,
      message: t("verificationEmailSent"),
    };
  } catch (error) {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

export default sendVerificationEmailAction;
