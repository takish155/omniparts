import createPaymentAction, {
  CreatePaymentProduct,
} from "@/actions/payment/createPaymentAction";
import { useCartStore } from "@/context/cart";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const useHandleCheckout = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreatePaymentProduct[]) =>
      createPaymentAction(data),
    onSettled: (res) => {
      if (res?.status === 400) {
        toast.error(t("outOfStock"), {
          description: t("outOfStockDescription"),
        });
      }
    },
  });
  const { products } = useCartStore();
  const t = useTranslations("header");
  const total = products.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  return { mutate, isPending, total, t, products };
};

export default useHandleCheckout;
