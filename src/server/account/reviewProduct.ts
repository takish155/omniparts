import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { caller } from "..";
import prisma from "@/app/api/db";

export const reviewProductRouter = router({
  reviewProduct: authenticatedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        if (!ctx.user)
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You need to be logged in to review a product.",
          });

        const productToReview = await prisma.product.findUnique({
          where: { slug: input },
        });
        if (!productToReview)
          throw new TRPCError({
            code: "NOT_FOUND",
          });
        const hasBeenPurchased = await caller.account.hasBeenPurchased(
          productToReview.productName
        );
        if (!hasBeenPurchased)
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You need to purchase the product to review it.",
          });

        const alreadyReviewed = await prisma.productReview.findFirst({
          where: {
            productId: productToReview.id,
            userId: ctx.user.user?.id,
          },
        });
        if (alreadyReviewed) {
          return {
            productName: productToReview.productName,
            productImage: productToReview.productImage,
            review: alreadyReviewed.review,
            rating: alreadyReviewed.rating,
            status: "200",
          };
        }

        return {
          productName: productToReview.productName,
          productImage: productToReview.productImage,
          status: "200",
        };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
