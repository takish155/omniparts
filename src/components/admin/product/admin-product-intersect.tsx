"use client";

import useRenderAdminProduct from "@/hooks/useRenderAdminProduct";
import React from "react";

const AdminProductIntersect = () => {
  const { ref, isLoading } = useRenderAdminProduct();

  if (isLoading) return null;

  return <div ref={ref} className="p-4" />;
};

export default AdminProductIntersect;
