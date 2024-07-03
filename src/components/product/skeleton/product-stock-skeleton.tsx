import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductStockSkeleton = () => {
  return (
    <div className="flex justify-end">
      <Skeleton className="text-red-600 h-[2rem] w-[40%] font-medium text-right text-2xl mb-4" />
    </div>
  );
};

export default ProductStockSkeleton;
