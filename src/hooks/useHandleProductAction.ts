import createPaymentAction, {
  CreatePaymentProduct,
} from "@/actions/payment/createPaymentAction";
import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const useHandleProductAction = (slug: string) => {
  const t = useTranslations("ProductPage");

  const { data, isLoading, isError } =
    trpc.productPage.getProductStock.useQuery(slug);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreatePaymentProduct[]) =>
      createPaymentAction(data),
    onSettled: (res) => {
      if (res?.message === "NOT_VERIFIED") {
        toast.error(t("notVerified"));
      }
    },
  });

  return { t, mutate, isPending, data, isLoading, isError };
};

export default useHandleProductAction;
