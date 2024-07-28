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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const AccountMemberList = () => {
  const t = useTranslations("header");
  const { mutate } = useMutation({
    mutationFn: async () => await signOutAction(),
    onSettled: (res) => {
      toast.success(t("signOutSuccess"));
    },
  });
  const router = useRouter();
  const locale = useLocale();

  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>{t("signedIn")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => router.push(`/${locale}/account`)}>
          {t("account")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => mutate()}>
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => router.push("/support")}>
          {t("support")}
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default AccountMemberList;
