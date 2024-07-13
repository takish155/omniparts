"use client";

import LocaleLink from "@/components/locale-link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";

const ForgotPasswordFormAction = ({ isPending }: { isPending: boolean }) => {
  const t = useTranslations("ForgotPasswordPage");

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <Button disabled={isPending}>{t("forgotPassword")}</Button>
      <LocaleLink href={"/account/signin"} passHref={true}>
        <Button type="button" variant={"secondary"} className="w-full">
          {t("rememberPassword")}
        </Button>
      </LocaleLink>
    </div>
  );
};

export default ForgotPasswordFormAction;
