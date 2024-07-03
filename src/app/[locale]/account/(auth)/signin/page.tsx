import SignInForm from "@/components/account/signin/signin-form";
import { useTranslations } from "next-intl";
import React from "react";

const SignInPage = () => {
  const t = useTranslations("SignInPage");

  return (
    <main>
      <section className="w-[95%] mx-auto mt-20 mb-[20rem]">
        <h2 className="text-3xl font-bold text-center">{t("signIn")}</h2>
        <p className="mb-8 text-center">{t("description")}</p>
        <SignInForm />
      </section>
    </main>
  );
};

export default SignInPage;
