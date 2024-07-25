import prisma from "@/app/api/db";
import ProductPageSkeleton from "@/components/skeleton/product-page-skeleton";
import Loading from "../product/loading";
import LoadingSpinner from "../loading";

const Page = async () => {
  return <LoadingSpinner />;
};

export default Page;
