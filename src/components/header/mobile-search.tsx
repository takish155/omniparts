import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import MobileSearchInput from "./mobile-search-input";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";

const MobileFilter = dynamic(() => import("./mobile-filter"), {
  ssr: false,
});

const MobileSearch = () => {
  const t = useTranslations("header");

  return (
    <Sheet>
      <SheetTrigger className="">
        <SearchIcon size={20} />
        <p className="sr-only">{t("searchProducts")}</p>
      </SheetTrigger>
      <SheetContent side={"top"} className="bg-gray-950 text-white">
        <SheetHeader>
          <SheetTitle className="text-white text-left sr-only">
            {t("searchProducts")}
          </SheetTitle>
        </SheetHeader>
        <MobileSearchInput />
        <Separator className="my-6 md:hidden" />
        <MobileFilter />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearch;
