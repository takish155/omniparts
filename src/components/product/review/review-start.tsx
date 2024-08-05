"use client";

import { useHandleReviewContext } from "@/context/ReviewProvider";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller } from "react-hook-form";
import ReactStars from "react-stars";

const ReviewStar = ({ defaultValue }: { defaultValue?: number }) => {
  const t = useTranslations("ReviewPage");
  const { control, errors } = useHandleReviewContext() || {};

  return (
    <section>
      <h2 className="text-2xl font-bold">{t("ratingTitle")}</h2>
      <Controller
        name="starRating"
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactStars onChange={onChange} size={50} value={value} />
        )}
      />
      {errors?.starRating && (
        <p className="text-sm text-red-400">
          {t(errors.starRating.message as any)}
        </p>
      )}
    </section>
  );
};

export default ReviewStar;
