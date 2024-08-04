"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterHandlerContext } from "@/context/FilterHandlerProvider";
import { ratings } from "@/lib/filterData";
import { useTranslations } from "next-intl";
import React from "react";
import ReactStars from "react-stars";

const FilterSelectRating = () => {
  const { rating, handleUpdateParams } = useFilterHandlerContext() || {};
  const t = useTranslations("DiscoverPage");

  if (!handleUpdateParams) return null;

  return (
    <section>
      <h2 className="font-medium text-xl mb-1">{t("rating")}</h2>
      <ReactStars size={20} value={4.5} />
      <ReactStars size={20} value={4} />
      <ReactStars size={20} value={3} />
      <ReactStars size={20} value={2} />
    </section>
  );

  // return (
  //   <Select
  //     value={rating ?? "all"}
  //     onValueChange={(value) => handleUpdateParams("rating", value)}
  //   >
  //     <SelectTrigger className="w-[30%] min-w-[250px] max-w-[300px]">
  //       <SelectValue placeholder={t("rating")} />
  //     </SelectTrigger>
  //     <SelectContent>
  //       {ratings.map((rating) => {
  //         return (
  //           <SelectItem key={rating} value={rating.toString()}>
  //             {t("aboveRating", { rating })}
  //           </SelectItem>
  //         );
  //       })}
  //       <SelectItem value="all">{t("all") + ` (${t("rating")})`}</SelectItem>
  //     </SelectContent>
  //   </Select>
  // );
};

export default FilterSelectRating;
