import PageMessage from "@/components/product/product-message";
import { useTranslations } from "next-intl";
import React from "react";

const OrderSuccessPage = () => {
  const t = useTranslations("PageMessages");

  return (
    <main className="w-[95%] mx-auto">
      <PageMessage
        title={t("orderSuccess")}
        description={t("orderSuccessDescription")}
      />
    </main>
  );
};

export default OrderSuccessPage;
