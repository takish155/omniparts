import prisma from "../../db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findFirst({
      where: { slug: params.slug },
      include: {
        specifications: { select: { value: true, specification: true } },
      },
    });
    if (!product) throw new Error("PRODUCT_NOT_FOUND");

    return Response.json({
      status: 200,
      data: {
        productName: product.productName,
        productId: product.id,
        productPrice: product.productPrice,
        productDetails: product.productDetails,
        productBrand: product.productBrand,
        productCategory: product.productCategory,
        productImage: product.productImage,
        quantity: product.currentStock,
        year: product.year,
        specification: product.specifications,
        productDetailsJapanese: product.productDetailsJA,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        return Response.json({ status: 404 });
      }
    }
    return Response.json({ status: 500 });
  }
}
