import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "../trpc";
import prisma from "@/app/api/db";

export const getAllOrdersRouter = router({
  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });

      const orders = await prisma.order.findMany({
        include: { orderedProducts: true },
      });

      return orders;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching orders",
      });
    }
  }),
});
