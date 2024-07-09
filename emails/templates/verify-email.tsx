import React, { ReactNode } from "react";
import Template from "./template";
import { Section, Heading, Text, Row } from "@react-email/components";

const VerifyEmail = ({ children }: { children: ReactNode }) => {
  return <Template>{children}</Template>;
};

VerifyEmail.Section = function Sections({ children }: { children: ReactNode }) {
  return <Section className="mb-4">{children}</Section>;
};

VerifyEmail.GreetingHeading = function GreetingHeading({
  children,
}: {
  children: ReactNode;
}) {
  return <Heading className={`text-2lg `}>{children}</Heading>;
};

VerifyEmail.GreetingMessage = function Message({
  children,
}: {
  children: ReactNode;
}) {
  return <Text className="text-md font-bold">{children}</Text>;
};

VerifyEmail.Paragraph = function Paragraph({
  children,
}: {
  children: ReactNode;
}) {
  return <Row className="text-md">{children}</Row>;
};

export default VerifyEmail;
