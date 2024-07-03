import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/app/api/db";
import { TRPCError } from "@trpc/server";

export const getProductStockRouter = router({
  getProductStock: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const product = await prisma.product.findUnique({
          where: { slug: input },
          select: { currentStock: true },
        });
        if (!product) {
          const productById = await prisma.product.findUnique({
            where: { id: input },
            select: { currentStock: true },
          });
          if (!productById) throw new TRPCError({ code: "NOT_FOUND" });
          return productById;
        }

        return product;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
});
