"use server";

import { SignInSchemaType } from "@/app/schema/account/authSchema";
import { signIn } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const signInAction = async (data: SignInSchemaType) => {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
  } catch (error) {
    return {
      status: 400,
    };
  }
  redirect("/");
};

export default signInAction;
