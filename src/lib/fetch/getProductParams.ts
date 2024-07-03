export const getProductParams = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/generate_static_params/`,
    { cache: "no-store" }
  );
  const data: string[] = await response.json();
  return data.map((slug) => ({ params: { slug } }));
};
