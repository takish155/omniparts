import { AdminOrderTableContentProps } from "@/app/type/api/admin/admin-order-table-type";
import { formatDate } from "@/components/account/order-card/formatDate";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatToMoney } from "@/lib/formatToMoney";
import { useTranslations } from "next-intl";
import React from "react";
import AdminOrderAction from "./admin-order-action";

const AdminOrderTableContentCard = ({
  data,
}: {
  data: AdminOrderTableContentProps;
}) => {
  const t = useTranslations("OrderedProducts");

  return (
    <TableRow>
      <TableCell>{data.id}</TableCell>
      <TableCell className="font-bold">
        {formatToMoney(
          data.orderedProducts.reduce((acum, total) => acum + total.price, 0),
          "¥"
        )}
      </TableCell>
      <TableCell>{formatDate(new Date(data.createdAt))}</TableCell>
      <TableCell>
        {t(data.status as "processing" | "shipped" | "delivered")}
      </TableCell>
      <TableCell>{data.fullName}</TableCell>
      <TableCell>
        <AdminOrderAction data={data} />
      </TableCell>
    </TableRow>
  );
};

export default AdminOrderTableContentCard;
