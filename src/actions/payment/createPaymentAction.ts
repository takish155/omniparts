"use server";

import { auth } from "@/app/api/auth/auth";
import { caller } from "@/server";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export type CreatePaymentProduct = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

const createPaymentAction = async (products: CreatePaymentProduct[]) => {
  let productUrl;
  let isStockError = false;
  try {
    const session = await auth();
    if (!session) {
      throw new Error("UNAUTHORIZED");
    }
    const isVerified = await caller.account.isAccountVerified();
    if (!isVerified) {
      throw new Error("NOT_VERIFIED");
    }

    const stockCheckPromises = products.map(async (product) => {
      const stock = await caller.productPage.getProductStock(product.productId);
      if (stock.currentStock < product.quantity) {
        isStockError = true;
        return {
          status: 400,
          message: "OUT_OF_STOCK",
          outOfStockItem: {
            productName: product.name,
            wantedQuantaty: product.quantity,
            currentStock: stock.currentStock,
          },
        };
      }
    });

    const stockCheckResults = await Promise.all(stockCheckPromises);

    // products.forEach(async (product) => {
    //   const stock = await caller.productPage.getProductStock(product.productId);
    //   if (stock.currentStock < product.quantity) {
    //     isStockError = true;
    //     return {
    //       status: 400,
    //       message: "OUT_OF_STOCK",
    //       outOfStockItem: {
    //         productName: product.name,
    //         wantedQuantaty: product.quantity,
    //         currentStock: stock.currentStock,
    //       },
    //     };
    //   }
    // });

    const productItems = products.map((data) => {
      return {
        price_data: {
          currency: "jpy",
          unit_amount: data.price,
          product_data: {
            name: data.name,
            images: [data.image],
          },
        },
        quantity: data.quantity,
      };
    });

    const total = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // isTrue = true if total >= 300000 else false
    const paymentSession = await stripe.checkout.sessions.create({
      payment_method_types: total >= 300000 ? ["card"] : ["card", "konbini"],
      shipping_address_collection: {
        allowed_countries: ["JP"],
      },
      line_items: productItems,
      mode: "payment",
      currency: "jpy",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel`,
      customer_email: session?.user!.email!,
    });

    const items = await stripe.checkout.sessions.listLineItems(
      paymentSession.id
    );
    productUrl = paymentSession.url;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_VERIFIED") {
        return { status: 400, message: "NOT_VERIFIED" };
      }
    }
    return { status: 500 };
  }
  if (isStockError) {
    return { status: 400, message: "OUT_OF_STOCK" };
  }
  redirect(productUrl!);
};

export default createPaymentAction;
