"use client";

import { trpc } from "@/app/_trpc/client";
import { useTranslations } from "next-intl";
import ProductStockSkeleton from "./skeleton/product-stock-skeleton";

const ProductStock = ({ stock }: { stock: number }) => {
  const t = useTranslations("ProductPage");

  if (stock > 20) return null;

  return (
    <section>
      <p className="text-red-600 font-medium text-right text-lg mb-4">
        {stock >= 0
          ? t("stockLeft", {
              stock: stock,
            })
          : t("outOfStock")}
      </p>
    </section>
  );
};

export default ProductStock;
