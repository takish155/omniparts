import prisma from "../../db";

export const GET = async (req: Request) => {
  try {
    const product = await prisma.product.findMany({
      take: 6,
      select: {
        slug: true,
        productName: true,
        productImage: true,
        productPrice: true,
      },
    });

    return Response.json({
      status: 200,
      data: product,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
