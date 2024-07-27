import validateForgotPasswordTokenAction from "@/actions/account/validateForgotPasswordTokenAction";
import ResetPasswordForm from "@/components/account/forgot-password/reset-password-form";
import PageMessage from "@/components/product/product-message";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import React from "react";

const ForgotPasswordPage = async ({
  params,
}: {
  params: { tokenId: string; username: string };
}) => {
  const translation = getTranslations("ForgotPasswordPage");
  const response = validateForgotPasswordTokenAction(
    params.tokenId,
    params.username
  );
  const [data, t] = await Promise.all([response, translation]);

  if (data.status !== 200) {
    return (
      <main className="w-[95%] mx-auto">
        <PageMessage
          description={data.message}
          title={t("tokenValidationFailed")}
        />
      </main>
    );
  }

  return (
    <main className="w-[95%] mx-auto min-h-screen">
      <Card className="w-full mt-[10vh] mx-auto max-w-[650px]">
        <CardHeader>
          <CardTitle>{t("resetPassword")}</CardTitle>
          <CardDescription>{t("resetPasswordDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm email={data.message} token={params.tokenId} />
        </CardContent>
      </Card>
    </main>
  );
};

export default ForgotPasswordPage;
