"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CreatePayment {
  amount: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productId: string;
}

const getPaymentLink = async (data: CreatePayment) => {
  try {
    const productExist = await stripe.products.retrieve(data.productId);
    if (!productExist) {
      const product = await stripe.products.create({
        name: data.productName,
        description: data.productDescription,
        id: data.productId,
      });
      const priceObject = await stripe.prices.create({
        product: product.id,
        unit_amount: data.productPrice,
        currency: "jpy",
      });

      const paymentSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
      });
    }
  } catch (error) {}
};

export default getPaymentLink;
