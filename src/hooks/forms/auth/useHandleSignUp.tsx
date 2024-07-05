import signUpAction from "@/app/api/auth/signUpAction";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/app/schema/account/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleSignUp = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const { isPending, mutate, data } = useMutation({
    mutationFn: async (data: SignUpSchemaType) => await signUpAction(data),
    onSettled: (res) => {
      if (res?.status === 200) {
        toast.success(res.message);
        router.push("/");
      }
    },
  });

  return { isPending, mutate, handleSubmit, errors, register, data };
};

export default useHandleSignUp;
