"use client";

import ProductCard from "@/components/product-card";
import ProductSectionSkeleton from "@/components/skeleton/product-section-skeleton";
import useFetchDiscoverProduct from "@/hooks/useFetchDiscoverProduct";
import useFilterHandler from "@/hooks/useFilterHandler";
import { useTranslations } from "next-intl";
import React from "react";

const ProductSection = () => {
  const { data, isError, isLoading } = useFetchDiscoverProduct();
  const { query } = useFilterHandler();
  const t = useTranslations("DiscoverPage");

  if (isLoading) return <ProductSectionSkeleton />;
  if (isError) return null;

  if ("data" in data!) {
    if (data.data.length === 0) {
      return (
        <div className="flex-grow h-screen">
          {query && (
            <div className="mb-10 ml-4">
              <p className="text-lg">
                {t.rich("searchFor", {
                  span: () => <span className="font-bold">{query}</span>,
                })}
              </p>
            </div>
          )}
          <p className="ml-8 mt-4 flex-grow font-light">{t("noProducts")}</p>
        </div>
      );
    }
    return (
      <div className="flex-grow">
        {query && (
          <div className="mb-6 ml-4">
            <p className="text-lg">
              {t.rich("searchFor", {
                span: () => <span className="font-bold">{query}</span>,
              })}
            </p>
          </div>
        )}
        <section className="flex-grow grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-items-center mx-auto">
          {data.data.map((product) => {
            return <ProductCard key={product.productImage} data={product} />;
          })}
        </section>
      </div>
    );
  }
};

export default ProductSection;
