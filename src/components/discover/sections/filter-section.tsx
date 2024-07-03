import { ListFilterIcon } from "lucide-react";
import React from "react";
import FilterSelectCategory from "../select/filter-select-category";
import FilterSelectRating from "../select/filter-select-rating";
import FilterSelectPrice from "../select/filter-select-price";
import FilterSelectYear from "../select/filter-select-year";

const FilterSection = () => {
  return (
    <section className="my-4 flex gap-8 flex-wrap items-center justify-center">
      <ListFilterIcon size={30} />
      <FilterSelectCategory />
      <FilterSelectRating />
      <FilterSelectPrice />
      <FilterSelectYear />
    </section>
  );
};

export default FilterSection;
