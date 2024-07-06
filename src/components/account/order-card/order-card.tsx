import React from "react";
import { Card, CardContent } from "../../ui/card";
import OrderedProductCard from "./ordered-product-card";
import OrderCardHeader from "./order-card-header";
import OrderCardFooter from "./order-card-footer";

export interface OrderedProduct {
  productName: string;
  quantity: number;
  price: number;
  image: string;
}
interface OrderCardProps {
  id: string;
  addressLine1: string;
  status: string;
  estimatedDeliveryTime: string | null;
  orderedProducts: OrderedProduct[];
}

const OrderCard = ({
  data,
  history = false,
}: {
  data: OrderCardProps;
  history?: boolean;
}) => {
  const totalPrice = data.orderedProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const getTotalProductCount = () => {
    return data.orderedProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
  };

  return (
    <Card className="w-[45%] max-xl:w-[95%] max-xl:mx-auto mb-8">
      <OrderCardHeader
        orderId={data.id}
        deliveryStatus={data.status}
        estimatedDeliveryDate={data.estimatedDeliveryTime}
        history={history}
      />
      <CardContent className="overflow-y-scroll max-h-[40vh] pt-4">
        {data.orderedProducts.map((product) => {
          return (
            <OrderedProductCard data={product} key={product.productName} />
          );
        })}
      </CardContent>
      <OrderCardFooter
        productCount={getTotalProductCount()}
        totalPrice={totalPrice}
      />
    </Card>
  );
};

export default OrderCard;
