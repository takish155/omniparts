const { createCallerFactory } = t;
import { accountRouter } from "./account/_accountRouter";
import { adminRouter } from "./admin/_adminRouter";
import { discoverProductRouter } from "./discoverProduct";
import { productPageRouter } from "./product_page/productPageRouter";
import { router, t, publicProcedure } from "./trpc";

export const appRouter = router({
  productPage: productPageRouter,
  discoverProduct: discoverProductRouter.discoverProduct,
  admin: adminRouter,
  account: accountRouter,
});

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});

export type AppRouter = typeof appRouter;
