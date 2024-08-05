import { formatToMoney } from "@/lib/formatToMoney";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import ProductStockSkeleton from "./skeleton/product-stock-skeleton";

const ProductRating = dynamic(() => import("./product-rating"), {
  ssr: false,
  loading: () => <Skeleton className="mb-4 h-7 w-20" />,
});

const ProductHeader = ({
  productPrice,
  productTitle,
  slug,
}: {
  productTitle: string;
  productPrice: number;
  slug: string;
}) => {
  const t = useTranslations("ProductPage");

  return (
    <section className="mb-5">
      <h2 className="max-md:text-xl text-4xl font-bold mb-3">{productTitle}</h2>
      <ProductRating slug={slug} />
      <p className="font-medium max-md:text-sm text-right">
        ¥{" "}
        <span className="text-4xl max-md:text-xl">
          {formatToMoney(productPrice, "")}
        </span>{" "}
        ({t("taxIncluded")})
      </p>
    </section>
  );
};

export default ProductHeader;
