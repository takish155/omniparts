import FilterSection from "@/components/discover/sections/filter-section";
import ProductSection from "@/components/discover/sections/product-section";
import { Separator } from "@/components/ui/separator";
import { FilterHandlerProvider } from "@/context/FilterHandlerProvider";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";

const DiscoverPage = () => {
  const t = useTranslations("DiscoverPage");

  return (
    <main className="w-[95%] mx-auto">
      <h2 className="text-5xl font-bold mt-8 mb-2">{t("title")}</h2>
      <p className="mb-8">{t("description")}</p>
      <Separator />
      <FilterHandlerProvider>
        <FilterSection />
      </FilterHandlerProvider>
      <Separator className="mb-8" />
      <ProductSection />
    </main>
  );
};

export async function generateMetadata() {
  const t = await getTranslations("DiscoverPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default DiscoverPage;
