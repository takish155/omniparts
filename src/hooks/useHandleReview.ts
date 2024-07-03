import addReviewAction from "@/actions/account/addReviewAction";
import {
  AddReviewSchema,
  addReviewSchema,
} from "@/app/schema/account/addReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleReview = (productSlug: string) => {
  const [starRating, setStarRating] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<AddReviewSchema>({
    resolver: zodResolver(addReviewSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: AddReviewSchema) =>
      await addReviewAction(formData, productSlug),
    onSettled: (res) => {
      if (res?.status === 201) {
        toast.success(res.message);
        return;
      }
      toast.error(res?.message);
    },
  });

  return {
    starRating,
    setStarRating,
    handleSubmit,
    register,
    errors,
    isPending,
    control,
    mutate,
  };
};

export type UseHandleReviewType = ReturnType<typeof useHandleReview>;
export default useHandleReview;
