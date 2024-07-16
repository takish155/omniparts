import PageMessage from "@/components/product/product-message";
import { useTranslations } from "next-intl";
import React from "react";

const ForgotPasswordEmailSentPage = () => {
  const t = useTranslations("PageMessages");

  return (
    <main className="w-[95%] mx-auto">
      <PageMessage
        title={t("forgotPasswordEmailSent")}
        description={t("forgotPasswordEmailSentDescription")}
      />
    </main>
  );
};

export default ForgotPasswordEmailSentPage;
