import createPaymentAction, {
  CreatePaymentProduct,
} from "@/actions/payment/createPaymentAction";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const useHandleProductAction = (slug: string) => {
  const t = useTranslations("ProductPage");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreatePaymentProduct[]) =>
      createPaymentAction(data),
    onSettled: (res) => {},
  });

  return { t, mutate, isPending };
};

export default useHandleProductAction;
