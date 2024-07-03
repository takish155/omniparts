import React from "react";
import { Skeleton } from "../ui/skeleton";
import ProductSkeleton from "./product-skeleton";

const FeaturedSectionSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[95%] mx-auto h-[60vh] mb-5" />
      <div className="w-[90%] mx-auto mb-12">
        <Skeleton className="h-8 w-[15rem] mb-4" />
        <section className="flex mb-8 flex-wrap justify-evenly">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </section>
        <div className="flex justify-end">
          <Skeleton className="w-[10rem] h-[3rem]" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSectionSkeleton;
