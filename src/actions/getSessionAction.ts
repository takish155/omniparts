"use server";

import { auth } from "@/app/api/auth/auth";

export const getSessionAction = async () => {
  try {
    const session = await auth();

    return session?.user;
  } catch (error) {
    return undefined;
  }
};
