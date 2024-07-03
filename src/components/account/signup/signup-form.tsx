"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import SignUpFormAction from "./signup-form-action";
import useHandleSignUp from "@/hooks/forms/auth/useHandleSignUp";
import { SignUpErrors } from "@/app/schema/account/authSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const SignUpForm = () => {
  const t = useTranslations("SignUpPage");
  const { isPending, mutate, errors, handleSubmit, register, data } =
    useHandleSignUp();

  return (
    <form
      className="mx-auto w-full"
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      {data?.status === 400 ||
        (data?.status === 500 && (
          <Alert variant={"destructive"} className="mx-auto max-w-sm mb-8">
            <AlertTitle>{t("signUpFailed")}</AlertTitle>
            <AlertDescription>{data.message}</AlertDescription>
          </Alert>
        ))}

      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t("email")}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500">
            {t(errors.email.message as SignUpErrors)}
          </p>
        )}
      </div>
      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          id="username"
          placeholder={t("username")}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500">
            {t(errors.username.message as SignUpErrors)}
          </p>
        )}
      </div>
      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          type="password"
          id="password"
          placeholder={t("password")}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">
            {t(errors.password.message as SignUpErrors)}
          </p>
        )}
      </div>
      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder={t("confirmPassword")}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">
            {t(errors.confirmPassword.message as SignUpErrors)}
          </p>
        )}
      </div>
      <SignUpFormAction isPending={isPending} />
    </form>
  );
};

export default SignUpForm;
