"use client";

import ProductCard from "@/components/product-card";
import ProductSectionSkeleton from "@/components/skeleton/product-section-skeleton";
import useFetchDiscoverProduct from "@/hooks/useFetchDiscoverProduct";
import { useTranslations } from "next-intl";
import React from "react";

const ProductSection = () => {
  const { data, isError, isLoading } = useFetchDiscoverProduct();
  const t = useTranslations("DiscoverPage");

  if (isLoading) return <ProductSectionSkeleton />;
  if (isError) return null;

  if ("data" in data!) {
    if (data.data.length === 0) {
      return <p className="mt-4 mb-[75vh]">{t("noProducts")}</p>;
    }
    return (
      <section className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center mx-auto gap-8">
        {data.data.map((product) => {
          return <ProductCard key={product.productName} data={product} />;
        })}
      </section>
    );
  }
};

export default ProductSection;
