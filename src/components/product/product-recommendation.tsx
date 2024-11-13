import { useTranslations } from "next-intl";
import React from "react";
import dynamic from "next/dynamic";
import ProductRecommendationSkleton from "./skeleton/product-recommendation-skeleton";
import { LoadProductRecommendationsProps } from "./load-product-recommendation";

const LoadProductRecommendations = dynamic(
  () => import("./load-product-recommendation"),
  { loading: () => <ProductRecommendationSkleton /> }
);

const ProductRecommendation = ({
  data,
}: {
  data: LoadProductRecommendationsProps;
}) => {
  const t = useTranslations("ProductPage");

  return (
    <section className="w-full mt-14 mb-16">
      <h2 className="text-3xl font-medium mb-4">{t("recommendation")}</h2>
      <LoadProductRecommendations
        currentProductId={data.currentProductId}
        productCategory={data.productCategory}
      />
    </section>
  );
};

export default ProductRecommendation;
