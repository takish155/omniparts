import { publicProcedure, router } from "./trpc";
import { discoverProductInput } from "./schema/discoverProductInput";
import prisma from "@/app/api/db";

export const discoverProductRouter = router({
  discoverProduct: publicProcedure
    .input(discoverProductInput)
    .query(async (ctx) => {
      try {
        const data = ctx.input;
        const isSafe = discoverProductInput.safeParse(data);
        if (!isSafe.success) {
          throw new Error("Invalid input");
        }

        const products = await prisma.product.findMany({
          where: {
            productCategory:
              data.category === "all" ? undefined : data.category,
            year:
              data.manufacturedYears === "all"
                ? undefined
                : parseInt(data.manufacturedYears),
            productName: { contains: data.seach, mode: "insensitive" },
          },
          select: {
            productName: true,
            productImage: true,
            productPrice: true,
            slug: true,
            reviews: true,
          },
        });

        if (data.price !== "all") {
          return {
            status: 200,
            data: products.filter((product) => {
              if (parseInt(data.price) > product.productPrice) {
                return true;
              }
              return false;
            }),
          };
        }

        return {
          status: 200,
          data: products,
        };
      } catch (error) {
        if (error instanceof Error) {
          return {
            status: 400,
            error: error.message,
          };
        }
        return {
          status: 500,
          error: "Internal Server Error",
        };
      }
    }),
});
