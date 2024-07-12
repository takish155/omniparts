import { router } from "../trpc";
import { getOrderRouter } from "./getOrder";
import { getShippedProductRouter } from "./getShippedProductRouter";
import { hasBeenPurchasedRouter } from "./hasBeenPurchased";
import { isAccountVerifiedRouter } from "./isAccountVerified";
import { reviewProductRouter } from "./reviewProduct";
import { verifyTokenIdRouter } from "./verifyTokenId";

export const accountRouter = router({
  getOrders: getOrderRouter.getOrder,
  getShippedProducts: getShippedProductRouter.getShippedProduct,
  hasBeenPurchased: hasBeenPurchasedRouter.hasBeenPurchased,
  reviewProduct: reviewProductRouter.reviewProduct,
  isAccountVerified: isAccountVerifiedRouter.isAccountVerified,
  verifyTokenId: verifyTokenIdRouter.verifyTokenId,
});
