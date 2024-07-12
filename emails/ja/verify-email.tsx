import React from "react";
import VerifyEmail from "../templates/verify-email";
import Template from "../templates/template";
import { Button, Heading, Row, Section, Text } from "@react-email/components";

const VerifyEmailJA = ({
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
          <Heading className="text-lg">こんにちわ、{username}様</Heading>
          <Row>Omnipartsへのご登録、誠にありがとうございます。</Row>
          <Row>
            下のボタンをクリックして、メールアドレスを確認してください。
          </Row>
        </Template.Section>
        <Button
          href={url}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          メールを確認
        </Button>
      </Section>
    </Template>
  );
};

export default VerifyEmailJA;
