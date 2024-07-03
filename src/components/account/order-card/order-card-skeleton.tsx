import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const OrderCardSkeleton = () => {
  return (
    <div className="flex justify-between flex-wrap overflow-y-hidden">
      <Skeleton className="w-[45%] max-xl:w-[95%] max-xl:mx-auto mb-8 h-[68vh]" />
      <Skeleton className="w-[45%] max-xl:w-[95%] max-xl:mx-auto mb-8 h-[68vh]" />
      <Skeleton className="w-[45%] max-xl:w-[95%] max-xl:mx-auto mb-8 h-[68vh]" />
      <Skeleton className="w-[45%] max-xl:w-[95%] max-xl:mx-auto mb-8 h-[68vh]" />
    </div>
  );
};

export default OrderCardSkeleton;
