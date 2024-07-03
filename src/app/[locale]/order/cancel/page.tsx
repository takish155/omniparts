import { useTranslations } from "next-intl";
import React from "react";
import PageMessage from "@/components/product/product-message";

const CancelPage = () => {
  const t = useTranslations("PageMessages");

  return (
    <main className="w-[95%] mx-auto">
      <PageMessage
        description={t("orderCancelledDescription")}
        title={
          t.rich("orderCancelledTitle", {
            span: (text) => {
              return (
                <span className="max-md:w-full text-2xl text-black">
                  <br className="lg:hidden" />
                  {text}
                </span>
              );
            },
          }) as string
        }
      />
    </main>
  );
};

export default CancelPage;
