import React from "react";
import VerifyEmail from "../templates/verify-email";
import Template from "../templates/template";
import { Button, Heading, Row, Section, Text } from "@react-email/components";

const ForgotPasswordJA = ({
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
          <Heading className="text-lg">こんにちは、{username}様！</Heading>
          <Row>パスワードをお忘れですか？</Row>
          <Row>
            あなたのアカウントのパスワードリセットのリクエストを受け取りました。
          </Row>
        </Template.Section>
        <Button
          href={url}
          style={{
            color: "white",
          }}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
        >
          パスワードをリセット
        </Button>
      </Section>
    </Template>
  );
};

export default ForgotPasswordJA;
