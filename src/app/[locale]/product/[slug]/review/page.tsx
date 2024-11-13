import { auth } from "@/app/api/auth/auth";
import PageMessage from "@/components/product/product-message";
import ProductToReviewCard from "@/components/product/review/product-to-review-card";
import ReviewBody from "@/components/product/review/review-body";
import ReviewForm from "@/components/product/review/review-form";
import ReviewStar from "@/components/product/review/review-start";
import { ReviewProvider } from "@/context/ReviewProvider";
import { getReviewResponse } from "@/lib/fetch/getReviewResponse";
import { getTranslations } from "next-intl/server";
import React from "react";

const ReviewPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const response = getReviewResponse(params.slug);
  const translation = getTranslations("ReviewPage");
  const [data, t] = await Promise.all([response, translation]);

  if (data?.status !== "200") {
    return (
      <main className="w-[95%] mx-auto mt-8">
        <PageMessage
          title={t("error")}
          description={`ERROR_CODE: ${data?.status}`}
        />
      </main>
    );
  }

  return (
    <main className="w-[95%] mx-auto mt-8">
      <h2 className="text-3xl font-bold mt-8 mb-8">{t("title")}</h2>
      <ProductToReviewCard
        productName={data?.productName!}
        productImage={data?.productImage!}
      />
      <ReviewProvider slug={params.slug}>
        <ReviewForm>
          <ReviewStar defaultValue={data?.rating!} />
          <ReviewBody defaultValue={data?.review!} />
        </ReviewForm>
      </ReviewProvider>
    </main>
  );
};

export default ReviewPage;
