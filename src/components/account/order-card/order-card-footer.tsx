import { CardFooter } from "@/components/ui/card";
import { formatToMoney } from "@/lib/formatToMoney";
import { useTranslations } from "next-intl";
import React from "react";

const OrderCardFooter = ({
  totalPrice,
  productCount,
}: {
  totalPrice: number;
  productCount: number;
}) => {
  const t = useTranslations("OrderedProducts");

  return (
    <CardFooter className="bg-secondary">
      <p className="mt-5">
        {t.rich("total", {
          total: () => formatToMoney(totalPrice, "¥"),
          span: () => (
            <span className="font-bold text-2xl">
              {formatToMoney(totalPrice, "¥")}
            </span>
          ),
          count: productCount,
        })}
      </p>
    </CardFooter>
  );
};

export default OrderCardFooter;
