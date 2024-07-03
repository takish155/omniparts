import { UpdateOrderProvider } from "@/context/UpdateOrderProvider";
import React, { memo } from "react";
import UpdateOrderStatusForm from "./update-order-status-form";
import { UpdateOrderStatusFormProps } from "@/app/type/api/admin/admin-order-table-type";

const MemoizedUpdateOrderStatusForm = ({
  data,
}: {
  data: UpdateOrderStatusFormProps;
}) => {
  return (
    <UpdateOrderProvider data={data}>
      <UpdateOrderStatusForm />
    </UpdateOrderProvider>
  );
};

export default memo(MemoizedUpdateOrderStatusForm);
