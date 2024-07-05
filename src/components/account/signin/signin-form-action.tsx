"use client";

import LocaleLink from "@/components/locale-link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";

const SignInFormAction = ({ isPending }: { isPending: boolean }) => {
  const t = useTranslations("SignInPage");

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <Button disabled={isPending}>{t("signInButton")}</Button>
      <LocaleLink href={"/account/signup"} passHref={true}>
        <Button type="button" variant={"secondary"} className="w-full">
          {t("noAccount")}
        </Button>
      </LocaleLink>
      <LocaleLink href="/account/forgot-password">
        <Button type="button" variant={"outline"} className="w-full">
          {t("forgotPassword")}
        </Button>
      </LocaleLink>
    </div>
  );
};

export default SignInFormAction;
