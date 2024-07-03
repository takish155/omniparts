import React from "react";
import FeaturedSection from "../featured-section";
import cpu from "@/../public/images/index/cpu1.jpg";
import { getTranslations } from "next-intl/server";
import { getRecommendation } from "@/lib/fetch/getRecommendation";

const FeaturedCPUSection = async () => {
  const translation = getTranslations("indexpage");
  const recommendedCPU = await getRecommendation("cpu");
  const [t, data] = await Promise.all([translation, recommendedCPU]);

  if (data.status === 500) {
    return null;
  }

  return (
    <FeaturedSection
      heroData={{
        title: t("cpuHeroTitle"),
        description: t("cpuHeroDescription"),
        actionButtonName: t("getNow"),
        buttonLink: "/discover/?category=cpu",
        image: cpu,
        position: "right",
      }}
      title={t("recommendedCPU")}
      data={data.data}
      showMoreLink={"/discover?category=cpu"}
    />
  );
};

export default FeaturedCPUSection;
