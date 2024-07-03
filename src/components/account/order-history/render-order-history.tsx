"use client";

import { caller } from "@/server";
import React from "react";
import OrderCard from "../order-card/order-card";
import { trpc } from "@/app/_trpc/client";
import OrderCardSkeleton from "../order-card/order-card-skeleton";

const RenderOrderHistory = () => {
  const { data, isLoading, isError } =
    trpc.account.getShippedProducts.useQuery();

  if (isLoading) return <OrderCardSkeleton />;

  return (
    <section className="flex justify-between flex-wrap">
      {data?.map((order) => {
        return <OrderCard data={order} key={order.id} history={true} />;
      })}
    </section>
  );
};

export default RenderOrderHistory;
