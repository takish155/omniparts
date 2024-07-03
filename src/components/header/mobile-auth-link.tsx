import React from "react";
import LocaleLink from "../locale-link";
import { useTranslations } from "next-intl";
import { SheetClose } from "../ui/sheet";
import signOutAction from "@/app/api/auth/signOutAction";

const MobileAuthLinks = () => {
  const t = useTranslations("header");

  return (
    <>
      <li>
        <LocaleLink
          passHref
          href={"/account"}
          className="block text-3xl mb-7 font-light"
        >
          <SheetClose className="w-full text-left">{t("account")}</SheetClose>
        </LocaleLink>
      </li>
      <li onClick={async () => signOutAction()}>
        <LocaleLink
          passHref
          href={"/"}
          className="block text-3xl mb-7 font-light"
        >
          <SheetClose className="w-full text-left">{t("signOut")}</SheetClose>
        </LocaleLink>
      </li>
    </>
  );
};

export default MobileAuthLinks;
