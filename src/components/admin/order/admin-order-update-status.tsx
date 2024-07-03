import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import { UpdateOrderStatusFormProps } from "@/app/type/api/admin/admin-order-table-type";
import MemoizedUpdateOrderStatusForm from "./memoized-update-order-status-form";

const AdminOrderUpdateStatus = ({
  data,
}: {
  data: UpdateOrderStatusFormProps;
}) => {
  const t = useTranslations("AdminOrderPage");

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>{t("updateStatus")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("updateStatus")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("updateDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <MemoizedUpdateOrderStatusForm data={data} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminOrderUpdateStatus;
