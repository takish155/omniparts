import {
  Container,
  Heading,
  Html,
  Section,
  Tailwind,
} from "@react-email/components";
import React, { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <Tailwind>
      <Html>
        <Container className="font-sans">
          <Section className="mb-6">
            <Heading className="font-bold text-3xl text-center">
              Omniparts
            </Heading>
          </Section>
        </Container>
        {children}
      </Html>
    </Tailwind>
  );
};

export default Template;
