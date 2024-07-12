import React from "react";
import LocaleLink from "../locale-link";
import PCNav from "./pc-nav";
import MobileNav from "./mobile-nav";
import AccoountNav from "./account-nav";
import Cart from "./cart";
import SwitchLanguage from "./switch-language";

const Header = () => {
  return (
    <header className="bg-gray-950 text-white flex items-center justify-around sticky top-0 z-50">
      <div className="flex gap-8 items-center">
        <h1 className="font-bold sm:text-4xl py-5 max-sm:text-lg">
          <LocaleLink href="/">Omniparts</LocaleLink>
        </h1>
        <PCNav />
      </div>
      <nav className="flex items-center gap-4 max-sm:gap-1">
        <Cart />
        <AccoountNav />
        <SwitchLanguage />
        <MobileNav />
      </nav>
    </header>
  );
};
export default Header;
