"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FilterIcon } from "lucide-react";
import dynamic from "next/dynamic";
import FilterProductSkeleton from "@/components/skeleton/filter-product-skeleton";

const FilterProduct = dynamic(() => import("../filter-product"), {
  loading: () => <FilterProductSkeleton />,
});

const FilterSection = () => {
  const t = useTranslations("DiscoverPage");

  return (
    <section className="max-md:hidden w-[160px] pl-4 pr-4">
      <h2 className="font-medium text-2xl mb-4 flex gap-2 items-center">
        <FilterIcon /> {t("filter")}
      </h2>
      <FilterProduct />
    </section>
  );
};

export default FilterSection;
