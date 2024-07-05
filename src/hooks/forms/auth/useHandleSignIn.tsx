import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchemaType,
  signInSchema,
} from "@/app/schema/account/authSchema";
import { useMutation } from "@tanstack/react-query";
import signInAction from "@/app/api/auth/signInAction";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const useHandleSignIn = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });
  const [isError, setError] = useState(false);
  const t = useTranslations("SignInPage");
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignInSchemaType) => await signInAction(data),
    onError: () => {
      setError(true);
    },
    onSuccess: (res) => {
      if (res.status === 400) {
        setError(true);
        return;
      }
      if (res.status === 200) {
        setError(false);
        toast.success(t("signInSuccess"));
        router.push("/");
      }
    },
  });

  return {
    errors,
    handleSubmit,
    register,
    mutate,
    isPending,
    isError,
  };
};

export default useHandleSignIn;
