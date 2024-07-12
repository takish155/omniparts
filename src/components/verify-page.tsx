"use client";

import { trpc } from "@/app/_trpc/client";
import PageMessage from "@/components/product/product-message";
import { useTranslations } from "next-intl";

const VerifySection = ({
  params,
}: {
  params: { tokenId: string; username: string };
}) => {
  const t = useTranslations("PageMessages");
  const { data, isError, error, isLoading } =
    trpc.account.verifyTokenId.useQuery({
      tokenId: params.tokenId,
      username: params.username,
    });

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <PageMessage
        title={`${error?.data?.httpStatus} ${error?.data?.code}`}
        description={error.message}
      />
    );
  }

  return (
    <PageMessage
      title={t("emailVerifiedSuccess")}
      description={data?.message!}
    />
  );
};

export default VerifySection;
