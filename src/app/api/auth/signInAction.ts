"use server";

import { SignInSchemaType } from "@/app/schema/account/authSchema";
import { signIn } from "./auth";
import { getTranslations } from "next-intl/server";

const signInAction = async (data: SignInSchemaType) => {
  await signIn("credentials", data);
};

export default signInAction;
