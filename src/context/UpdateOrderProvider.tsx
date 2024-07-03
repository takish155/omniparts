"use client";

import { UpdateOrderStatusFormProps } from "@/app/type/api/admin/admin-order-table-type";
import useHandleUpdateOrder, {
  UseHandleUpdateOrder,
} from "@/hooks/useHandleUpdateOrder";
import { ReactNode, createContext, useContext } from "react";

const UpdateOrderContext = createContext<UseHandleUpdateOrder | null>(null);

export const UpdateOrderProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: UpdateOrderStatusFormProps;
}) => {
  const state = useHandleUpdateOrder(
    new Date(data.expectedDeliveryDate),
    data.orderStatus as "processing" | "shipped" | "delivered" | "cancelled",
    data.orderId
  );

  return (
    <UpdateOrderContext.Provider value={state}>
      {children}
    </UpdateOrderContext.Provider>
  );
};

export const useHandleUpdateOrderContext = () => {
  return useContext(UpdateOrderContext);
};
