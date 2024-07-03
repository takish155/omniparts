import { SelectShipDate } from "@/components/admin/order/select-ship-date";
import AdminOrderTable from "@/components/admin/order/table";
import { useTranslations } from "next-intl";
import React from "react";

const OrderPage = () => {
  const t = useTranslations("AdminOrderPage");

  return (
    <>
      <h2 className="text-4xl font-bold mt-8 mb-4">{t("title")}</h2>
      <AdminOrderTable />
    </>
  );
};

export default OrderPage;
