"use client";

import React from "react";
import { Button } from "../ui/button";
import { Cart, useCartStore } from "@/context/cart";
import { toast } from "sonner";
import useHandleProductAction from "@/hooks/useHandleProductAction";
import ProductStock from "./product-stock";
import { useSession } from "@/context/SessionProvider";
import { useRouter } from "next/navigation";
import ProductActionSkeleton from "./skeleton/product-action-skeleton";

const ProductAction = ({ data }: { data: Cart }) => {
  const {
    t,
    mutate,
    isPending,
    data: stock,
    isLoading,
    isError,
  } = useHandleProductAction(data.slug);
  const { addProduct } = useCartStore();
  const router = useRouter();
  const session = useSession();

  if (isLoading) return <ProductActionSkeleton />;

  return (
    <>
      <ProductStock stock={stock?.currentStock!} />
      <section className="flex justify-between mb-16">
        <Button
          className="w-[45%]"
          onClick={() => {
            addProduct(data, data.quantity);
            toast.success(t("success"), { description: t("productAdded") });
          }}
          disabled={
            isPending || !stock?.currentStock || stock?.currentStock <= 0
          }
        >
          {t("addToCard")}
        </Button>
        <Button
          className="w-[45%]"
          disabled={
            isPending || !stock?.currentStock || stock?.currentStock <= 0
          }
          variant={"secondary"}
          onClick={() => {
            if (!session) {
              toast.error(t("loginToBuy"));
              router.push("/account/signin");
              return;
            }
            mutate([
              {
                productId: data.id,
                quantity: 1,
                name: data.productName,
                price: data.productPrice,
                image: data.image as string,
              },
            ]);
          }}
        >
          {t("buyNow")}
        </Button>
      </section>
    </>
  );
};

export default ProductAction;
