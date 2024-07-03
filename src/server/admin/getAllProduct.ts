import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "../trpc";
import prisma from "@/app/api/db";
import { z } from "zod";

export const getAllProductRouter = router({
  getAllProduct: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        if (!ctx.user) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        if (!input.cursor) {
          const products = await prisma.product.findMany({
            include: { specifications: true },
            where: {
              productName: {
                contains: input.search ?? "",
                mode: "insensitive",
              },
            },
            take: 10,
          });
          return { products, cursor: products[products.length - 1].id };
        }

        const products = await prisma.product.findMany({
          include: { specifications: true },
          where: {
            productName: { contains: input.search ?? "", mode: "insensitive" },
          },
          take: 10,
          skip: 1,
          cursor: { id: input.cursor },
        });
        return { products, cursor: products[products.length - 1].id };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
});
