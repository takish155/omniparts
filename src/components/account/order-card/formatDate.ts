import { useLocale } from "use-intl";

export const formatDate = (date: Date) => {
  const locale = useLocale!();

  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};
