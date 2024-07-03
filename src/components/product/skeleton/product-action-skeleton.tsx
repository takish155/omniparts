import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductActionSkeleton = () => {
  return (
    <div className="flex justify-between mb-16">
      <Skeleton className="w-[45%] h-10" />
      <Skeleton className="w-[45%] h-10" />
    </div>
  );
};

export default ProductActionSkeleton;
