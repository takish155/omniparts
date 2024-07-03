"use server";

import { AddProductSchemaType } from "@/app/schema/admin/addProductSchema";
import isAdmin from "./isAdmin";
import Stripe from "stripe";
import prisma from "@/app/api/db";
import { getTranslations } from "next-intl/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const addProductAction = async (data: AddProductSchemaType) => {
  const t = await getTranslations("AdminPage");
  try {
    const admin = await isAdmin();
    if (!admin) {
      throw new Error("Unauthorized");
    }

    const slugExists = await prisma.product.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (slugExists) throw new Error(t("slugAlreadyExists"));

    const product = await prisma.product.create({
      data: {
        productBrand: data.productBrand,
        productCategory: data.productCategory,
        productDetails: data.productDetails,
        productImage: data.productImage,
        productName: data.productName,
        currentStock: data.currentStock,
        productPrice: data.productPrice,
        year: data.year,
        slug: data.slug,
      },
    });

    await stripe.products.create({
      name: data.productName,
      description: data.productDetails,
      id: product.id,
    });
    await stripe.prices.create({
      product: product.id,
      unit_amount: data.productPrice,
      currency: "jpy",
    });

    if (!data.specifications || data.specifications.length === 0)
      return { message: t("productAdded"), status: 200 };

    await prisma.productSpecification.createMany({
      data: data.specifications.map((specification) => ({
        specification: specification.name,
        value: specification.value,
        productId: product.id,
      })),
    });

    return { message: t("productAdded"), status: 200 };
  } catch (error) {
    if (error) return { message: t("somethingWentWrong"), status: 500 };
  }
};

export default addProductAction;
