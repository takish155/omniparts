import getDetailsAction from "@/actions/account/getDetailsAction";
import SecurityForm from "@/components/account/account-security/security-form";
import UpdateEmailForm from "@/components/account/account-security/update-email-form";
import UpdatePasswordForm from "@/components/account/account-security/update-password-form";
import UpdateUsernameForm from "@/components/account/account-security/update-username-form";
import { getTranslations } from "next-intl/server";
import React from "react";

const AccountSecurityPage = async () => {
  const translation = getTranslations("AccountSecurity");
  const accountDetails = getDetailsAction();
  const [t, user] = await Promise.all([translation, accountDetails]);

  return (
    <section className="mt-10 w-full">
      <h2 className="text-3xl font-bold mb-2">{t("title")}</h2>
      <p className="mb-8">{t("description")}</p>
      <SecurityForm
        data={{
          title: t("username"),
          description: t("usernameDescription"),
          form: <UpdateUsernameForm currentUsername={user.username!} />,
        }}
      />
      <SecurityForm
        data={{
          title: t("email"),
          description: t("emailDescription"),
          form: <UpdateEmailForm currentEmail={user.email!} />,
        }}
      />
      <SecurityForm
        data={{
          title: t("password"),
          description: t("passwordDescription"),
          form: <UpdatePasswordForm />,
        }}
      />
    </section>
  );
};

export default AccountSecurityPage;
