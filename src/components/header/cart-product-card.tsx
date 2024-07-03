import { Cart, useCartStore } from "@/context/cart";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { formatToMoney } from "@/lib/formatToMoney";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "../ui/skeleton";

const CartProductCard = ({ data }: { data: Cart }) => {
  const t = useTranslations("header");
  const {
    data: stock,
    isLoading,
    refetch,
  } = trpc.productPage.getProductStock.useQuery(data.slug);
  const { addQuantity, lowerQuantity } = useCartStore();
  if (isLoading) return <Skeleton className="w-full h-[20vh]" />;

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex w-full justify-evenly">
          <Image
            className="mb-4 w-[30%] h-auto"
            width={"500"}
            height={"500"}
            src={data.image}
            alt={data.productName}
          />
          <div className="w-[65%] self-center">
            <CardTitle className="font-semibold text-lg max-sm:text-sm">
              {data.productName}
            </CardTitle>
            <h3 className="font-bold text-lg max-sm:text-sm">
              {formatToMoney(data.productPrice, "¥")}
            </h3>
            <div className="flex gap-2 items-center flex-wrap">
              <p className="max-sm:text-sm">
                {t("quantity")}: {data.quantity}
              </p>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  lowerQuantity(data.id, stock?.currentStock!);
                }}
              >
                -
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  addQuantity(data.id, stock?.currentStock!);
                }}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <p className="text-red-600 font-medium text-right text-sm mb-4">
          {t("stockLeft", {
            stock: stock?.currentStock,
          })}
        </p>
      </CardHeader>
    </Card>
  );
};

export default CartProductCard;
