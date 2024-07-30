"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import useFilterHandler from "@/hooks/useFilterHandler";

const PCSearch = () => {
  const { handleUpdateParams, query } = useFilterHandler();
  const [search, setSearch] = useState(query ?? "");

  const t = useTranslations("header");

  return (
    <div className="flex items-center min-w-[400px] w-[60%] max-md:hidden">
      <Input
        className="bg-black"
        value={search}
        size={20}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("search")}
      />
      <Button
        variant={"outline"}
        className="bg-black"
        onClick={() => {
          if (!search) return;
          handleUpdateParams("query", search);
        }}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default PCSearch;
