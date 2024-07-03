import { updateUsernameAction } from "@/actions/account/updateUsernameAction";
import {
  UpdateUsernameSchemaType,
  updateUsernameSchema,
} from "@/app/schema/account/updateUsernameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleUpdateUsername = () => {
  const [serverErrorMessage, setErrorMessage] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<UpdateUsernameSchemaType>({
    resolver: zodResolver(updateUsernameSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateUsernameSchemaType) =>
      await updateUsernameAction(data),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast(res.message);
      }
      if (res?.status === 400) {
        setErrorMessage(res.message);
      }
    },
  });

  return {
    handleSubmit,
    errors,
    register,
    mutate,
    isPending,
    serverErrorMessage,
  };
};

export default useHandleUpdateUsername;
