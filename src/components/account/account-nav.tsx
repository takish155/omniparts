import React from "react";
import AccountNavList from "./account-nav-list";
import DesktopAccountNav from "./desktop-account-nav";
import MobileAccountNav from "./mobile-account-nav";

const AccountNav = () => {
  return (
    <nav className="md:w-[300px]">
      <DesktopAccountNav />
      <MobileAccountNav />
    </nav>
  );
};

export default AccountNav;
