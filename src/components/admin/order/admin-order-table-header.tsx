import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";

const AdminOrderTableHeader = () => {
  const t = useTranslations("AdminOrderPage");

  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t("orderId")}</TableHead>
        <TableHead>{t("total")}</TableHead>
        <TableHead>{t("orderDate")}</TableHead>
        <TableHead>{t("status")}</TableHead>
        <TableHead>{t("billedTo")}</TableHead>
        <TableHead>{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AdminOrderTableHeader;
