import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { categories, categoriesEnum } from "@/lib/filterData";
import prisma from "@/app/api/db";
import { Product, type Prisma } from "@prisma/client";
export type ProductRecommendation =
  | {
      status: 500;
      message: string;
    }
  | {
      status: 200;
      data: Product[];
    };

export const productRecommendationRouter = router({
  productRecommendation: publicProcedure
    .input(
      z.object({
        productCategory: categoriesEnum,
        currentProductId: z.string(),
      })
    )
    .query(async (opts): Promise<ProductRecommendation> => {
      try {
        const { productCategory, currentProductId } = opts.input;

        const products: Product[] =
          await prisma.$queryRaw`SELECT * FROM "Product"
        WHERE "productCategory" = ${productCategory}
        AND id!= ${currentProductId}
        ORDER BY RANDOM()
        LIMIT 5;`;

        return {
          data: products,
          status: 200,
        };
      } catch (error) {
        return {
          message: "Something went wrong",
          status: 500,
        };
      }
    }),
});
