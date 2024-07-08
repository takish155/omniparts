import { formatToMoney } from "@/lib/formatToMoney";
import {
  Text,
  Section,
  Heading,
  Row,
  Column,
  Button,
} from "@react-email/components";
import * as React from "react";
import Template from "../template";

export type SendOrderEmailProps = {
  name: string;
  postalCode: string;
  url: string;
  addressLine1: string;
  addressLine2: string;
  orderId: string;
  prefecture: string;
  orderedProduct: {
    name: string;
    quantity: number;
    id: string;
    price: number;
  }[];
};

export default function EmailOrderJA({
  name,
  addressLine1,
  orderId,
  addressLine2,
  postalCode,
  url = "http://localhost:3000",
  prefecture,
  orderedProduct = [
    {
      name: "RTX 3090TI",
      quantity: 1,
      id: "21",
      price: 50000,
    },
    {
      name: "RTX 3090TI",
      quantity: 1,
      id: "21",
      price: 50000,
    },
    {
      name: "RTX 3090TI",
      quantity: 1,
      id: "21",
      price: 50000,
    },
    {
      name: "RTX 3090TI",
      quantity: 1,
      id: "21",
      price: 50000,
    },
    {
      name: "RTX 3090TI",
      quantity: 5,
      id: "21",
      price: 50000,
    },
  ],
}: SendOrderEmailProps) {
  return (
    <Template>
      <Section className="mb-4 ">
        <Heading className="text-lg">こんにちは、{name ?? "Takeshi"}様</Heading>
        <Text>Omnipartsでのお買い上げ、誠にありがとうございます。</Text>
      </Section>
      <Section className="mb-4">
        <Heading className="text-lg">お届け先住所</Heading>
        <Row>{name}</Row>
        <Row>{postalCode ?? "123-2013"}</Row>
        <Row>{prefecture ?? "Tokyo"}</Row>
        <Row>{addressLine1 ?? "123-21 Shibuya Building, Tokyo"}</Row>
        {addressLine2 && <Row>{addressLine2}</Row>}
      </Section>
      <Section className="bg-gray-500 w-full pb-[0.1px]" />

      <Section className="mb-4">
        <Heading className="text-lg">注文</Heading>
        {orderedProduct.map((product) => {
          return (
            <Row key={product.id}>
              <Column>{product.name}</Column>
              <Column className="text-right">{product.quantity}x</Column>
            </Row>
          );
        })}
      </Section>
      <Section className="bg-gray-500 w-full pb-[0.1px] mb-5" />
      <Section>
        <Row>
          <Column>追跡番号</Column>
          <Column className="text-right">{orderId ?? "123dwadai231321"}</Column>
        </Row>
        <Row>
          <Column>数量 </Column>
          <Column className="text-right">
            {orderedProduct.reduce((acum, total) => acum + total.quantity, 0)}点
          </Column>
        </Row>
        <Row className="mb-8">
          <Column>合計</Column>
          <Column className="text-right">
            {formatToMoney(
              orderedProduct.reduce((acum, total) => acum + total.price, 0),
              "￥"
            )}
          </Column>
        </Row>
        <Button
          className="px-4 py-3 bg-black text-white rounded-2xl hover:cursor-pointer"
          href={`${url}/account`}
        >
          注文を見る
        </Button>
      </Section>
    </Template>
  );
}
