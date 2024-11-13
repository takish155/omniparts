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
import { revalidateTag } from "next/cache";
import { auth } from "@/app/api/auth/auth";

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
  {}
);

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const productData = getProductBySlug(params.slug);
  const translation = getTranslations("PageMessages");
  const sessionData = auth();
  const [productApiResponse, t, session] = await Promise.all([
    productData,
    translation,
    sessionData,
  ]);

  if (productApiResponse.status === 404) {
    revalidateTag("products");
    return <PageMessage title={"404"} description={t("productNotFound")} />;
  }

  if (productApiResponse.status === 500)
    return <PageMessage title={"500"} description={t("somethingWentWrong")} />;

  const { data } = productApiResponse;

  return (
    <main className="flex mt-8 flex-wrap w-[95%] mx-auto justify-evenly">
      {session && (
        <ReviewProduct
          productName={data.productName}
          productSlug={params.slug}
        />
      )}
      <ProductBreadCrumb
        category={data.productCategory}
        productName={data.productName}
        slug={params.slug}
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

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
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
