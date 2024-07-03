"use client";

import ProductCard from "@/components/product-card";
import ProductSectionSkeleton from "@/components/skeleton/product-section-skeleton";
import useFetchDiscoverProduct from "@/hooks/useFetchDiscoverProduct";
import React from "react";

const ProductSection = () => {
  const { data, isError, isLoading } = useFetchDiscoverProduct();

  if (isLoading) return <ProductSectionSkeleton />;
  if (isError) return null;

  if ("data" in data!) {
    return (
      <section className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center mx-auto">
        {data.data.map((product) => {
          return <ProductCard key={product.productName} data={product} />;
        })}
      </section>
    );
  }
};

export default ProductSection;
