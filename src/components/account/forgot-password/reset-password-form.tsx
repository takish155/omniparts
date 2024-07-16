"use client";

import { ResetPasswordErrors } from "@/app/schema/account/forgotPasswordSchema";
import InputContainer from "@/components/input-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useHandleResetPassword from "@/hooks/forms/account/useHandleResetPassword";
import { useTranslations } from "next-intl";
import React from "react";

const ResetPasswordForm = ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const t = useTranslations("ForgotPasswordPage");
  const { register, errors, handleSubmit, mutate, isPending } =
    useHandleResetPassword();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate({ data, email, token });
      })}
    >
      <InputContainer
        data={{
          error: "",
          htmlFor: "email",
          input: <Input value={email} disabled />,
          label: t("email"),
        }}
      />
      <InputContainer
        data={{
          error: errors.password?.message
            ? t(errors.password?.message as ResetPasswordErrors)
            : "",
          label: t("newPassword"),
          htmlFor: "password",
          input: (
            <Input
              type="password"
              {...register("password")}
              placeholder={t("newPassword")}
            />
          ),
        }}
      />
      <InputContainer
        data={{
          error: errors.confirmPassword?.message
            ? t(errors.confirmPassword?.message as ResetPasswordErrors)
            : "",
          label: t("confirmPassword"),
          htmlFor: "confirmPassword",
          input: (
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder={t("confirmPassword")}
            />
          ),
        }}
      />
      <Button disabled={isPending}>{t("resetPasswordButton")}</Button>
    </form>
  );
};

export default ResetPasswordForm;
