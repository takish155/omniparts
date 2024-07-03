import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductReviewSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full h-[13rem] mb-6" />
      <Skeleton className="w-full h-[13rem] mb-6" />
      <Skeleton className="w-full h-[13rem] mb-6" />
      <Skeleton className="w-full h-[13rem] mb-6" />
    </>
  );
};

export default ProductReviewSkeleton;
