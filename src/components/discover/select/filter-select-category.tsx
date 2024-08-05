"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterHandlerContext } from "@/context/FilterHandlerProvider";
import useFilterHandler from "@/hooks/useFilterHandler";
import { categories } from "@/lib/filterData";
import { useTranslations } from "next-intl";
import React from "react";

const FilterSelectCategory = () => {
  const { category, handleUpdateParams } = useFilterHandlerContext() || {};
  const t = useTranslations("DiscoverPage");
  const {} = useFilterHandler();

  if (!handleUpdateParams) return null;

  return (
    <section>
      <h2 className="font-medium text-xl mb-2">{t("categoies")} </h2>
      <ul>
        <li className="text-sm">
          <input
            type="radio"
            name="category"
            value="all"
            id="all"
            checked={!category || category === "all" ? true : false}
            onChange={() => handleUpdateParams("category", "all")}
          />
          <label htmlFor="all" className="ml-2 cursor-pointer">
            {t("all") + ` (${t("categoies")})`}
          </label>
        </li>
        {categories.map((categories) => {
          return (
            <li key={categories} className="text-sm">
              <input
                type="radio"
                name="category"
                value={categories}
                id={categories}
                checked={categories === category ? true : false}
                onChange={() => handleUpdateParams("category", categories)}
              />
              <label htmlFor={categories} className="ml-2 cursor-pointer">
                {t(categories as any)}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );

  // return (
  //   <Select
  //     value={category ?? "all"}
  //     onValueChange={(value) => handleUpdateParams("category", value)}
  //   >
  //     <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
  //       <SelectValue placeholder={t("categoies")} />
  //     </SelectTrigger>
  //     <SelectContent>
  //       {categories.map((category) => {
  //         return (
  //           <SelectItem
  //             value={category}
  //             key={category}
  //             defaultChecked={category === category}
  //           >
  //             {t(category as any)}
  //           </SelectItem>
  //         );
  //       })}
  //       <SelectItem value="all">
  //         {t("all") + `  (${t("categoies")})`}
  //       </SelectItem>
  //     </SelectContent>
  //   </Select>
  // );
};

export default FilterSelectCategory;
