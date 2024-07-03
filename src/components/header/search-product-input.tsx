"use client";

import { useTranslations } from "next-intl";
import { Input } from "../ui/input";

const SearchProductInput = () => {
  const t = useTranslations("header");

  return (
    <div className="text-foreground">
      <Input placeholder={t("searchSomething")} />
    </div>
  );
};

export default SearchProductInput;
