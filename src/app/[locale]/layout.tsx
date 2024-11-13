import type { Metadata } from "next";
import { Roboto, M_PLUS_1p } from "next/font/google";
import "./../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { ReactNode } from "react";
import QueryProvider from "@/context/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "../api/auth/auth";
import { SessionProvider } from "@/context/SessionProvider";
import "@uploadthing/react/styles.css";
import dynamic from "next/dynamic";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const m_plus = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Omniparts",
  manifest: "/manifest.json",
};

const AlertVerifyEmail = dynamic(
  () => import("@/components/alert-verify-email")
);

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
    signin: ReactNode;
    signup: ReactNode;
  }>
) {
  const params = await props.params;

  const { children } = props;

  const [messages, session] = await Promise.all([getMessages(), auth()]);

  return (
    <html lang={params.locale}>
      <body
        className={params.locale === "en" ? roboto.className : m_plus.className}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <SessionProvider session={session}>
              <Header />
              {session && <AlertVerifyEmail />}
              {children}
              <Toaster />
              <Footer />
            </SessionProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
