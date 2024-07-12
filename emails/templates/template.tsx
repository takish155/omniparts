import {
  Column,
  Container,
  Heading,
  Html,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React, { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <Tailwind>
      <Html className="font-sans">
        <Container>
          <Section className="mb-12">
            <Heading className="font-bold text-3xl text-center">
              Omniparts
            </Heading>
          </Section>
          {children}
          <Section className="mt-48">
            <Text className="text-center"></Text>
            <Text className="text-center">
              Portfolio Project,
              <Link href="https://takish155.dev/">takish155.dev</Link> <br />
              ©2024 Omniparts, all rights reserve
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
};

Template.Section = function EmailSection({
  children,
}: {
  children: ReactNode;
}) {
  return <Section className="mb-8">{children}</Section>;
};

export default Template;
