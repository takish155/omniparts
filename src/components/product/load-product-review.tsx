"use client";

import React from "react";
import ProductReviewCard from "./product-review-card";
import { trpc } from "@/app/_trpc/client";
import ProductReviewSkeleton from "./skeleton/product-review-skeleton";
import { useTranslations } from "next-intl";

const LoadProductReviews = ({ slug }: { slug: string }) => {
  const t = useTranslations("ProductPage");
  const { data, isLoading, isError } =
    trpc.productPage.getProductReview.useQuery(slug);
  if (isLoading) return <ProductReviewSkeleton />;
  if (isError) return null;

  if (data?.length === 0)
    return <p className="mb-[5rem]">{t("noReviewYet")}</p>;

  return (
    <section>
      {data?.map((review) => (
        <ProductReviewCard
          key={review.id}
          userMessage={review.review}
          userRated={review.rating}
          username={review.username!}
        />
      ))}
    </section>
  );
};

export default LoadProductReviews;
