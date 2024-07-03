import { router } from "../trpc";
import { getProductRatingRouter } from "./getProductRating";
import { getProductReviewRouter } from "./getProductReviews";
import { getProductStockRouter } from "./getProductStock";
import { productRecommendationRouter } from "./productRecommendation";

export const productPageRouter = router({
  productRecommendation: productRecommendationRouter.productRecommendation,
  getProductStock: getProductStockRouter.getProductStock,
  getProductRating: getProductRatingRouter.getProductRating,
  getProductReview: getProductReviewRouter.getProductReviews,
});
