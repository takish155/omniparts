import { router } from "../trpc";
import { getAdminHeroDataRouter } from "./getAdminHeroData";
import { getAllOrdersRouter } from "./getAllOrders";
import { getAllProductRouter } from "./getAllProduct";

export const adminRouter = router({
  getAllProduct: getAllProductRouter.getAllProduct,
  getAdminHeroData: getAdminHeroDataRouter.getAdminHeroData,
  getAllOrders: getAllOrdersRouter.getAllOrders,
});
