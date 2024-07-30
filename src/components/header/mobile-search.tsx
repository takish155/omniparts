import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import MobileSearchInput from "./mobile-search-input";

const MobileSearch = () => {
  const t = useTranslations("header");

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <SearchIcon size={25} />
      </SheetTrigger>
      <SheetContent side={"top"} className="bg-gray-950">
        <MobileSearchInput />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearch;
