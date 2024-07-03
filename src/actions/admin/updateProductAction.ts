"use server";

import { AddProductSchemaType } from "@/app/schema/admin/addProductSchema";
import isAdmin from "./isAdmin";
import Stripe from "stripe";
import prisma from "@/app/api/db";
import { getTranslations } from "next-intl/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const updateProductAction = async (data: AddProductSchemaType, id: string) => {
  const t = await getTranslations("AdminPage");
  try {
    const admin = await isAdmin();
    if (!admin) {
      throw new Error("Unauthorized");
    }

    const [productExist, slugExists] = await Promise.all([
      prisma.product.findUnique({
        where: {
          id,
        },
      }),
      prisma.product.findUnique({
        where: {
          slug: data.slug,
        },
      }),
    ]);

    if (!productExist) throw new Error("Product not found");
    if (slugExists && productExist?.slug !== data.slug)
      throw new Error(t("slugAlreadyExists"));

    const updateProduct = prisma.product.update({
      where: { id },
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
    const updateStripeProduct = stripe.products.update(id, {
      name: data.productName,
      description: data.productDetails,
    });
    await Promise.all([updateProduct, updateStripeProduct]);

    if (!data.specifications || data.specifications.length === 0)
      return { message: t("productUpdated"), status: 200 };

    const deleatePreviousSpecifications =
      prisma.productSpecification.deleteMany({
        where: { productId: id },
      });
    const createNewSpecifications = prisma.productSpecification.createMany({
      data: data.specifications.map((specification) => ({
        specification: specification.name,
        value: specification.value,
        productId: id,
      })),
    });
    await Promise.all([deleatePreviousSpecifications, createNewSpecifications]);

    return { message: t("productUpdated"), status: 200 };
  } catch (error) {
    console.error(error);
    if (error) return { message: t("somethingWentWrong"), status: 500 };
  }
};

export default updateProductAction;
