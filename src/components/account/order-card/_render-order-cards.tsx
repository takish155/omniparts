"use client";

import { trpc } from "@/app/_trpc/client";
import OrderCard from "./order-card";
import OrderCardSkeleton from "./order-card-skeleton";

const RenderOrderCards = () => {
  const { data, isLoading, isError } = trpc.account.getOrders.useQuery();
  if (isLoading) return <OrderCardSkeleton />;

  return (
    <section className="flex justify-between flex-wrap">
      {data?.map((orders) => {
        return <OrderCard data={orders} key={orders.id} />;
      })}
    </section>
  );
};

export default RenderOrderCards;
