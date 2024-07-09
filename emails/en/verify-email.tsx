import React from "react";
import VerifyEmail from "../templates/verify-email";
import Template from "../templates/template";
import { Button, Heading, Row, Section, Text } from "@react-email/components";

const VerifyEmailEN = ({
  username = "takish155",
  url = "http://localhost:3000",
}: {
  username: string;
  url: string;
}) => {
  return (
    <Template>
      <Section>
        <Template.Section>
          <Heading className="text-lg">Hi, {username}!</Heading>
          <Row>Thank you for signing up in Omnipart.</Row>
          <Row>Please verify your email by clicking the button below.</Row>
        </Template.Section>
        <Button
          href={url}
          className="bg-purple-500 hover:bg-purple-600 text-blue-300 px-4 py-2 rounded-lg"
        >
          Verify Email
        </Button>
      </Section>
    </Template>
  );
};

export default VerifyEmailEN;
