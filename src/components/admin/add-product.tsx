"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import useHandleAddProduct from "@/hooks/useHandleAddProduct";
import ProductForm from "./product-form";

const AddProduct = () => {
  const t = useTranslations("AdminPage");

  return (
    <Card className="w-[65%]">
      <CardHeader>
        <CardTitle>{t("addProduct")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductForm hook={useHandleAddProduct} />
      </CardContent>
    </Card>
  );
};

export default AddProduct;
