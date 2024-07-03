"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import ForgotPasswordFormAction from "./forgot-password-form-action";

const ForgotPasswordForm = () => {
  const t = useTranslations("ForgotPasswordPage");

  return (
    <form className="mx-auto w-full">
      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="email">{t("email")}</Label>
        <Input type="email" id="email" placeholder={t("email")} />
      </div>
      <ForgotPasswordFormAction />
    </form>
  );
};

export default ForgotPasswordForm;
