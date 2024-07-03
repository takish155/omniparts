import { API_Product } from "@/app/type/api/get-product-info";

export const getProductBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${slug}`
  );
  const data: API_Product = await response.json();
  return data;
};
