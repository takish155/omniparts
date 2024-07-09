import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/app/api/db";
import { TRPCError } from "@trpc/server";
import { getTranslations } from "next-intl/server";

export const verifyTokenIdRouter = router({
  verifyTokenId: publicProcedure
    .input(z.string().uuid())
    .query(async ({ input }) => {
      try {
        const tokens = await prisma.verificationToken.findUnique({
          where: { token: input },
        });
        const t = await getTranslations("PageMessages");

        if (!tokens)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: t("tokenNotFound"),
            cause: "TOKEN_NOT_FOUND",
          });

        if (tokens.expires < new Date()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "TOKEN_EXPIRED",
          });
        }

        await prisma.user.update({
          where: { id: tokens.userId },
          data: { emailVerified: new Date() },
        });

        await prisma.verificationToken.delete({
          where: { token: input },
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
