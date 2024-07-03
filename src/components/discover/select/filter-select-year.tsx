"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterHandlerContext } from "@/context/FilterHandlerProvider";
import { manufacturedYears } from "@/lib/filterData";
import { useTranslations } from "next-intl";
import React from "react";

const FilterSelectYear = () => {
  const { manufacturedYears: years, handleUpdateParams } =
    useFilterHandlerContext() || {};
  const t = useTranslations("DiscoverPage");

  if (!handleUpdateParams) return null;

  return (
    <Select
      value={years ?? "all"}
      onValueChange={(value) => handleUpdateParams("year", value)}
    >
      <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
        <SelectValue placeholder={t("year")} />
      </SelectTrigger>
      <SelectContent>
        {manufacturedYears.map((year) => {
          return (
            <SelectItem value={year.toString()} key={year}>
              {year}
            </SelectItem>
          );
        })}
        <SelectItem value="all">{`${t("all")} (${t("year")})`}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterSelectYear;
