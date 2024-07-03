import React from "react";
import AdminHeroCard from "./admin-hero-card";
import { getTranslations } from "next-intl/server";
import { caller } from "@/server";

const AdminHero = async () => {
  const translations = getTranslations("AdminPage");
  const response = caller.admin.getAdminHeroData();
  const [t, data] = await Promise.all([translations, response]);

  return (
    <section className="flex justify-between mt-8 mb-4">
      <AdminHeroCard title={t("totalProducts")} value={data.totalProduct} />
      <AdminHeroCard
        title={t("totalMade")}
        isMoney={true}
        value={data.totalMade}
      />
      <AdminHeroCard
        title={t("orderToFullfill")}
        value={data.totalOrderToFullfill}
      />
    </section>
  );
};

export default AdminHero;
