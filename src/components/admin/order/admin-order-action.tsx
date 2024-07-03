import { AdminOrderTableContentProps } from "@/app/type/api/admin/admin-order-table-type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import AdminOrderActionDetails from "./admin-order-action-details";
import OrderedProductCard from "@/components/account/order-card/ordered-product-card";
import { Button } from "@/components/ui/button";
import AdminOrderUpdateStatus from "./admin-order-update-status";

const AdminOrderAction = ({ data }: { data: AdminOrderTableContentProps }) => {
  const t = useTranslations("AdminOrderPage");

  return (
    <Sheet>
      <SheetTrigger>
        <InfoIcon />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll md:min-w-[700px] max-md:min-w-[100%]">
        <SheetHeader className="mb-8">
          <SheetTitle>{t("orderDetails")}</SheetTitle>
          <SheetDescription>
            {t("orderDetailsDescription", { orderId: data.id })}
          </SheetDescription>
        </SheetHeader>
        <AdminOrderActionDetails data={data} />
        {data.orderedProducts.map((product) => (
          <OrderedProductCard key={product.id} data={product} />
        ))}
        <SheetFooter>
          <AdminOrderUpdateStatus
            data={{
              expectedDeliveryDate: data.estimatedDeliveryTime,
              orderStatus: data.status,
              orderId: data.id,
            }}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AdminOrderAction;
