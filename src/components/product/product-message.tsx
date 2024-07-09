import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import parts from "@/../public/images/pc-parts.webp";
import Image from "next/image";

interface PageMessageProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const PageMessage = ({ title, description }: PageMessageProps) => {
  const t = useTranslations("PageMessages");

  return (
    <section className="flex flex-col">
      <h2 className="text-center text-7xl font-bold mt-[10vh] mb-2">{title}</h2>
      <p className="text-xl w-[70%] mx-auto text-center mb-6">{description}</p>
      <Link href="/" className="mx-auto mb-20 flex gap-4">
        <Button>{t("returnHome")}</Button>
      </Link>
      <Image src={parts} alt="parts" className="mx-auto mb-[15vh]" />
    </section>
  );
};

export default PageMessage;
