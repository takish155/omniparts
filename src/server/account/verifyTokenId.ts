import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/app/api/db";
import { TRPCError } from "@trpc/server";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcryptjs";

export const verifyTokenIdRouter = router({
  verifyTokenId: publicProcedure
    .input(
      z.object({
        tokenId: z.string().uuid(),
        username: z.string().min(3).max(10),
      })
    )
    .query(async ({ input }) => {
      try {
        const t = await getTranslations("PageMessages");

        const user = await prisma.user.findUnique({
          where: { username: input.username },
          select: { verifcationToken: true },
        });

        if (!user?.verifcationToken)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: t("tokenNotFound"),
            cause: "TOKEN_NOT_FOUND",
          });

        const unexpiredToken = user.verifcationToken.filter((token) => {
          return token.expires > new Date();
        });
        if (!unexpiredToken) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: t("tokenExpiredOrInvalid"),
          });
        }

        let validToken;

        for (const token of unexpiredToken) {
          const isValid = await bcrypt.compare(input.tokenId, token.token);
          if (isValid) {
            validToken = token;
            break;
          }
        }
        if (!validToken) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: t("tokenNotFound"),
          });
        }

        const updatedUser = await prisma.user.update({
          where: { username: input.username },
          data: { emailVerified: new Date() },
        });

        await prisma.verificationToken.deleteMany({
          where: { userId: updatedUser.id },
        });

        return { status: 200, message: t("emailVerifiedSuccessDescription") };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.log(error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
