"use client";

import PageMessage from "@/components/product/product-message";
import { useTranslations } from "next-intl";
import React from "react";

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  const t = useTranslations("PageMessages");

  return (
    <main>
      <PageMessage
        title={t("500title")}
        description={t("somethingWentWrong")}
      />
    </main>
  );
};

export default ErrorPage;
