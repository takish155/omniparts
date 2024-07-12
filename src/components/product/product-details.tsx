import { useLocale, useTranslations } from "next-intl";
import React from "react";
import ProductSpecifications, {
  ProductSpecificationsProps,
} from "./product-specifications";

interface ProductDetailsProps {
  productDetails: string;
  productDetailsJapanese: string | null;
  specifications: ProductSpecificationsProps;
}

const ProductDetails = ({
  productDetails,
  productDetailsJapanese,
  specifications,
}: ProductDetailsProps) => {
  const t = useTranslations("ProductPage");
  const locale = useLocale();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">{t("details")}</h2>
      <p className="text-lg font-light mb-8">
        {locale === "ja" && productDetailsJapanese
          ? productDetailsJapanese
          : productDetails}
      </p>
      <ProductSpecifications data={specifications} />
    </section>
  );
};

export default ProductDetails;
