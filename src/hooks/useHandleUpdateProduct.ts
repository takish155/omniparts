import addProductAction from "@/actions/admin/addProductAction";
import updateProductAction from "@/actions/admin/updateProductAction";
import {
  AddProductSchemaType,
  addProductSchema,
} from "@/app/schema/admin/addProductSchema";
import { useRenderAdminProductContext } from "@/context/RenderAdminProductContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleUpdateProduct = (id: string) => {
  const { refetch } = useRenderAdminProductContext() || {};
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<AddProductSchemaType>({
    resolver: zodResolver(addProductSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: AddProductSchemaType) => updateProductAction(data, id),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast.success(res?.message);
        refetch!();
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

export type UseHandleUpdateProductType = typeof useHandleUpdateProduct;
export default useHandleUpdateProduct;
