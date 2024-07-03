import { useTranslations } from "next-intl";
import React from "react";
import LocaleLink from "../locale-link";
import { History, ListOrdered, Settings } from "lucide-react";
import { SheetClose } from "../ui/sheet";

const navList = [
  {
    name: "orders",
    href: "/account",
    icon: <ListOrdered />,
  },
  {
    name: "orderHistory",
    href: "/account/order-history",
    icon: <History />,
  },
  {
    name: "accountSecurity",
    href: "/account/account-security",
    icon: <Settings />,
  },
];

const AccountNavList = ({
  className,
  isMobile,
}: {
  className?: string;
  isMobile?: boolean;
}) => {
  const t = useTranslations("AccountNav");

  return (
    <ul className={className}>
      {navList.map((links) => {
        if (isMobile) {
          return (
            <li key={links.name}>
              <SheetClose asChild>
                <LocaleLink
                  href={links.href}
                  className="flex gap-2 pl-3 text-lg items-center hover:bg-gray-50 py-4"
                >
                  {links.icon} {t(links.name as any)}
                </LocaleLink>
              </SheetClose>
            </li>
          );
        }

        return (
          <li key={links.name}>
            <LocaleLink
              href={links.href}
              className="flex gap-2 text-lg font-light items-center hover:font-bold py-2"
            >
              {links.icon} {t(links.name as any)}
            </LocaleLink>
          </li>
        );
      })}
    </ul>
  );
};

export default AccountNavList;
