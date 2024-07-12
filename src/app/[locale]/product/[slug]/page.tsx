import React from "react";
import ProductInfo from "@/components/product/product-info";
import dynamic from "next/dynamic";
import ProductRecommendation from "@/components/product/product-recommendation";
import ProductReviews from "@/components/product/product-reviews";
import { getTranslations } from "next-intl/server";
import { getProductBySlug } from "@/lib/fetch/getProductBySlug";
import { Skeleton } from "@/components/ui/skeleton";
import PageMessage from "@/components/product/product-message";
import ProductBreadCrumb from "@/components/product/product-breadcrumb";
import { caller } from "@/server";
import { Button } from "@/components/ui/button";
import { revalidateTag } from "next/cache";

const ProductImage = dynamic(
  () => import("@/components/product/product-image"),
  {
    loading: () => (
      <div className="w-[40%] max-md:w-[90%]">
        <Skeleton className="w-full h-[70vh]" />
      </div>
    ),
  }
);

const ReviewProduct = dynamic(
  () => import("@/components/product/review/review-product"),
  {
    ssr: false,
  }
);

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const productData = getProductBySlug(params.slug);
  const translation = getTranslations("PageMessages");
  const [productApiResponse, t] = await Promise.all([productData, translation]);

  if (productApiResponse.status === 404) {
    revalidateTag("products");
    return <PageMessage title={"404"} description={t("productNotFound")} />;
  }

  if (productApiResponse.status === 500)
    return <PageMessage title={"500"} description={t("somethingWentWrong")} />;

  const { data } = productApiResponse;

  return (
    <main className="flex mt-8 flex-wrap w-[95%] mx-auto justify-evenly">
      <ReviewProduct productName={data.productName} productSlug={params.slug} />
      <ProductBreadCrumb
        category={data.productCategory}
        productName={data.productName}
      />
      <ProductImage image={data.productImage} alt={data.productName} />
      <ProductInfo data={data} slug={params.slug} />
      <ProductRecommendation
        data={{
          currentProductId: data.productId,
          productCategory: data.productCategory,
        }}
      />
      <ProductReviews slug={params.slug} />
    </main>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getProductBySlug(params.slug);
  if (response.status === 404) {
    return {
      title: "404",
    };
  }

  if (response.status === 500) {
    return {
      title: "500",
    };
  }

  return {
    title: `${response.data.productName} | Omniparts`,
    description: response.data.productDetails,
  };
}

export default ProductPage;
