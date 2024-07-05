import PageMessage from "@/components/product/product-message";
import { useTranslations } from "next-intl";
import React from "react";

const NotFoundPage = () => {
  const t = useTranslations("PageMessages");

  return (
    <main className="w-[95%] mx-auto">
      <PageMessage
        title={t("pageNotFound")}
        description={t("pageNotFoundDescription")}
      />
    </main>
  );
};

export default NotFoundPage;
