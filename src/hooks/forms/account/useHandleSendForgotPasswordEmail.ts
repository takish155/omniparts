import sendForgotPasswordEmailAction from "@/actions/account/sendForgotPasswordEmailAction";
import {
  sendForgotPasswordEmailSchema,
  SendForgotPasswordEmailSchemaType,
} from "@/app/schema/account/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const useHandleSendForgotPasswordEmail = () => {
  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SendForgotPasswordEmailSchemaType>({
    resolver: zodResolver(sendForgotPasswordEmailSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: SendForgotPasswordEmailSchemaType) =>
      await sendForgotPasswordEmailAction(email),
    onSettled: (res) => {
      if (res?.status === 200) {
        router.push("/account/forgot-password/success");
        return;
      }
      setServerMessage(res?.message!);
    },
  });

  return {
    register,
    errors,
    handleSubmit,
    serverMessage,
    mutate,
    isPending,
  };
};

export default useHandleSendForgotPasswordEmail;
