import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import CartContent from "./cart-content";
import CartFooter from "./cart-footer";

const Cart = () => {
  const t = useTranslations("header");

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart size={20} />
        <p className="sr-only">{t("shoppingCart")}</p>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="md:min-w-[600px] max-md:min-w-[100%]"
      >
        <SheetHeader>
          <SheetTitle>{t("cart")}</SheetTitle>
          <SheetDescription className="pb-10">
            {t("cartDescription")}
          </SheetDescription>
        </SheetHeader>
        <CartContent />
        <CartFooter />
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
