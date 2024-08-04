import React from "react";
import FilterSelectCategory from "../select/filter-select-category";
import FilterSelectRating from "../select/filter-select-rating";
import FilterSelectPrice from "../select/filter-select-price";
import FilterSelectYear from "../select/filter-select-year";
import { useTranslations } from "next-intl";
import { FilterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FilterSection = () => {
  const t = useTranslations("DiscoverPage");

  return (
    <section className="max-md:hidden pl-4 pr-4">
      <h2 className="font-medium text-2xl mb-4 flex gap-2 items-center">
        <FilterIcon /> {t("filter")}
      </h2>

      <Separator className="my-3" />
      <FilterSelectCategory />

      {/* <Separator className="my-3" /> | No need for this for now since there is no rating for products
      <FilterSelectRating /> */}

      <Separator className="my-3" />
      <FilterSelectPrice />

      <Separator className="my-3" />
      <FilterSelectYear />
    </section>
  );
};

export default FilterSection;
