import prisma from "@/app/api/db";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcryptjs";

export const validateForgetPasswordToken = async (
  tokenId: string,
  username: string
) => {
  const t = await getTranslations("ForgotPasswordPage");

  const user = await prisma.user.findUnique({
    where: { username },
    select: { passwordReset: true, email: true },
  });
  if (!user) {
    return { message: "User not found", status: 404 };
  }

  const unexpiredToken = user?.passwordReset.filter((token) => {
    return token.expires > new Date();
  });
  if (!unexpiredToken) {
    return { message: t("tokenExpired"), status: 400 };
  }

  let validToken;

  for (const token of unexpiredToken) {
    const isValid = await bcrypt.compare(tokenId, token.token);
    if (isValid) {
      validToken = token;
      break;
    }
  }

  if (!validToken) {
    return { message: t("invalidToken"), status: 400 };
  }

  return { message: user.email!, status: 200 };
};
