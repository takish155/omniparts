import updateOrderAction from "@/actions/admin/updateOrderAction";
import { trpc } from "@/app/_trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type ServerMessage = {
  message: string | null;
  status: 200 | 400 | 403 | 404 | 500 | "loading";
};

const useHandleUpdateOrder = (
  defaultDate: Date,
  defaultOrderStatus: OrderStatus,
  orderId: string
) => {
  const [date, setDate] = useState<Date>(defaultDate);
  const [status, setStatus] = useState<OrderStatus>(defaultOrderStatus);
  const [serverMessage, setServerMessage] = useState<ServerMessage>();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage({ message: null, status: "loading" });

    const response = await updateOrderAction({
      expectedDeliveryDate: date.toISOString(),
      orderStatus: status,
      orderId: orderId,
    });
    setServerMessage(response);

    if (response.status === 200) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    const queryKey = getQueryKey(trpc.admin.getAllOrders, undefined, "query");
    queryClient.refetchQueries({
      queryKey: queryKey,
    });
  };

  return {
    date,
    setDate,
    status,
    setStatus,
    serverMessage,
    handleSubmit,
  };
};

export type UseHandleUpdateOrder = ReturnType<typeof useHandleUpdateOrder>;
export default useHandleUpdateOrder;
