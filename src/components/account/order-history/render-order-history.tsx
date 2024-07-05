"use client";

import { caller } from "@/server";
import React from "react";
import OrderCard from "../order-card/order-card";
import { trpc } from "@/app/_trpc/client";
import OrderCardSkeleton from "../order-card/order-card-skeleton";
import { useTranslations } from "next-intl";

const RenderOrderHistory = () => {
  const t = useTranslations("OrderHistoryPage");
  const { data, isLoading, isError } =
    trpc.account.getShippedProducts.useQuery();

  if (isLoading) return <OrderCardSkeleton />;

  return (
    <section className="flex justify-between flex-wrap">
      {data?.map((order) => {
        return <OrderCard data={order} key={order.id} history={true} />;
      })}
      {data?.length === 0 && <p className="mt-4 mb-[75vh]">{t("noOrders")}</p>}
    </section>
  );
};

export default RenderOrderHistory;
