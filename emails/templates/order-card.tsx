// import { formatToMoney } from "@/lib/formatToMoney";
// import {
//   Html,
//   Tailwind,
//   Text,
//   Container,
//   Section,
//   Heading,
//   Row,
//   Column,
//   Button,
// } from "@react-email/components";
// import * as React from "react";

// export type SendOrderEmailProps = {
//   name: string;
//   postalCode: string;
//   url: string;
//   addressLine1: string;
//   addressLine2: string;
//   orderId: string;
//   prefecture: string;
//   orderedProduct: {
//     name: string;
//     quantity: number;
//     id: string;
//     price: number;
//   }[];
// };

// export default function EmailOrderEN({
//   name,
//   addressLine1,
//   orderId,
//   addressLine2,
//   postalCode,
//   url = "http://localhost:3000",
//   prefecture,
//   orderedProduct = [
//     {
//       name: "RTX 3090TI",
//       quantity: 1,
//       id: "21",
//       price: 50000,
//     },
//     {
//       name: "RTX 3090TI",
//       quantity: 1,
//       id: "21",
//       price: 50000,
//     },
//     {
//       name: "RTX 3090TI",
//       quantity: 1,
//       id: "21",
//       price: 50000,
//     },
//     {
//       name: "RTX 3090TI",
//       quantity: 1,
//       id: "21",
//       price: 50000,
//     },
//     {
//       name: "RTX 3090TI",
//       quantity: 5,
//       id: "21",
//       price: 50000,
//     },
//   ],
// }: SendOrderEmailProps) {
//   return (
//     <Tailwind>
//       <Html>
//         <Container className="font-sans">
//           <Section className="mb-6">
//             <Heading className="font-bold text-3xl text-center">
//               Omniparts
//             </Heading>
//           </Section>
//           <Section className="mb-4 ">
//             <Heading className="text-lg">Hi, {name ?? "Takeshi"}!</Heading>
//             <Text>Thank you for shopping in Omniparts.</Text>
//           </Section>
//           <Section className="mb-4">
//             <Heading className="text-lg">Delivery Address</Heading>
//             <Row>{name}</Row>
//             <Row>{postalCode ?? "123-2013"}</Row>
//             <Row>{prefecture ?? "Tokyo"}</Row>
//             <Row>{addressLine1 ?? "123-21 Shibuya Building, Tokyo"}</Row>
//             {addressLine2 && <Row>{addressLine2}</Row>}
//           </Section>
//           <Section className="bg-gray-500 w-full pb-[0.1px]" />

//           <Section className="mb-4">
//             <Heading className="text-lg">Orders</Heading>
//             {orderedProduct.map((product) => {
//               return (
//                 <Row key={product.id} className="mb-4">
//                   <Column>{product.name}</Column>
//                   <Column className="text-right">{product.quantity}x</Column>
//                 </Row>
//               );
//             })}
//           </Section>
//           <Section className="bg-gray-500 w-full pb-[0.1px] mb-5" />
//           <Section>
//             <Row>
//               <Column>Tracking ID</Column>
//               <Column className="text-right">
//                 {orderId ?? "123dwadai231321"}
//               </Column>
//             </Row>
//             <Row>
//               <Column>Count</Column>
//               <Column className="text-right">
//                 {orderedProduct.reduce(
//                   (acum, total) => acum + total.quantity,
//                   0
//                 )}{" "}
//                 items
//               </Column>
//             </Row>
//             <Row className="mb-8">
//               <Column>Total</Column>
//               <Column className="text-right">
//                 {formatToMoney(
//                   orderedProduct.reduce((acum, total) => acum + total.price, 0),
//                   "￥"
//                 )}
//               </Column>
//             </Row>
//             <Button
//               className="px-4 py-3 bg-black text-white rounded-2xl hover:cursor-pointer"
//               href={`${url}/account`}
//             >
//               View your orders
//             </Button>
//           </Section>
//         </Container>
//       </Html>
//     </Tailwind>
//   );
// }

import React, { ReactNode } from "react";
import Template from "../template";

const OrderCardTemplate = ({ children }: { children: ReactNode }) => {
  return <Template>{children}</Template>;
};

OrderCardTemplate.MessageSection = ({ children }: { children: ReactNode }) => {
  return (
    <Section className="mb-4 ">
      <Heading className="text-lg">Hi, {name ?? "Takeshi"}!</Heading>
      <Text>Thank you for shopping in Omniparts.</Text>{" "}
    </Section>
  );
};

export default OrderCardTemplate;
