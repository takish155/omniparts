"use client";

import { trpc } from "@/app/_trpc/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const ReviewProduct = ({
  productName,
  productSlug,
}: {
  productName: string;
  productSlug: string;
}) => {
  const { data, isLoading, isError } =
    trpc.account.hasBeenPurchased.useQuery(productName);
  const t = useTranslations("ProductPage");

  if (isLoading || isError || data === false) return null;

  return (
    <Alert className="w-[90%] mb-7">
      <RocketIcon />
      <AlertTitle>{t("productBought")}</AlertTitle>
      <AlertDescription className="flex flex-wrap justify-between items-center gap-4">
        <p className="w-[50%]">{t("productBoughtDescription")}</p>{" "}
        <Link
          passHref
          href={`/product/${productSlug}/review`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant={"link"} size={"sm"}>
            {t("reviewProduct")}
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default ReviewProduct;
