"use server";

import { SignInSchemaType } from "@/app/schema/account/authSchema";
import { signIn } from "./auth";
import { redirect } from "next/navigation";

const signInAction = async (data: SignInSchemaType) => {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });

    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 400,
    };
  }
};

export default signInAction;
