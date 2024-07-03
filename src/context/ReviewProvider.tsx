"use client";

import useHandleReview, { UseHandleReviewType } from "@/hooks/useHandleReview";
import { ReactNode, createContext, useContext } from "react";

const ReviewProviderContext = createContext<UseHandleReviewType | null>(null);

export const ReviewProvider = ({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) => {
  const state = useHandleReview(slug);

  return (
    <ReviewProviderContext.Provider value={state}>
      {children}
    </ReviewProviderContext.Provider>
  );
};

export const useHandleReviewContext = () => {
  return useContext(ReviewProviderContext);
};
