"use client";

import { trpc } from "@/app/_trpc/client";
import { Star } from "lucide-react";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductRating = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } =
    trpc.productPage.getProductRating.useQuery(slug);

  if (isLoading) return <Skeleton className="mb-4 h-7 w-20" />;
  if (isError || data === 0) return null;

  return (
    <div className="flex gap-1 font-bold text-2xl items-center mb-4">
      <Star />
      {data}
    </div>
  );
};

export default ProductRating;
