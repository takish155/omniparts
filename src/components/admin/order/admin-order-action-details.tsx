import { AdminOrderTableContentProps } from "@/app/type/api/admin/admin-order-table-type";
import { useTranslations } from "next-intl";
import React from "react";
import AdminOrderedActionSection from "./admin-orderder-action-section";
import { formatDate } from "@/components/account/order-card/formatDate";

const AdminOrderActionDetails = ({
  data,
}: {
  data: AdminOrderTableContentProps;
}) => {
  const t = useTranslations("AdminOrderPage");
  const t2 = useTranslations("OrderedProducts");

  return (
    <article>
      <AdminOrderedActionSection
        name={t("customerName")}
        value={data.fullName}
      />
      <AdminOrderedActionSection name={t("customerEmail")} value={data.email} />
      <AdminOrderedActionSection
        name={t("postalCode")}
        value={data.postalCode}
      />
      <AdminOrderedActionSection
        name={t("prefecture")}
        value={data.prefecture}
      />
      <AdminOrderedActionSection
        name={t("addressLine1")}
        value={data.addressLine1}
      />
      {data.addressLine2 && (
        <AdminOrderedActionSection
          name={t("addressLine2")}
          value={data.addressLine2}
        />
      )}
      <AdminOrderedActionSection
        name={t("status")}
        value={t2(data.status as "processing" | "shipped" | "delivered")}
      />
      <AdminOrderedActionSection
        name={t("expectedDeliveryDate")}
        value={formatDate(new Date(data.estimatedDeliveryTime))}
      />
    </article>
  );
};

export default AdminOrderActionDetails;
