import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useFilterHandler = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const price = searchParams.get("price");
  const manufacturedYears = searchParams.get("year");

  const handleUpdateParams = (
    key: "category" | "rating" | "price" | "year" | "query",
    value: string
  ) => {
    const currentPaths = [];
    if (category && key !== "category")
      currentPaths.push(`category=${category}`);
    if (rating && key !== "rating") currentPaths.push(`rating=${rating}`);
    if (price && key !== "price") currentPaths.push(`price=${price}`);
    if (manufacturedYears && key !== "year")
      currentPaths.push(`year=${manufacturedYears}`);
    if (price && key !== "query") currentPaths.push(`query=${value}`);

    const newPaths = currentPaths.join("&");

    router.push(`${pathName}?${newPaths}&${key}=${value}`);
  };

  return { category, rating, price, manufacturedYears, handleUpdateParams };
};

export default useFilterHandler;

export type FilterHandler = ReturnType<typeof useFilterHandler>;
