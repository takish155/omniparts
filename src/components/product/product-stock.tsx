"use client";

import { trpc } from "@/app/_trpc/client";
import { useTranslations } from "next-intl";
import ProductStockSkeleton from "./skeleton/product-stock-skeleton";

const ProductStock = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } =
    trpc.productPage.getProductStock.useQuery(slug);
  const t = useTranslations("ProductPage");

  if (isLoading) return <ProductStockSkeleton />;
  if (isError) return null;
  if (data?.currentStock! > 20) return null;

  return (
    <section>
      <p className="text-red-600 font-medium text-right text-lg mb-4">
        {t("stockLeft", {
          stock: data?.currentStock,
        })}
      </p>
    </section>
  );
};

export default ProductStock;
