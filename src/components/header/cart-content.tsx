"use client";

import { useCartStore } from "@/context/cart";
import React from "react";
import CartProductCard from "./cart-product-card";

const CartContent = () => {
  const { products } = useCartStore();

  return (
    <section className="overflow-y-scroll h-[70vh] my-auto">
      {products.map((product) => {
        return <CartProductCard data={product} key={product.id} />;
      })}
    </section>
  );
};

export default CartContent;
