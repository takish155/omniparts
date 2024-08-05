import { useTranslations } from "next-intl";
import React from "react";
import LocaleLink from "../locale-link";

export const categories = [
  { name: "cpu", link: "/discover?category=cpu" },
  { name: "gpu", link: "/discover?category=gpu" },
  { name: "memory_ram", link: "/discover?category=memory_ram" },
  { name: "motherboard", link: "/discover?category=motherboard" },
  { name: "storage", link: "/discover?category=storage" },
  { name: "psu", link: "/discover?category=psu" },
  { name: "cooling_fans", link: "/discover?category=cooling_fans" },
];

const CategoryNavList = ({ className }: { className?: string }) => {
  const t = useTranslations("categories");

  return (
    <>
      {categories.map((categories) => {
        return (
          <li key={categories.name} className={`hover:underline ${className}`}>
            <LocaleLink href={categories.link} passHref>
              {t(categories.name as any)}
            </LocaleLink>
          </li>
        );
      })}
    </>
  );
};

export default CategoryNavList;
