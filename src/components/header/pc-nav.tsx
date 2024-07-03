import React from "react";
import CategoryNavList from "./CategoryNavList";

const PCNav = () => {
  return (
    <nav className="max-lg:hidden">
      <ul className="flex gap-4 font-medium text-sm">
        <CategoryNavList />
      </ul>
    </nav>
  );
};

export default PCNav;
