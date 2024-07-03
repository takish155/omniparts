"use client";

import { AddProductSchemaType } from "@/app/schema/admin/addProductSchema";
import ProductCard from "@/components/product-card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import useHandleUpdateProduct from "@/hooks/useHandleUpdateProduct";
import ProductForm from "../product-form";

const AdminProductCard = ({
  data,
  productId,
}: {
  data: AddProductSchemaType;
  productId: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <ProductCard
          isAdminProduct={true}
          data={{
            productImage: data.productImage,
            productName: data.productName,
            productPrice: data.productPrice,
            slug: data.slug,
          }}
        />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <ProductForm
          isUpdate={true}
          data={data}
          hook={useHandleUpdateProduct as any}
          productId={productId}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AdminProductCard;
