import React from "react";
import LocaleLink from "../locale-link";
import { SheetClose } from "../ui/sheet";
import { useTranslations } from "next-intl";

const MobileGuestLink = () => {
  const t = useTranslations("header");

  return (
    <>
      <li>
        <LocaleLink
          passHref
          href={"/account/signin"}
          className="block text-3xl mb-7 font-light"
        >
          <SheetClose className="w-full text-left">{t("signIn")}</SheetClose>
        </LocaleLink>
      </li>
      <li>
        <LocaleLink
          passHref
          href={"/account/signup"}
          className="block text-3xl mb-7 font-light"
        >
          <SheetClose className="w-full text-left">{t("signUp")}</SheetClose>
        </LocaleLink>
      </li>
    </>
  );
};

export default MobileGuestLink;
