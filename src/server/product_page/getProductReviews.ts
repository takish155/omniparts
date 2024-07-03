import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/app/api/db";
import { TRPCError } from "@trpc/server";

export const getProductReviewRouter = router({
  getProductReviews: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const product = await prisma.product.findUnique({
          where: { slug: input },
        });
        if (!product) throw new TRPCError({ code: "NOT_FOUND" });

        const productReviews = await prisma.productReview.findMany({
          where: { productId: product.id },
          include: { user: true },
        });

        const dataToReturn = productReviews.map((review) => {
          return {
            id: review.id,
            rating: review.rating,
            review: review.review,
            username: review.user.username,
          };
        });
        return dataToReturn;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
