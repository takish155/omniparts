import AdminProductIntersect from "@/components/admin/product/admin-product-intersect";
import AdminRenderProducts from "@/components/admin/product/admin-render-products";
import SearchProductInput from "@/components/admin/product/search-product-input";
import { AdminProductProvider } from "@/context/RenderAdminProductContext";
import { useTranslations } from "next-intl";
import React from "react";

const AdminProductPage = () => {
  const t = useTranslations("AdminProductPage");

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-bold">{t("title")}</h2>
      <AdminProductProvider>
        <SearchProductInput />
        <AdminRenderProducts />
        <AdminProductIntersect />
      </AdminProductProvider>
    </section>
  );
};

export default AdminProductPage;
