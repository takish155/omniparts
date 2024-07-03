import React from "react";
import { Skeleton } from "../ui/skeleton";
import ProductActionSkeleton from "../product/skeleton/product-action-skeleton";

const ProductPageSkeleton = () => {
  return (
    <div className="flex mt-8 flex-wrap w-[95%] mx-auto justify-evenly">
      <div className="w-[40%] max-md:w-[90%]">
        <Skeleton className="w-full h-[400px]" />
      </div>
      <div className="w-[45%] max-md:w-[90%] max-md:mt-8">
        <Skeleton className="w-full h-[2.5rem] mb-3" />
        <Skeleton className="mb-4 h-7 w-20" />
        <div className="flex justify-end w-full">
          <Skeleton className="w-[30%] h-[3rem] mb-5" />
        </div>
        <ProductActionSkeleton />
        <Skeleton className="w-[100px] h-[2rem] mb-3" />
        <Skeleton className="w-full h-[30vh] mb-8" />
        <Skeleton className="w-[90%] h-[30vh] mb-10" />
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
