import { TRPCError } from "@trpc/server";
import { authenticatedProcedure, router } from "../trpc";
import prisma from "@/app/api/db";

export const getOrderRouter = router({
  getOrder: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      const user = ctx.user.user;

      const orders = await prisma.order.findMany({
        where: {
          email: user?.email!,
          NOT: {
            status: "delivered",
          },
        },
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

      return orders;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
