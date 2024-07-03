import RenderOrderCards from "@/components/account/order-card/_render-order-cards";
import { useTranslations } from "next-intl";
import React from "react";

const AccountPage = () => {
  const t = useTranslations("AccountNav");

  return (
    <section className="mt-10 w-full">
      <h2 className="text-3xl font-bold mb-6">{t("orders")}</h2>
      <RenderOrderCards />
    </section>
  );
};

export default AccountPage;
