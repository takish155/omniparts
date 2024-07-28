import AccordionTemplate from "@/components/support/accordion-template";
import BuyingQuestions from "@/components/support/buying-questions";
import TechnicalQuestions from "@/components/support/technical-questions";
import { Accordion } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const SupportPage = () => {
  const t = useTranslations("SupportPage");

  return (
    <main className="w-[95%] mx-auto min-h-screen">
      <HelpCircle className="mx-auto mt-10 mb-5" size={70} />
      <h2 className="text-center font-semibold text-5xl mb-2">{t("title")}</h2>
      <p className="text-center text-2xl font-light mb-20">
        {t("description")}
      </p>
      <BuyingQuestions />
      <TechnicalQuestions />
      {/* <Accordion
        type="single"
        collapsible
        className="w-full mx-auto max-w-[1000px]"
      >
        <AccordionTemplate
          value="1"
          question={t("doesItShip")}
          answer={t("doesItShipAnswer")}
        />
        <AccordionTemplate
          value="2"
          question={t("howToContact")}
          answer={t("howToContactAnswer")}
        />
        <AccordionTemplate
          value="3"
          question={t("howToBuy")}
          answer={t("howToBuyAnswer")}
        />
        <AccordionTemplate
          value="4"
          question={t("itAskedMeToVerify")}
          answer={t("itAskedMeToVerifyAnswer")}
        />
        <AccordionTemplate
          value="5"
          question={t("whatNotToDo")}
          answer={t("WhatNotToDoAnswer")}
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
      </Accordion> */}
    </main>
  );
};

export default SupportPage;
