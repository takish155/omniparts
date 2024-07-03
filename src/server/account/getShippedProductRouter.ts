import { TRPCError } from "@trpc/server";
import { authenticatedProcedure, router } from "../trpc";
import prisma from "@/app/api/db";

export const getShippedProductRouter = router({
  getShippedProduct: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const shippedProducts = await prisma.order.findMany({
        where: { status: "delivered", email: ctx.user.user?.email! },
        select: {
          id: true,
          status: true,
          addressLine1: true,
          estimatedDeliveryTime: true,
          orderedProducts: {
            select: {
              productName: true,
              quantity: true,
              price: true,
              image: true,
            },
          },
        },
      });

      return shippedProducts;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
