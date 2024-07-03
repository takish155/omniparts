import React from "react";
import ProductCard from "../product-card";
import { getRecommendedParts } from "@/lib/fetch/getRecommendedParts";

const RecommendedPCParts = async () => {
  const response = await getRecommendedParts();
  if (response.status === 500) {
    return null;
  }

  const { data } = response;

  return (
    <section className="w-[95%] mx-auto flex justify-evenly gap-8 flex-wrap">
      {data.map((data) => {
        return (
          <ProductCard
            data={data}
            key={data.productName}
            className="md:w-[400px] max-md:w-[280px] mb-10"
          />
        );
      })}
    </section>
  );
};

export default RecommendedPCParts;
