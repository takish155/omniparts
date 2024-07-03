import { RecommendedResponse } from "@/app/type/api/home-recommendation";
import { ProductCategory } from "@/components/product/load-product-recommendation";

export const getRecommendedParts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/home/recommended_parts`
  );
  const data: RecommendedResponse = await response.json();
  return data;
};
