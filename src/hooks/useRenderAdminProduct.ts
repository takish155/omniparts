import { trpc } from "@/app/_trpc/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useRenderAdminProduct = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = trpc.admin.getAllProduct.useInfiniteQuery(
    {
      search: query,
    },
    { getNextPageParam: (lastPage) => lastPage.cursor, retry: false }
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage]);

  return {
    data,
    isLoading,
    refetch,
    search,
    setSearch,
    fetchNextPage,
    ref,
    setQuery,
  };
};

export default useRenderAdminProduct;

export type UseRenderAdminProductType = ReturnType<
  typeof useRenderAdminProduct
>;
