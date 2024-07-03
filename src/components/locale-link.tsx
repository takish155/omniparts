import { useLocale } from "next-intl";
import Link from "next/link";
import React, { ReactNode } from "react";

const LocaleLink = ({
  children,
  href,
  passHref = false,
  className,
}: {
  children: string | ReactNode;
  href: string;
  passHref?: boolean;
  className?: string;
}) => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/${href}`} passHref={passHref} className={className}>
      {children}
    </Link>
  );
};

export default LocaleLink;
