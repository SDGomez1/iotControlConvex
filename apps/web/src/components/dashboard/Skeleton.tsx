"use client";
import Sidebar from "components/dashboard/Sidebar";
import Topbar from "components/dashboard/Topbar";

import { useState } from "react";

export default function Skeleton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex h-screen w-screen lg:max-h-screen dark:bg-dark">
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} isAdmin={true} />

      <section className="relative max-h-screen w-full overflow-hidden lg:px-12">
        <Topbar setIsOpen={setIsOpen} />

        {children}
      </section>

      {isOpen ? (
        <div
          className={`fixed top-0 h-screen w-screen bg-black/15 transition-all lg:hidden dark:bg-black/65`}
        />
      ) : (
        <></>
      )}
    </main>
  );
}
