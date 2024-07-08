"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import InputContainer from "@/components/input-container";
import { SelectShipDate } from "./select-ship-date";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useHandleUpdateOrderContext } from "@/context/UpdateOrderProvider";
import { OrderStatus } from "@/hooks/useHandleUpdateOrder";

const UpdateOrderStatusForm = () => {
  const t = useTranslations("AdminOrderPage");
  const { date, status, serverMessage, handleSubmit, setStatus } =
    useHandleUpdateOrderContext() || {};

  const orderStatus = ["processing", "shipped", "delivered", "cancelled"];

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer
        data={{
          error: "",
          label: t("orderStatus"),
          htmlFor: "orderStatus",
          input: (
            <Select
              defaultValue={status}
              onValueChange={(e) => setStatus!(e as OrderStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("orderStatus")} />
              </SelectTrigger>
              <SelectContent>
                {orderStatus.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(status as OrderStatus)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        }}
      />
      <InputContainer
        data={{
          error: "",
          label: t("expectedDeliveryDate"),
          htmlFor: "expectedDeliveryDate",
          input: <SelectShipDate defaultValue={date!} />,
        }}
      />
      <div className="flex gap-4 items-center">
        <Button
          className="mt-2"
          type="submit"
          disabled={serverMessage?.status === "loading"}
        >
          {t("update")}
        </Button>
        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
      </div>
    </form>
  );
};

export default UpdateOrderStatusForm;
