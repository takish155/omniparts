"use client";

import React from "react";
import { SheetFooter } from "../ui/sheet";
import { Button } from "../ui/button";
import { formatToMoney } from "@/lib/formatToMoney";
import useHandleCheckout from "@/hooks/useHandleCheckout";
import { useSession } from "@/context/SessionProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CartFooter = () => {
  const { isPending, mutate, total, t, products } = useHandleCheckout();
  const router = useRouter();
  const session = useSession();

  return (
    <SheetFooter>
      <section className="flex gap-4 items-center absolute bottom-5">
        <p>
          {t("total")}:{" "}
          <span className="font-bold">{formatToMoney(total, "¥")}</span>
        </p>
        <Button
          disabled={isPending}
          size={"lg"}
          onClick={() => {
            if (!session) {
              router.push("/account/signin");
              toast.error(t("loginToCheckout"));
              return;
            }

            mutate(
              products.map((product) => {
                return {
                  productId: product.id,
                  quantity: product.quantity,
                  name: product.productName,
                  price: product.productPrice,
                  image: product.image as string,
                };
              })
            );
          }}
        >
          {t("checkout")}
        </Button>
      </section>
    </SheetFooter>
  );
};

export default CartFooter;
