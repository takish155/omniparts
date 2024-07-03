"use client";

import { Textarea } from "@/components/ui/textarea";
import { useHandleReviewContext } from "@/context/ReviewProvider";
import { useTranslations } from "next-intl";

const ReviewBody = ({ defaultValue }: { defaultValue?: string }) => {
  const t = useTranslations("ReviewPage");
  const { errors, register } = useHandleReviewContext() || {};

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{t("reviewDescription")}</h2>
      <Textarea
        defaultValue={defaultValue}
        className="max-w-[700px] min-h-[20vh] mb-2"
        {...register!("reviewBody")}
      />
      {errors?.reviewBody && (
        <p className="text-sm text-red-500">{errors.reviewBody.message}</p>
      )}
    </section>
  );
};

export default ReviewBody;
