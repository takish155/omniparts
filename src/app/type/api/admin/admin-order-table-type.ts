export type AdminOrderTableContentProps = {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  fullName: string;
  postalCode: string;
  prefecture: string;
  addressLine1: string;
  addressLine2: string;
  status: string;
  estimatedDeliveryTime: string;
  trackingUrl: string | null;
  orderedProducts: OrderedProducts[];
};

type OrderedProducts = {
  id: string;
  orderId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrderStatusFormProps = {
  orderStatus: string;
  expectedDeliveryDate: string;
  orderId: string;
};
