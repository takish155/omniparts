import React from "react";
import { Accordion } from "../ui/accordion";
import { useTranslations } from "next-intl";
import AccordionTemplate from "./accordion-template";

const BuyingQuestions = () => {
  const t = useTranslations("SupportPage");

  return (
    <section className="w-full mx-auto max-w-[1000px] mb-16">
      <h3 className="mb-2 text-3xl font-bold text-center">
        {t("customerRelatedQuestions")}
      </h3>
      <Accordion type="single" collapsible>
        <AccordionTemplate
          value="1"
          question={t("doesItShip")}
          answer={t("doesItShipAnswer")}
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
      </Accordion>
    </section>
  );
};

export default BuyingQuestions;
