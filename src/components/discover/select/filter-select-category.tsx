"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterHandlerContext } from "@/context/FilterHandlerProvider";
import { categories } from "@/lib/filterData";
import { useTranslations } from "next-intl";
import React from "react";

const FilterSelectCategory = () => {
  const { category, handleUpdateParams } = useFilterHandlerContext() || {};
  const t = useTranslations("DiscoverPage");

  if (!handleUpdateParams) return null;

  return (
    <Select
      value={category ?? "all"}
      onValueChange={(value) => handleUpdateParams("category", value)}
    >
      <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
        <SelectValue placeholder={t("categoies")} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          return (
            <SelectItem
              value={category}
              key={category}
              defaultChecked={category === category}
            >
              {t(category as any)}
            </SelectItem>
          );
        })}
        <SelectItem value="all">
          {t("all") + `  (${t("categoies")})`}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterSelectCategory;
