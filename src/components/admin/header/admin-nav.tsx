"use client";

import LocaleLink from "@/components/locale-link";
import {
  BoxesIcon,
  LayoutDashboard,
  ListOrderedIcon,
  Settings,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface AdminNav {
  name: "dashboard" | "orders" | "products" | "users" | "settings";
  path:
    | "/admin"
    | "/admin/orders"
    | "/admin/products"
    | "/admin/users"
    | "/admin/settings";
  icon: JSX.Element;
}

const adminNav: AdminNav[] = [
  { name: "dashboard", path: "/admin", icon: <LayoutDashboard size={30} /> },
  {
    name: "orders",
    path: "/admin/orders",
    icon: <ListOrderedIcon size={30} />,
  },
  { name: "products", path: "/admin/products", icon: <BoxesIcon size={30} /> },
  { name: "users", path: "/admin/users", icon: <UsersIcon size={30} /> },
  { name: "settings", path: "/admin/settings", icon: <Settings size={30} /> },
];

const AdminNav = () => {
  const t = useTranslations("AdminPage");
  const pathname = usePathname();
  return (
    <nav className="mt-10">
      <ul>
        {adminNav.map((links) => (
          <li key={links.name}>
            <LocaleLink
              className={`${
                pathname.includes(links.path)
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              } w-[90%] max-w-[400px] rounded-md flex gap-2 py-2 text-lg items-center mb-2 pl-2 ml-2`}
              href={links.path}
            >
              {links.icon}{" "}
              <span className="max-md:hidden">{t(links.name)}</span>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
