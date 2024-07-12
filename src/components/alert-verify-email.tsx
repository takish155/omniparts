"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import sendVerificationEmailAction from "@/actions/account/sendVerificationEmailAction";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AlertVerifyEmail = () => {
  const t = useTranslations("PageMessages");
  const router = useRouter();

  const { data, isLoading, isError } =
    trpc.account.isAccountVerified.useQuery();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await sendVerificationEmailAction(),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast.success(res.message);
        return;
      }
      toast.error(res?.message);
    },
  });

  if (isLoading || data === true || isError) return null;

  return (
    <Alert className="w-[90%] mx-auto my-4">
      <AlertCircleIcon />
      <AlertTitle>{t("verifyYourEmail")}</AlertTitle>
      <AlertDescription className="flex flex-wrap justify-between items-center gap-4">
        <p>{t("verifyYourEmailDescription")}</p>
        <div className="flex gap-4">
          <Button disabled={isPending} size={"sm"} onClick={() => mutate()}>
            {t("resendEmail")}
          </Button>
          <Button
            size={"sm"}
            onClick={() => router.push("/account/account-security")}
            variant={"outline"}
          >
            {t("changeEmail")}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default AlertVerifyEmail;
