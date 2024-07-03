"use client";

import React from "react";
import ProductCard from "../product-card";
import { trpc } from "@/context/QueryProvider";
import ProductRecommendationSkleton from "./skeleton/product-recommendation-skeleton";

export type ProductCategory =
  | "cpu"
  | "motherboard"
  | "memory_ram"
  | "gpu"
  | "storage"
  | "psu"
  | "cooling_fans";

export interface LoadProductRecommendationsProps {
  currentProductId: string;
  productCategory: ProductCategory;
}

const LoadProductRecommendations = ({
  productCategory,
  currentProductId,
}: LoadProductRecommendationsProps) => {
  const {
    data: response,
    isLoading,
    isError,
  } = trpc.productPage.productRecommendation.useQuery({
    currentProductId,
    productCategory,
  });

  if (isLoading) return <ProductRecommendationSkleton />;
  if (isError || response?.status === 500) return <p>Error...</p>;

  return (
    <section className="flex overflow-x-scroll 2xl:overflow-x-hidden overflow-y-hidden justify-evenly items-center gap-8">
      {response?.data.map((product) => {
        return (
          <ProductCard
            key={product.id}
            className="min-w-[280px] h-[50vh] mb-4"
            data={{
              productName: product.productName,
              productPrice: product.productPrice,
              productImage: product.productImage,
              slug: product.slug,
            }}
          />
        );
      })}
    </section>
  );
};

export default LoadProductRecommendations;
