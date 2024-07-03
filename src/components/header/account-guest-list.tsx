"use client";

import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const AccountGuestList = () => {
  const router = useRouter();
  const t = useTranslations("header");
  const locale = useLocale();

  return (
    <DropdownMenuContent className="">
      <DropdownMenuLabel>{t("notSignedIn")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/account/signin`)}
        >
          {t("signIn")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/account/signup`)}
        >
          {t("noAccount")}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>{t("support")}</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default AccountGuestList;
