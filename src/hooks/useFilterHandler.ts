import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useFilterHandler = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const price = searchParams.get("price");
  const manufacturedYears = searchParams.get("year");
  const query = searchParams.get("query");

  const handleUpdateParams = (
    key: "category" | "rating" | "price" | "year" | "query",
    value: string,
    isNotDiscoverPage?: boolean
  ) => {
    const currentPaths = [];
    if (category && key !== "category")
      currentPaths.push(`category=${category}`);
    if (rating && key !== "rating") currentPaths.push(`rating=${rating}`);
    if (price && key !== "price") currentPaths.push(`price=${price}`);
    if (manufacturedYears && key !== "year")
      currentPaths.push(`year=${manufacturedYears}`);
    if (query && key !== "query") currentPaths.push(`query=${query}`);

    const newPaths = currentPaths.join("&");

    if (pathName.includes("discover")) {
      router.push(`${pathName}?${newPaths}&${key}=${value}`);
      return;
    }

    router.push(`${pathName}/discover/?${newPaths}&${key}=${value}`);
  };

  return {
    category,
    rating,
    price,
    manufacturedYears,
    handleUpdateParams,
    query,
  };
};

export default useFilterHandler;

export type FilterHandler = ReturnType<typeof useFilterHandler>;
// tingin
