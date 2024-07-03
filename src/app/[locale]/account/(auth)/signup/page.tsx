"use client";

import SignUpForm from "@/components/account/signup/signup-form";
import { useTranslations } from "next-intl";
import React from "react";

const SignUpPage = () => {
  const t = useTranslations("SignUpPage");

  return (
    <main>
      <section className="w-[95%] mx-auto mt-20 mb-[20rem]">
        <h2 className="text-3xl font-bold text-center">{t("signUp")}</h2>
        <p className="mb-8 text-center">{t("description")}</p>
        <SignUpForm />
      </section>
    </main>
  );
};

export default SignUpPage;
