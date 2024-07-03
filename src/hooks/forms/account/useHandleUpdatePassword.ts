import { updatePasswordAction } from "@/actions/account/updatePasswordAction";
import {
  UpdatePasswordSchemaType,
  updatePasswordSchema,
} from "@/app/schema/account/updatePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleUpdatePassword = () => {
  const [serverErrorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdatePasswordSchemaType) =>
      await updatePasswordAction(data),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast(res.message);
        setErrorMessage("");
      }
      if (res?.status === 400) {
        setErrorMessage(res.message);
      }
    },
  });

  return {
    register,
    errors,
    handleSubmit,
    mutate,
    isPending,
    serverErrorMessage,
  };
};

export default useHandleUpdatePassword;
