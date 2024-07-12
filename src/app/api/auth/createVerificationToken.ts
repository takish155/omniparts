import prisma from "../db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import VerifyEmailEN from "../../../../emails/en/verify-email";
import VerifyEmailJA from "../../../../emails/ja/verify-email";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

const createVerificationToken = async (
  userId: string,
  username: string,
  email: string,
  locale: string,
  subject: string
) => {
  const oneHour = 1000 * 60 * 60;

  const unhashedToken = uuidv4();
  const hashedToken = await bcrypt.hash(unhashedToken, 10);

  const token = await prisma.verificationToken.create({
    data: {
      userId,
      expires: new Date(Date.now() + oneHour),
      token: hashedToken,
    },
  });

  const tokenUrl = `${process.env
    .NEXT_PUBLIC_BASE_URL!}/${locale}/account/verify/${username}/${unhashedToken}`;

  await resend.emails.send({
    from: "Omniparts <omniparts@takish155.dev>",
    to: email,
    subject: subject,
    react:
      locale === "en"
        ? VerifyEmailEN({ username, url: tokenUrl })
        : VerifyEmailJA({ username, url: tokenUrl }),
  });
};

export default createVerificationToken;
