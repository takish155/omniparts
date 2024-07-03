"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterHandlerContext } from "@/context/FilterHandlerProvider";
import { priceRanges } from "@/lib/filterData";
import { formatToMoney } from "@/lib/formatToMoney";
import { useTranslations } from "next-intl";
import React from "react";

const FilterSelectPrice = () => {
  const { price, handleUpdateParams } = useFilterHandlerContext() || {};
  const t = useTranslations("DiscoverPage");

  if (!handleUpdateParams) return null;

  return (
    <Select
      value={price ?? "all"}
      onValueChange={(value) => handleUpdateParams("price", value)}
    >
      <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
        <SelectValue placeholder={t("price")} />
      </SelectTrigger>
      <SelectContent>
        {priceRanges.map((prices) => {
          return (
            <SelectItem value={prices.toString()} key={prices}>
              {t("below", { price: formatToMoney(prices, "¥") })}
            </SelectItem>
          );
        })}
        <SelectItem value="all">{`${t("all")} (${t("price")})`}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterSelectPrice;
