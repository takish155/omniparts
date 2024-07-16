import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { validateForgetPasswordToken } from "./validateForgetPasswordToken";

const uuidSchema = z.object({
  tokenId: z.string().uuid(),
});

const validateForgotPasswordTokenAction = async (
  tokenId: string,
  username: string
) => {
  try {
    const t = await getTranslations("ForgotPasswordPage");

    const isValidUUID = uuidSchema.safeParse({ tokenId });
    if (!isValidUUID.success) {
      return { message: t("invalidToken"), status: 400 };
    }

    const res = await validateForgetPasswordToken(tokenId, username);
    return res;
  } catch (error) {
    return { message: "Internal server error", status: 500 };
  }
};

export default validateForgotPasswordTokenAction;
