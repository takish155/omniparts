"use client";

import { UpdateEmailErrors } from "@/app/schema/account/updateEmailSchema";
import FormServerMessage from "@/components/form-server-message";
import InputContainer from "@/components/input-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useHandleUpdateEmail from "@/hooks/forms/account/useHandleUpdateEmail";
import { useTranslations } from "next-intl";

const UpdateEmailForm = ({ currentEmail }: { currentEmail: string }) => {
  const {
    errors,
    handleSubmit,
    isPending,
    mutate,
    register,
    serverErrorMessage,
  } = useHandleUpdateEmail();
  const t = useTranslations("AccountSecurity");

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {serverErrorMessage && <FormServerMessage message={serverErrorMessage} />}
      <InputContainer
        data={{
          error: t(errors.newEmail?.message as UpdateEmailErrors),
          htmlFor: "email",
          label: t("email"),
          input: (
            <Input defaultValue={currentEmail} {...register("newEmail")} />
          ),
        }}
      />
      <InputContainer
        data={{
          error: t(errors.password?.message as UpdateEmailErrors),
          htmlFor: "password",
          label: t("password"),
          input: <Input type="password" {...register("password")} />,
        }}
      />
      <Button disabled={isPending}>{t("update")}</Button>
    </form>
  );
};

export default UpdateEmailForm;
