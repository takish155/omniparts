import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import AccountNavList from "./account-nav-list";

const MobileAccountNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden top-28 right-4 fixed">
        <MenuIcon size={50} />
      </SheetTrigger>
      <SheetContent side="left">
        <AccountNavList className="mt-4" isMobile={true} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileAccountNav;
