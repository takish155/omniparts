"use client";

import PageMessage from "@/components/product/product-message";
import { useTranslations } from "next-intl";
import React from "react";

const GlobalError = () => {
  const t = useTranslations("PageMessages");

  return (
    <html>
      <body>
        <main>
          <PageMessage
            title={t("500title")}
            description={t("somethingWentWrong")}
          />
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
