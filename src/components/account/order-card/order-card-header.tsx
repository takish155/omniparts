import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import React from "react";
import { formatDate } from "./formatDate";

const OrderCardHeader = ({
  orderId,
  estimatedDeliveryDate,
  deliveryStatus,
  history,
}: {
  orderId: string;
  deliveryStatus: string;
  estimatedDeliveryDate: string | null;
  history: boolean;
}) => {
  const t = useTranslations("OrderedProducts");

  return (
    <CardHeader>
      <div>
        <CardTitle className="font-light text-sm">{t("orderId")}</CardTitle>
        <CardDescription className="font-bold text-black text-3xl max-sm:text-lg">
          #{orderId}
        </CardDescription>
      </div>
      {history ? (
        <div className="flex justify-between flex-wrap">
          <Card className="px-2 py-1 mb-4">
            <p className="text-sm">
              {t.rich("arrivedDate", {
                date: () => (
                  <span className="text-green-700 font-bold">
                    {formatDate(new Date(estimatedDeliveryDate!)) ?? "~"}
                  </span>
                ),
              })}
            </p>
          </Card>
        </div>
      ) : (
        <div className="flex justify-between flex-wrap">
          <Card className="px-2 py-1 mb-4">
            <p className="text-sm">
              {t.rich("estimatedArrival", {
                date: () => (
                  <span className="text-green-700 font-bold">
                    {formatDate(new Date(estimatedDeliveryDate!)) ?? "~"}
                  </span>
                ),
              })}
            </p>
          </Card>
          <Card className="px-2 py-1 mb-4">
            <p className="text-sm">
              {t("status")}{" "}
              <span className="font-bold text-green-700">
                {t((deliveryStatus as any) ?? "processing")}
              </span>
            </p>
          </Card>
        </div>
      )}
    </CardHeader>
  );
};

export default OrderCardHeader;
