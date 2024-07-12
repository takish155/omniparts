"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "../ui/button";
import { revalidateTag } from "next/cache";

const RetryButton = () => {
  const t = useTranslations("PageMessages");

  return (
    <Button
      onClick={() => {
        revalidateTag("product");
      }}
    >
      {t("retry")}
    </Button>
  );
};

export default RetryButton;
