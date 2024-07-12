import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "../../db";
import { Resend } from "resend";
import EmailOrderEN from "@/../emails/en/order-card";
import EmailOrderJA from "../../../../../emails/ja/order-card";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  const body = await req.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  // stripe listen --forward-to http://localhost:3000/api/stripe/webhook
  // stripe trigger checkout.session.completed
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const items = await stripe.checkout.sessions.listLineItems(
        checkoutSession.id
      );

      const estimatedDeliveryTime = new Date();
      estimatedDeliveryTime.setDate(estimatedDeliveryTime.getDate() + 7);

      try {
        const order = await prisma.order.create({
          data: {
            addressLine1:
              checkoutSession.shipping_details?.address?.line1 ?? "",
            addressLine2:
              checkoutSession.shipping_details?.address?.line2 ?? "",
            postalCode:
              checkoutSession.shipping_details?.address?.postal_code ?? "",
            fullName: checkoutSession.shipping_details?.name ?? "",
            email: checkoutSession.customer_email ?? "",
            prefecture: checkoutSession.shipping_details?.address?.state ?? "",
            estimatedDeliveryTime,
            status: "processing",
          },
        });

        const orderItems = items.data.map(async (item) => {
          const product = await prisma.product.findFirst({
            where: { productName: { equals: item.description } },
          });

          await prisma.orderedProduct.create({
            data: {
              orderId: order.id,
              productName: item.description,
              quantity: item.quantity!,
              price: item.amount_total,
              image: product?.productImage!,
            },
          });
        });

        await Promise.all(orderItems);

        const quantityToDeduct = items.data.map(async (item) => {
          const product = await prisma.product.findFirst({
            where: { productName: { equals: item.description } },
          });
          const updatedProduct = await prisma.product.update({
            where: { id: product?.id },
            data: { currentStock: product?.currentStock! - item.quantity! },
          });
        });

        await Promise.all(quantityToDeduct);

        const user = await prisma.user.findFirst({
          where: { email: checkoutSession.customer_email! },
        });
        if (!user || user.preferedLang === "en") {
          await resend.emails.send({
            from: "Omniparts <omniparts@takish155.dev>",
            to: order.email,
            subject: "Order Confirmation",
            react: EmailOrderEN({
              name: order.fullName,
              addressLine1: order.addressLine1,
              orderId: order.id,
              addressLine2: order.addressLine2,
              postalCode: order.postalCode,
              prefecture: order.prefecture,
              url: process.env.NEXT_PUBLIC_BASE_URL!,
              orderedProduct: items.data.map((item) => ({
                name: item.description,
                quantity: item.quantity!,
                id: item.id,
                price: item.amount_total,
              })),
            }),
          });
        }

        if (user && user.preferedLang === "ja") {
          await resend.emails.send({
            from: "Omniparts <omniparts@takish155.dev>",
            to: order.email,
            subject: "注文確認",
            react: EmailOrderJA({
              name: order.fullName,
              addressLine1: order.addressLine1,
              orderId: order.id,
              addressLine2: order.addressLine2,
              postalCode: order.postalCode,
              prefecture: order.prefecture,
              url: process.env.NEXT_PUBLIC_BASE_URL!,
              orderedProduct: items.data.map((item) => ({
                name: item.description,
                quantity: item.quantity!,
                id: item.id,
                price: item.amount_total,
              })),
            }),
          });
        }

        return Response.json({ status: 200, message: "real it worked!" });
      } catch (error) {
        console.log("AN ERROR OCCURED");
      }

      break;
  }

  return Response.json({ status: 200, message: "real it worked!" });
};
