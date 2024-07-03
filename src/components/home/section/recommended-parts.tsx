import { useTranslations } from "next-intl";
import React from "react";
import RecommendedPCParts from "../recommended-pc-parts-render";

const RecommendedPartsSection = () => {
  const t = useTranslations("indexpage");

  return (
    <section className="mt-20">
      <h2 className="text-center text-3xl  font-semibold pt-4 mb-10">
        {t("recommendedPartsForYou")}
      </h2>
      <RecommendedPCParts />
    </section>
  );
};

export default RecommendedPartsSection;
