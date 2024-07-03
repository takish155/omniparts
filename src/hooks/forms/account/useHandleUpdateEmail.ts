import { updateEmailAction } from "@/actions/account/updateEmailAction";
import {
  UpdateEmailSchemaType,
  updateEmailSchema,
} from "@/app/schema/account/updateEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleUpdateEmail = () => {
  const [serverErrorMessage, setErrorMessage] = useState("");
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UpdateEmailSchemaType>({
    resolver: zodResolver(updateEmailSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateEmailSchemaType) =>
      await updateEmailAction(data),
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

export default useHandleUpdateEmail;
