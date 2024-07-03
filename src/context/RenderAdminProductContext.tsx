"use client";

import useRenderAdminProduct, {
  UseRenderAdminProductType,
} from "@/hooks/useRenderAdminProduct";
import { createContext, ReactNode, useContext } from "react";

const RenderAdminProductContext =
  createContext<UseRenderAdminProductType | null>(null);

export const AdminProductProvider = ({ children }: { children: ReactNode }) => {
  const state = useRenderAdminProduct();
  return (
    <RenderAdminProductContext.Provider value={state}>
      {children}
    </RenderAdminProductContext.Provider>
  );
};

export const useRenderAdminProductContext = () => {
  return useContext(RenderAdminProductContext);
};
