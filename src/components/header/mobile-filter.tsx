import { FilterHandlerProvider } from "@/context/FilterHandlerProvider";
import React from "react";
import FilterSelectCategory from "../discover/select/filter-select-category";
import FilterSelectYear from "../discover/select/filter-select-year";
import FilterSelectPrice from "../discover/select/filter-select-price";

const MobileFilter = () => {
  return (
    <section className="md:hidden grid grid-cols-2 gap-6">
      <FilterHandlerProvider>
        <FilterSelectCategory />
        <FilterSelectPrice />
        <FilterSelectYear />
      </FilterHandlerProvider>
    </section>
  );
};

export default MobileFilter;
