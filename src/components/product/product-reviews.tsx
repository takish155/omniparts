import { useTranslations } from "next-intl";
import React from "react";
import ProductReviewCard from "./product-review-card";
import dynamic from "next/dynamic";
import ProductReviewSkeleton from "./skeleton/product-review-skeleton";

const LoadProductReviews = dynamic(() => import("./load-product-review"), {
  ssr: false,
  loading: () => <ProductReviewSkeleton />,
});

const ProductReviews = ({ slug }: { slug: string }) => {
  const t = useTranslations("ProductPage");

  return (
    <section className="max-w-[900px] mx-auto w-[90%] mb-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{t("reviews")}</h2>
      <LoadProductReviews slug={slug} />
    </section>
  );
};

export default ProductReviews;
