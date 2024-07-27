import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const AccordionTemplate = ({
  value,
  question,
  answer,
}: {
  value: string;
  question: string;
  answer: string;
}) => {
  return (
    <AccordionItem value={`q-and-a-${value}`}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  );
};

export default AccordionTemplate;
