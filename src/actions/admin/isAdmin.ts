"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/db";

const isAdmin = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });
  return user?.role === "admin" ? true : false;
};

export default isAdmin;
