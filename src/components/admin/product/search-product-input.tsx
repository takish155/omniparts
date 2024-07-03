"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRenderAdminProductContext } from "@/context/RenderAdminProductContext";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const SearchProductInput = () => {
  const { search, setSearch, refetch, isLoading, setQuery } =
    useRenderAdminProductContext() || {};
  const t = useTranslations("AdminProductPage");

  return (
    <section className="flex gap-4 mt-4 mb-10">
      <Input
        className="max-w-[400px] w-[70%]"
        value={search}
        onChange={(e) => setSearch!(e.target.value)}
        placeholder={t("searchProduct")}
      />
      <Button onClick={() => setQuery!(search!)} disabled={isLoading}>
        <SearchIcon size={15} />
      </Button>
    </section>
  );
};

export default SearchProductInput;
