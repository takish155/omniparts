"use client";

import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { categories } from "./CategoryNavList";
import LocaleLink from "../locale-link";
import { useTranslations } from "next-intl";
import { useSession } from "@/context/SessionProvider";
import MobileAuthLinks from "./mobile-auth-link";
import MobileGuestLink from "./mobile-guest-link";

const MobileNav = () => {
  const t = useTranslations("DiscoverPage");
  const auth = useSession();

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <MenuIcon size={20} />
        <p className="sr-only">{t("toggleMenubar")}</p>
      </SheetTrigger>
      <SheetContent className="">
        <ul className="pt-8">
          {auth ? <MobileAuthLinks /> : <MobileGuestLink />}
          {categories.map((link) => {
            return (
              <li key={link.link}>
                <LocaleLink
                  passHref
                  href={link.link}
                  className="block text-3xl mb-7 font-light"
                >
                  <SheetClose className="w-full text-left">
                    {t(link.name as any)}
                  </SheetClose>
                </LocaleLink>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
