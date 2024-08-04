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
    <section>
      <h2 className="font-medium text-xl mb-1">{t("price")}</h2>
      <ul>
        <li className="text-sm">
          <input
            type="radio"
            name="price"
            value="all"
            id="all"
            checked={!price || price === "all" ? true : false}
            onChange={() => handleUpdateParams("price", "all")}
          />
          <label htmlFor="all" className="ml-2 cursor-pointer">
            {t("all") + ` (${t("price")})`}
          </label>
        </li>
        {priceRanges.map((prices) => {
          return (
            <li key={prices} className="text-sm">
              <input
                type="radio"
                name="price"
                value={prices}
                id={prices.toString()}
                checked={prices === parseInt(price!) ? true : false}
                onChange={() => handleUpdateParams("price", prices.toString())}
              />
              <label
                htmlFor={prices.toString()}
                className="ml-2 cursor-pointer"
              >
                {t("below", {
                  price: formatToMoney(prices, "¥"),
                })}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );

  // return (
  //   <Select
  //     value={price ?? "all"}
  //     onValueChange={(value) => handleUpdateParams("price", value)}
  //   >
  //     <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
  //       <SelectValue placeholder={t("price")} />
  //     </SelectTrigger>
  //     <SelectContent>
  //       {priceRanges.map((prices) => {
  //         return (
  //           <SelectItem value={prices.toString()} key={prices}>
  //             {t("below", { price: formatToMoney(prices, "¥") })}
  //           </SelectItem>
  //         );
  //       })}
  //       <SelectItem value="all">{`${t("all")} (${t("price")})`}</SelectItem>
  //     </SelectContent>
  //   </Select>
  // );
};

export default FilterSelectPrice;
