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
import signOutAction from "@/app/api/auth/signOutAction";

const AccountMemberList = () => {
  const router = useRouter();
  const t = useTranslations("header");
  const locale = useLocale();

  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>{t("signedIn")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => router.push(`/${locale}/account`)}>
          {t("account")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => signOutAction()}>
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>{t("support")}</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default AccountMemberList;
