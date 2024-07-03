"use client";

import { Button } from "@/components/ui/button";
import { useHandleReviewContext } from "@/context/ReviewProvider";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";

const ReviewForm = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("ReviewPage");
  const { isPending, handleSubmit, mutate } = useHandleReviewContext() || {};

  return (
    <form onSubmit={handleSubmit!((data) => mutate!(data))}>
      {children}
      <Button className="mt-4 mb-[10rem]" disabled={isPending} type="submit">
        {t("submit")}
      </Button>
    </form>
  );
};

export default ReviewForm;
