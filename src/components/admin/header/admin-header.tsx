import { useTranslations } from "next-intl";
import React from "react";
import AdminNav from "./admin-nav";

const AdminHeader = () => {
  const t = useTranslations("AdminPage");

  return (
    <section className="w-[20%] ">
      <AdminNav />
    </section>
  );
};

export default AdminHeader;
