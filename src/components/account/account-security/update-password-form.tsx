"use client";

import { UpdatePasswordErrors } from "@/app/schema/account/updatePasswordSchema";
import FormServerMessage from "@/components/form-server-message";
import InputContainer from "@/components/input-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useHandleUpdatePassword from "@/hooks/forms/account/useHandleUpdatePassword";
import { useTranslations } from "next-intl";

const UpdatePasswordForm = () => {
  const t = useTranslations("AccountSecurity");
  const {
    errors,
    handleSubmit,
    isPending,
    mutate,
    register,
    serverErrorMessage,
  } = useHandleUpdatePassword();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {serverErrorMessage && <FormServerMessage message={serverErrorMessage} />}
      <InputContainer
        data={{
          label: t("currentPassword"),
          htmlFor: "currentPassword",
          input: <Input {...register("currentPassword")} type="password" />,
          error: t(errors.currentPassword?.message as UpdatePasswordErrors),
        }}
      />
      <InputContainer
        data={{
          label: t("newPassword"),
          htmlFor: "newPassword",
          input: <Input {...register("newPassword")} type="password" />,
          error: t(errors.newPassword?.message as UpdatePasswordErrors),
        }}
      />

      <InputContainer
        data={{
          label: t("confirmPassword"),
          htmlFor: "confirmPassword",
          input: <Input {...register("confirmPassword")} type="password" />,
          error: t(errors.confirmPassword?.message as UpdatePasswordErrors),
        }}
      />
      <Button disabled={isPending}>{t("update")}</Button>
    </form>
  );
};

export default UpdatePasswordForm;
