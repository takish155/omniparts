"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const SwitchLanguage = () => {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LanguagesIcon size={20} />
        <p className="sr-only">
          {t("toggleLanguage", {
            lang: t(locale === "en" ? "ja" : "en"),
          })}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          onClick={() => {
            if (locale === "ja") {
              router.push(pathname.replace("/ja", "/en"));
            }
          }}
        >
          {t("english")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "ja"}
          onClick={() => {
            if (locale === "en") {
              router.push(pathname.replace("/en", "/ja"));
            }
          }}
        >
          {t("japanese")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchLanguage;
