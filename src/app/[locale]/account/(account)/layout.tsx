import AccountNav from "@/components/account/account-nav";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-[95%] mx-auto flex md:gap-6">
      <AccountNav />
      {children}
    </main>
  );
};

export default layout;
