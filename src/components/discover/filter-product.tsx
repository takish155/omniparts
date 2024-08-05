"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FilterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FilterHandlerProvider } from "@/context/FilterHandlerProvider";
import FilterSelectCategory from "./select/filter-select-category";
import FilterSelectPrice from "./select/filter-select-price";
import FilterSelectYear from "./select/filter-select-year";

const FilterProduct = () => {
  const t = useTranslations("DiscoverPage");
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="w-full">
      {windowWidth >= 768 && (
        <FilterHandlerProvider>
          <Separator className="my-3" />
          <FilterSelectCategory />

          {/* <Separator className="my-3" /> | No need for this for now since there is no rating for products
      <FilterSelectRating /> */}

          <Separator className="my-3" />
          <FilterSelectPrice />

          <Separator className="my-3" />
          <FilterSelectYear />
        </FilterHandlerProvider>
      )}
    </div>
  );
};

export default FilterProduct;
