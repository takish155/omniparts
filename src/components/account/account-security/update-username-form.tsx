"use client";

import { UpdateUsernameErrors } from "@/app/schema/account/updateUsernameSchema";
import FormServerMessage from "@/components/form-server-message";
import InputContainer from "@/components/input-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useHandleUpdateUsername from "@/hooks/forms/account/useHandleUpdateUsername";
import { useTranslations } from "next-intl";

const UpdateUsernameForm = ({
  currentUsername,
}: {
  currentUsername: string;
}) => {
  const t = useTranslations("AccountSecurity");
  const {
    errors,
    handleSubmit,
    isPending,
    mutate,
    register,
    serverErrorMessage,
  } = useHandleUpdateUsername();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {serverErrorMessage && <FormServerMessage message={serverErrorMessage} />}
      <InputContainer
        data={{
          label: t("username"),
          htmlFor: "username",
          input: (
            <Input
              defaultValue={currentUsername}
              {...register("newUsername")}
            />
          ),
          error: t(errors.newUsername?.message as UpdateUsernameErrors),
        }}
      />
      <InputContainer
        data={{
          label: t("password"),
          htmlFor: "password",
          input: <Input type="password" {...register("password")} />,
          error:
            errors.password?.message &&
            t(errors.password?.message as UpdateUsernameErrors),
        }}
      />
      <Button disabled={isPending}>{t("update")}</Button>
    </form>
  );
};

export default UpdateUsernameForm;
