import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";
import prisma from "@/app/api/db";

export const hasBeenPurchasedRouter = router({
  hasBeenPurchased: authenticatedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const { user: session } = ctx.user;
        if (!session) return false;

        const orders = await prisma.order.findMany({
          where: {
            email: session?.email!,
            status: "delivered",
          },
          include: {
            orderedProducts: {
              where: {
                productName: { equals: input },
              },
            },
          },
        });

        const hasProduct = orders.some(
          (order) => order.orderedProducts.length > 0
        );
        return hasProduct ? true : false;
      } catch (error) {
        return false;
      }
    }),
});
