import React from "react";
import ProductHeader from "./product-header";
import ProductDetails from "./product-details";
import dynamic from "next/dynamic";
import ProductActionSkeleton from "./skeleton/product-action-skeleton";
import { ProductInfoProps } from "@/app/type/api/get-product-info";

const ProductAction = dynamic(() => import("./product-action"), {
  loading: () => <ProductActionSkeleton />,
});

const ProductInfo = ({
  data,
  slug,
}: {
  data: ProductInfoProps;
  slug: string;
}) => {
  return (
    <section className="w-[45%] max-md:w-[90%] max-md:mt-8">
      <ProductHeader
        productPrice={data.productPrice}
        productTitle={data.productName}
        slug={slug}
      />
      <ProductAction
        data={{
          id: data.productId,
          image: data.productImage,
          productName: data.productName,
          productPrice: data.productPrice,
          quantity: data.quantity,
          slug: slug,
        }}
      />
      <ProductDetails
        productDetails={data.productDetails}
        productDetailsJapanese={data.productDetailsJapanese}
        specifications={{
          brand: data.productBrand,
          category: data.productCategory,
          year: data.year,
          other_specification: data.specification,
        }}
      />
    </section>
  );
};

export default ProductInfo;
