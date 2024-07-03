import { trpc } from "@/app/_trpc/client";
import {
  Category,
  ManufacturedYears,
  Price,
  Rating,
} from "@/server/schema/discoverProductInput";
import { useEffect } from "react";
import useFilterHandler from "./useFilterHandler";

const useFetchDiscoverProduct = () => {
  const { category, rating, price, manufacturedYears } = useFilterHandler();

  const { data, isLoading, isError, refetch } = trpc.discoverProduct.useQuery({
    category: (category as Category) ?? "all",
    rating: (rating as Rating) ?? "all",
    price: (price as Price) ?? "all",
    manufacturedYears: (manufacturedYears as ManufacturedYears) ?? "all",
  });

  useEffect(() => {
    refetch();
  }, [category, rating, price, manufacturedYears, refetch]);

  return { data, isLoading, isError };
};

export default useFetchDiscoverProduct;
