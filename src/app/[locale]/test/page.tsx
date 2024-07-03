import prisma from "@/app/api/db";
import ProductPageSkeleton from "@/components/skeleton/product-page-skeleton";

const Page = async () => {
  const product = await prisma.product.findUnique({
    where: { slug: "amd_ryzen_7_7800x3d" },
  });
  return <p>{product?.productPrice}</p>;
};

export default Page;
