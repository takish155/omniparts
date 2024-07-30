"use server";

import { signOut } from "./auth";
import { getTranslations } from "next-intl/server";

const signOutAction = async () => {
  const t = await getTranslations("header");
  await signOut();
  return {
    message: t("signOutSuccess"),
    status: 200,
  };
};

export default signOutAction;
