"use client";

import { trpc } from "@/app/_trpc/client";
import ProductSectionSkeleton from "@/components/skeleton/product-section-skeleton";
import React from "react";
import AdminProductCard from "./admin-product-card";
import { useRenderAdminProductContext } from "@/context/RenderAdminProductContext";

const AdminRenderProducts = () => {
  const { data, isLoading, fetchNextPage } =
    useRenderAdminProductContext() || {};

  if (isLoading) return <ProductSectionSkeleton />;
  return (
    <section className="mt-8 grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center mx-auto">
      {data?.pages.map((page) => {
        return page?.products?.map((product) => {
          return (
            <AdminProductCard
              data={{
                productImage: product.productImage,
                productName: product.productName,
                productPrice: product.productPrice,
                currentStock: product.currentStock,
                productBrand: product.productBrand,
                productCategory: product.productCategory,
                productDetails: product.productDetails,
                year: product.year,
                slug: product.slug!,
                specifications: product.specifications.map((spec) => {
                  return {
                    name: spec.specification,
                    value: spec.value,
                  };
                }),
              }}
              productId={product.id}
              key={product.id}
            />
          );
        });
      })}
    </section>
  );
};

export default AdminRenderProducts;
