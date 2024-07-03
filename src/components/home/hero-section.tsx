import React, { Suspense } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import gpu from "@/../public/images/index/gpu.jpg";
import FeaturedSection from "./featured-section";
import LocaleLink from "../locale-link";
import { getRecommendation } from "@/lib/fetch/getRecommendation";
import { getTranslations } from "next-intl/server";

const HeroSection = async () => {
  const data = getRecommendation("gpu");
  const translations = getTranslations("indexpage");
  const [response, t] = await Promise.all([data, translations]);

  if (response.status === 500) return null;

  return (
    <article>
      <section className="flex bg-gray-950 mb-5 flex-wrap max-md:flex-col-reverse">
        <section className="text-white my-auto w-[50%] max-md:w-[90%] mx-auto flex-wrap max-md:py-6">
          <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold ml-4 mb-2">{t("heroHeader")}</h2>
            <p className="ml-4 mb-4">{t("heroDescription")}</p>
          </div>
          <div className="w-[95%] mx-auto">
            <LocaleLink href={"/discover?category=gpu"} passHref={true}>
              <Button className="ml-4">{t("browseRTX4090TIProducts")}</Button>
            </LocaleLink>
          </div>
        </section>
        <Image
          src={gpu}
          priority={true}
          alt="gpu"
          className="w-[50%] h-auto  max-md:w-full"
        />
      </section>
      <FeaturedSection
        data={response.data}
        priorityImage={true}
        noHero={true}
        title={t("recommendedGPU")}
        showMoreLink="/discover?category=gpu"
      />
    </article>
  );
};

export default HeroSection;
