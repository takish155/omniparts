import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import AccountNavList from "./account-nav-list";

const DesktopAccountNav = () => {
  const t = useTranslations("AccountNav");

  return (
    <nav className="mt-[15vh] max-md:hidden">
      <h2 className="text-2xl font-bold mb-3">{t("account")}</h2>
      <AccountNavList />
    </nav>
  );
};

export default DesktopAccountNav;
