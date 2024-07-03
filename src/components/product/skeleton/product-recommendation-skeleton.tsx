import ProductSkeleton from "@/components/skeleton/product-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductRecommendationSkleton = () => {
  return (
    <div className="flex overflow-x-hidden justify-evenly items-center gap-8">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
};

export default ProductRecommendationSkleton;
