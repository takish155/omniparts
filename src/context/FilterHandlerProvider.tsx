"use client";

import useFilterHandler, { FilterHandler } from "@/hooks/useFilterHandler";
import { createContext, ReactNode, useContext } from "react";

const FilterHandlerContext = createContext<FilterHandler | undefined>(
  undefined
);

export const FilterHandlerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const state = useFilterHandler();

  return (
    <FilterHandlerContext.Provider value={state}>
      {children}
    </FilterHandlerContext.Provider>
  );
};

export const useFilterHandlerContext = () => {
  return useContext(FilterHandlerContext);
};
