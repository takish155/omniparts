"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import SignInFormAction from "./signin-form-action";
import useHandleSignIn from "@/hooks/forms/auth/useHandleSignIn";
import { SignInErrors } from "@/app/schema/account/authSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SignInForm = () => {
  const t = useTranslations("SignInPage");
  const { errors, handleSubmit, register, mutate, isError, isPending } =
    useHandleSignIn();

  return (
    <form
      className="mx-auto w-full"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      {isError && (
        <Alert variant={"destructive"} className="mx-auto max-w-sm mb-8">
          <AlertTitle>{t("invalidCredentials")}</AlertTitle>
          <AlertDescription>{t("signInError")}</AlertDescription>
        </Alert>
      )}
      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          id="username"
          placeholder={t("username")}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500">
            {t(errors.username.message as SignInErrors)}
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
            {t(errors.password.message as SignInErrors)}
          </p>
        )}
      </div>
      <SignInFormAction isPending={isPending} />
    </form>
  );
};

export default SignInForm;
