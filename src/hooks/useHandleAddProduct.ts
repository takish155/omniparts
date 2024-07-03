import addProductAction from "@/actions/admin/addProductAction";
import {
  AddProductSchemaType,
  addProductSchema,
} from "@/app/schema/admin/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleAddProduct = (productId?: string) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<AddProductSchemaType>({
    resolver: zodResolver(addProductSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: AddProductSchemaType) => addProductAction(data),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const onSubmit = (data: AddProductSchemaType) => {
    mutate(data);
  };

  return { handleSubmit, control, register, errors, isPending, onSubmit };
};

export type UseHandleAddProductType = typeof useHandleAddProduct;
export default useHandleAddProduct;
