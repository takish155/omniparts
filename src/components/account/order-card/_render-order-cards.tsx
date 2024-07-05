"use client";

import { trpc } from "@/app/_trpc/client";
import OrderCard from "./order-card";
import OrderCardSkeleton from "./order-card-skeleton";
import { useTranslations } from "next-intl";

const RenderOrderCards = () => {
  const { data, isLoading, isError } = trpc.account.getOrders.useQuery();
  const t = useTranslations("OrderedProducts");

  if (isLoading) return <OrderCardSkeleton />;

  return (
    <section className="flex justify-between flex-wrap">
      {data?.map((orders) => {
        return <OrderCard data={orders} key={orders.id} />;
      })}
      {data?.length === 0 && <p className="mt-4 mb-[75vh]">{t("noOrders")}</p>}
    </section>
  );
};

export default RenderOrderCards;
