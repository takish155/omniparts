import prisma from "../../db";

export const GET = async (req: Request) => {
  const params = await prisma.product.findMany({ select: { slug: true } });
  return Response.json(params);
};
