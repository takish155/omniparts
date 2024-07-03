import ForgotPasswordForm from "@/components/account/forgot-password/forgot-password-form";
import { useTranslations } from "next-intl";
import React from "react";

const ForgotPasswordPage = () => {
  const t = useTranslations("ForgotPasswordPage");

  return (
    <main>
      <section className="w-[95%] mx-auto mt-20 mb-[20rem]">
        <h2 className="text-3xl font-bold text-center">
          {t("forgotPassword")}
        </h2>
        <p className="mb-8 text-center">{t("description")}</p>
        <ForgotPasswordForm />
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
