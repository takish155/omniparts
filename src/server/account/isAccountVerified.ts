import prisma from "@/app/api/db";
import { authenticatedProcedure, router } from "../trpc";

export const isAccountVerifiedRouter = router({
  isAccountVerified: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: ctx.user.user?.id },
        select: { emailVerified: true },
      });

      if (!user?.emailVerified) return false;
      return true;
    } catch (error) {
      return false;
    }
  }),
});
