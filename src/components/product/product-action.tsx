"use client";

import React from "react";
import { Button } from "../ui/button";
import { Cart, useCartStore } from "@/context/cart";
import { toast } from "sonner";
import useHandleProductAction from "@/hooks/useHandleProductAction";
import ProductActionSkeleton from "./skeleton/product-action-skeleton";
import ProductStock from "./product-stock";

const ProductAction = ({ data }: { data: Cart }) => {
  const { t, mutate, isPending } = useHandleProductAction(data.slug);
  const { addProduct } = useCartStore();

  return (
    <>
      <ProductStock slug={data.slug} />
      <section className="flex justify-between mb-16">
        <Button
          className="w-[45%]"
          onClick={() => {
            addProduct(data, data.quantity);
            toast.success(t("success"), { description: t("productAdded") });
          }}
        >
          {t("addToCard")}
        </Button>
        <Button
          className="w-[45%]"
          disabled={isPending}
          variant={"secondary"}
          onClick={() =>
            mutate([
              {
                productId: data.id,
                quantity: 1,
                name: data.productName,
                price: data.productPrice,
                image: data.image as string,
              },
            ])
          }
        >
          {t("buyNow")}
        </Button>
      </section>
    </>
  );
};

export default ProductAction;
