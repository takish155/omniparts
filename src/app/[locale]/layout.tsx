import type { Metadata } from "next";
import { Roboto } from "next/font/google";
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

export const metadata: Metadata = {
  title: "PCPartHaven",
};

const AlertVerifyEmail = dynamic(
  () => import("@/components/alert-verify-email"),
  { ssr: false }
);

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
  signin: ReactNode;
  signup: ReactNode;
}>) {
  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={params.locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <SessionProvider session={session}>
              <Header />
              {/* {session && <AlertVerifyEmail />} */}
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
