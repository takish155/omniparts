"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/db";
import {
  AddReviewSchema,
  addReviewSchema,
} from "@/app/schema/account/addReviewSchema";
import { caller } from "@/server";
import { getTranslations } from "next-intl/server";

const addReviewAction = async (data: AddReviewSchema, productSlug: string) => {
  const t = await getTranslations("ReviewPage");
  try {
    const isSafe = addReviewSchema.safeParse(data);
    if (!isSafe) throw new Error("Invalid data");

    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
    });
    if (!product) throw new Error("Product not found");

    const hasBeenPurchased = await caller.account.hasBeenPurchased(
      product.productName
    );
    if (!hasBeenPurchased) throw new Error("Forbidden");

    const reviewExist = await prisma.productReview.findFirst({
      where: {
        productId: product.id,
        userId: session.user?.id!,
      },
    });
    if (reviewExist) {
      await prisma.productReview.update({
        where: {
          id: reviewExist.id,
        },
        data: {
          rating: data.starRating,
          review: data.reviewBody,
        },
      });

      return {
        status: 201,
        message: t("reviewUpdated"),
      };
    }

    await prisma.productReview.create({
      data: {
        rating: data.starRating,
        review: data.reviewBody,
        productId: product.id,
        userId: session.user?.id!,
        slug: productSlug,
      },
    });

    return {
      status: 201,
      message: t("reviewAdded"),
    };
  } catch (error) {
    return {
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
    };
  }
};

export default addReviewAction;
