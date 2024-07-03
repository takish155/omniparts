"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/db";

const getDetailsAction = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Session not found");
    }

    console.error(session.user?.id!);
    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });

    return {
      username: user?.username,
      email: user?.email,
    };
  } catch (error) {
    return { message: "Something went wrong...", status: 500 };
  }
};

export default getDetailsAction;
