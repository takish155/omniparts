import React from "react";
import VerifyEmail from "../templates/verify-email";
import Template from "../templates/template";
import { Button, Heading, Row, Section, Text } from "@react-email/components";

const ForgotPasswordEN = ({
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
          <Row>Forgot your password?</Row>
          <Row>
            We received a request to reset your password for your account.
          </Row>
        </Template.Section>
        <Button
          href={url}
          style={{
            color: "white",
          }}
          className="bg-purple-500 hover:bg-purple-600   px-4 py-2 rounded-lg"
        >
          Reset Password
        </Button>
      </Section>
    </Template>
  );
};

export default ForgotPasswordEN;
