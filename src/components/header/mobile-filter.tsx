"use client";

import { FilterHandlerProvider } from "@/context/FilterHandlerProvider";
import React, { useEffect, useState } from "react";
import FilterSelectCategory from "../discover/select/filter-select-category";
import FilterSelectYear from "../discover/select/filter-select-year";
import FilterSelectPrice from "../discover/select/filter-select-price";

const MobileFilter = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
    }
  }, []);

  return (
    <section className="md:hidden grid grid-cols-2 gap-6">
      {isMobile && (
        <FilterHandlerProvider>
          <FilterSelectCategory />
          <FilterSelectPrice />
          <FilterSelectYear />
        </FilterHandlerProvider>
      )}
    </section>
  );
};

export default MobileFilter;
