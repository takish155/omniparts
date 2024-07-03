import AddProduct from "@/components/admin/add-product";
import AdminHero from "@/components/admin/admin-hero";
import AdminHeader from "@/components/admin/header/admin-header";
import React from "react";

const page = () => {
  return (
    <>
      <AdminHero />
      <AddProduct />
    </>
  );
};

export default page;
