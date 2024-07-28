import { useTranslations } from "next-intl";
import React from "react";
import { Accordion } from "../ui/accordion";
import AccordionTemplate from "./accordion-template";

const TechnicalQuestions = () => {
  const t = useTranslations("SupportPage");

  return (
    <section className="w-full mx-auto max-w-[1000px] mb-8">
      <h3 className="mb-2 text-3xl font-bold text-center">
        {t("technicalRelatedQuestions")}
      </h3>
      <Accordion type="single" collapsible>
        <AccordionTemplate
          value="2"
          question={t("howToContact")}
          answer={t("howToContactAnswer")}
        />
        <AccordionTemplate
          value="6"
          question={t("canIUseThis")}
          answer={t("canIUseThisAnswer")}
        />
        <AccordionTemplate
          value="7"
          question={t("simulatingBuying")}
          answer={t("simulatingBuyingAnswer")}
        />
      </Accordion>
    </section>
  );
};

export default TechnicalQuestions;
