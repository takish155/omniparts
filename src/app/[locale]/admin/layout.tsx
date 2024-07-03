import isAdmin from "@/actions/admin/isAdmin";
import AdminHeader from "@/components/admin/header/admin-header";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/");
  }

  return (
    <main className="flex ">
      <AdminHeader />
      <div className="w-[75%]">{children}</div>
    </main>
  );
};

export default layout;
