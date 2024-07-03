import OrderCardSkeleton from "@/components/account/order-card/order-card-skeleton";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React from "react";

const RenderOrderHistory = dynamic(
  () => import("@/components/account/order-history/render-order-history"),
  {
    loading: () => <OrderCardSkeleton />,
    ssr: false,
  }
);

const OrderHistoryPage = () => {
  const t = useTranslations("OrderHistoryPage");

  return (
    <article className="mt-10 w-full">
      <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
      <RenderOrderHistory />
    </article>
  );
};

export default OrderHistoryPage;
