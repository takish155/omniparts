import { useTranslations } from "next-intl";
import React from "react";
import ProductSpecifications, {
  ProductSpecificationsProps,
} from "./product-specifications";

interface ProductDetailsProps {
  productDetails: string;
  specifications: ProductSpecificationsProps;
}

const ProductDetails = ({
  productDetails,
  specifications,
}: ProductDetailsProps) => {
  const t = useTranslations("ProductPage");

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">{t("details")}</h2>
      <p className="text-lg font-light mb-8">{productDetails}</p>
      <ProductSpecifications data={specifications} />
    </section>
  );
};

export default ProductDetails;
