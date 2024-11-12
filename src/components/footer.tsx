import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const t = useTranslations("PageMessages");
  const locale = useLocale();

  return (
    <footer className="w-full text-center mt-[15rem] bg-gray-950 text-white py-14">
      <p>
        {t.rich("footer", {
          link: (chunk) => (
            <Link
              href={`https://takish155.com/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
      <p>©2024 Omniparts, all rights reserve</p>
    </footer>
  );
};

export default Footer;
