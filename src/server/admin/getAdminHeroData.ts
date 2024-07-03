import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "../trpc";
import prisma from "@/app/api/db";

export const getAdminHeroDataRouter = router({
  getAdminHeroData: adminProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to access this resource",
        });
      }

      const totalProduct = await prisma.product.findMany();
      const orders = await prisma.order.findMany({
        include: { orderedProducts: true },
      });

      return {
        totalProduct: totalProduct.length,
        totalOrderToFullfill: orders.reduce((acc, order) => {
          if (order.status === "processing") {
            return acc + 1;
          }
          return acc + 0;
        }, 0),
        totalMade: orders.reduce((acc, order) => {
          return (
            acc +
            order.orderedProducts.reduce((acc, product) => {
              return acc + product.price;
            }, 0)
          );
        }, 0),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
