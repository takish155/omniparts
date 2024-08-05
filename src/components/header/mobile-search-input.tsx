"use client";

import useFilterHandler from "@/hooks/useFilterHandler";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";

const MobileSearchInput = () => {
  const { handleUpdateParams, query } = useFilterHandler();
  const [search, setSearch] = useState(query ?? "");

  const t = useTranslations("header");

  return (
    <section className="flex justify-center gap-4 mt-4 mb-4">
      <Input
        value={search}
        size={20}
        className="bg-gray-950 text-white"
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("search")}
      />
      <SheetClose asChild>
        <Button
          size="sm"
          onClick={() => {
            if (!search) return;
            handleUpdateParams("query", search);
          }}
        >
          {t("searchButton")}
        </Button>
      </SheetClose>
      <SheetClose asChild>
        <Button
          size="sm"
          variant={"destructive"}
          onClick={() => {
            if (!search) return;
            handleUpdateParams("query", "");
          }}
        >
          {t("clearQuery")}
        </Button>
      </SheetClose>
    </section>
  );
};

export default MobileSearchInput;
