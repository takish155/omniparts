import { caller } from "@/server";
import { TRPCError } from "@trpc/server";

export const getReviewResponse = async (slug: string) => {
  try {
    const response = await caller.account.reviewProduct(slug);
    return response;
  } catch (error) {
    if (error instanceof TRPCError) {
      return {
        productName: null,
        productImage: null,
        review: null,
        rating: null,
        status: error.code,
      };
    }
  }
};
