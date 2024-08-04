import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const t = useTranslations("PageMessages");
  const locale = useLocale();

  return (
    <footer className="w-full text-center mt-[15rem] bg-gray-950 text-white py-10">
      <p className="mb-1 font-light">
        {t.rich("footer", {
          link: (chunk) => (
            <Link
              href={`https://www.takish155.dev/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
      <p className="text-sm">©2024 SomeParts, all rights reserve</p>
    </footer>
  );
};

export default Footer;
