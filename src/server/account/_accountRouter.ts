import { router } from "../trpc";
import { getOrderRouter } from "./getOrder";
import { getShippedProductRouter } from "./getShippedProductRouter";
import { hasBeenPurchasedRouter } from "./hasBeenPurchased";
import { reviewProductRouter } from "./reviewProduct";

export const accountRouter = router({
  getOrders: getOrderRouter.getOrder,
  getShippedProducts: getShippedProductRouter.getShippedProduct,
  hasBeenPurchased: hasBeenPurchasedRouter.hasBeenPurchased,
  reviewProduct: reviewProductRouter.reviewProduct,
});
