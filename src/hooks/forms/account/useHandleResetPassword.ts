import { handleForgotPasswordAction } from "@/actions/account/handleForgotPasswordAction";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/app/schema/account/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleResetPassword = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      data,
      email,
      token,
    }: {
      data: ResetPasswordSchemaType;
      email: string;
      token: string;
    }) => await handleForgotPasswordAction(data, email, token),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast.success(res.message);
        router.push("/");
        return;
      }
      toast.error(res?.message);
    },
  });

  return {
    register,
    errors,
    handleSubmit,
    mutate,
    isPending,
  };
};

export default useHandleResetPassword;
