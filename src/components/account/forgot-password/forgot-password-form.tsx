"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import ForgotPasswordFormAction from "./forgot-password-form-action";
import useHandleSendForgotPasswordEmail from "@/hooks/forms/account/useHandleSendForgotPasswordEmail";
import InputContainer from "@/components/input-container";
import FormServerMessage from "@/components/form-server-message";

const ForgotPasswordForm = () => {
  const t = useTranslations("ForgotPasswordPage");
  const { errors, handleSubmit, isPending, mutate, register, serverMessage } =
    useHandleSendForgotPasswordEmail();

  return (
    <form
      className="mx-auto w-full"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      {serverMessage && (
        <FormServerMessage message={serverMessage} center={true} />
      )}
      <div className="grid mx-auto max-w-sm items-center gap-1.5 mb-4">
        <InputContainer
          data={{
            error: errors.email?.message ? t(errors.email?.message as any) : "",
            htmlFor: "email",
            input: (
              <Input
                id="email"
                {...register("email")}
                placeholder={t("email")}
              />
            ),
            label: t("email"),
          }}
        />
      </div>
      <ForgotPasswordFormAction isPending={isPending} />
    </form>
  );
};

export default ForgotPasswordForm;
