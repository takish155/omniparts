"use client";

import useFilterHandler from "@/hooks/useFilterHandler";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const MobileSearchInput = () => {
  const { handleUpdateParams, query } = useFilterHandler();
  const [search, setSearch] = useState(query ?? "");

  const t = useTranslations("header");

  return (
    <div className="flex justify-center gap-4 mt-4">
      <Input
        value={search}
        size={20}
        className="bg-gray-950 text-white"
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("search")}
      />
      <Button
        onClick={() => {
          if (!search) return;
          handleUpdateParams("query", search);
        }}
      >
        {t("searchButton")}
      </Button>
    </div>
  );
};

export default MobileSearchInput;
