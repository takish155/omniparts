"use client";

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
    <section>
      <h2 className="font-medium text-xl mb-2">{t("year")} </h2>
      <ul>
        <li className="text-sm">
          <input
            type="radio"
            name="year"
            value="all"
            id="all"
            checked={!years || years === "all" ? true : false}
            onChange={() => handleUpdateParams("year", "all")}
          />
          <label htmlFor="all" className="ml-2 cursor-pointer">
            {t("all") + ` (${t("year")})`}
          </label>
        </li>
        {manufacturedYears.map((year) => {
          return (
            <li key={year} className="text-sm">
              <input
                type="radio"
                name="year"
                value={year}
                id={year.toString()}
                checked={parseInt(years!) === year ? true : false}
                onChange={() => handleUpdateParams("year", year.toString())}
              />
              <label htmlFor={year.toString()} className="ml-2 cursor-pointer">
                {year}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );

  // return (
  //   <Select
  //     value={years ?? "all"}
  //     onValueChange={(value) => handleUpdateParams("year", value)}
  //   >
  //     <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
  //       <SelectValue placeholder={t("year")} />
  //     </SelectTrigger>
  //     <SelectContent>
  //       {manufacturedYears.map((year) => {
  //         return (
  //           <SelectItem value={year.toString()} key={year}>
  //             {year}
  //           </SelectItem>
  //         );
  //       })}
  //       <SelectItem value="all">{`${t("all")} (${t("year")})`}</SelectItem>
  //     </SelectContent>
  //   </Select>
  // );
};

export default FilterSelectYear;
