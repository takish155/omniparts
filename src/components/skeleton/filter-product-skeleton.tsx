import React from "react";
import { Skeleton } from "../ui/skeleton";

const FilterProductSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-[180px] h-[50vh] my-6" />
      <Skeleton className="w-[180px] h-[50vh] my-6" />
      <Skeleton className="w-[180px] h-[50vh] my-6" />
    </div>
  );
};

export default FilterProductSkeleton;
