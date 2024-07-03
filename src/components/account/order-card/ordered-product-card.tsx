import React from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import Image from "next/image";
import { formatToMoney } from "@/lib/formatToMoney";
import { OrderedProduct } from "./order-card";

const OrderedProductCard = ({ data }: { data: OrderedProduct }) => {
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex w-full justify-evenly">
          {data.image && (
            <Image
              className="mb-4 w-[30%] h-auto"
              src={data.image}
              alt={data.productName}
              width={500}
              height={500}
            />
          )}
          <div className="w-[65%] self-center">
            <CardTitle className="font-semibold text-lg">
              {data.productName} | x{data.quantity}
            </CardTitle>
            <h3 className="font-bold text-lg">
              {formatToMoney(data.price * data.quantity, "¥")}
            </h3>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default OrderedProductCard;
