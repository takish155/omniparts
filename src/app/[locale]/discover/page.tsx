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
    <main className="w-full mx-auto min-h-screen justify-around flex mt-6 flex-wrap">
      <section className="w-full md:hidden mb-6">
        <h2 className="ml-4 font-medium text-3xl">{t("title")}</h2>
      </section>
      <FilterHandlerProvider>
        <FilterSection />
      </FilterHandlerProvider>
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
