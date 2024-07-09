"use client";

import { trpc } from "@/app/_trpc/client";
import PageMessage from "@/components/product/product-message";

const VerifyPage = ({ params }: { params: { tokenId: string } }) => {
  const { data, isError, error, isLoading } =
    trpc.account.verifyTokenId.useQuery(params.tokenId);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <main className="w-[95%] mx-auto">
        <PageMessage
          title={`${error?.data?.httpStatus} ${error?.data?.code}`}
          description={error.message}
        />
      </main>
    );
  }

  return <main className="w-[95%] mx-auto"></main>;
};

export default VerifyPage;
