import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "../../db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

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

        return Response.json({ status: 200, message: "real it worked!" });
      } catch (error) {
        console.log(error);
      }

      break;
  }

  return Response.json({ status: 200, message: "real it worked!" });
};
