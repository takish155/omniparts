import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { auth } from "@/app/api/auth/auth";
import AccountGuestList from "./account-guest-list";
import AccountMemberList from "./account-member-list";
import { getTranslations } from "next-intl/server";

const AccoountNav = async () => {
  const isSession = auth();
  const translation = getTranslations("header");
  const [session, t] = await Promise.all([isSession, translation]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-lg:hidden">
        <User size={20} />
        <p className="sr-only">{t("user")}</p>
      </DropdownMenuTrigger>
      {session ? <AccountMemberList /> : <AccountGuestList />}
    </DropdownMenu>
  );
};

export default AccoountNav;
