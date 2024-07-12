import PageMessage from "@/components/product/product-message";
import verifyTokenId from "@/lib/fetch/verifyTokenId";
import { getTranslations } from "next-intl/server";

const VerificationPage = async ({
  params,
}: {
  params: { tokenId: string; username: string };
}) => {
  const res = verifyTokenId(params.username, params.tokenId);
  const translation = getTranslations("PageMessages");
  const [data, t] = await Promise.all([res, translation]);

  return (
    <main className="w-[95%] mx-auto">
      <PageMessage
        title={
          data?.status === 200
            ? t("emailVerifiedSuccess")
            : data?.status.toString()!
        }
        description={
          !data?.message.includes("string")
            ? data?.message!
            : t("tokenExpiredOrInvalid")
        }
      />
    </main>
  );
};

export default VerificationPage;
