import { ProductCategory } from "@/components/product/load-product-recommendation";
import prisma from "@/app/api/db";

export const GET = async (req: Request, props: { params: Promise<{ category: ProductCategory }> }) => {
  const params = await props.params;
  try {
    const data = await prisma.product.findMany({
      where: {
        productCategory: params.category,
      },
      take: 5,
      select: {
        productName: true,
        productImage: true,
        productPrice: true,
        slug: true,
      },
    });

    return Response.json({
      status: 200,
      data: data,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
