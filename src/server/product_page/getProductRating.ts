import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/app/api/db";
import { TRPCError } from "@trpc/server";

export const getProductRatingRouter = router({
  getProductRating: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const product = await prisma.product.findUnique({
          where: { slug: input },
        });
        if (!product) throw new TRPCError({ code: "NOT_FOUND" });

        const productRating = await prisma.productReview.findMany({
          where: { productId: product.id },
        });
        if (productRating.length === 0) return 0;

        const totalRating = productRating.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );
        return totalRating / productRating.length;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
