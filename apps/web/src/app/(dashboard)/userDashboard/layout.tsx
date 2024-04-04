"use client";

import { PropsWithChildren } from "react";

import Navbar from "components/common/Navbar";
import LinkBar from "components/common/LinkBar";
import Footer from "components/common/Footer";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <nav className="border-b">
        <Navbar />
        <LinkBar
          links={[
            {
              link: "Organizaciones",
              location: "adminDashboard",
              url: "/userDashboard",
            },
            {
              link: "Dispositivos",
              location: "newDevice",
              url: "/userDashboard/",
            },
          ]}
        />
      </nav>
      {children}
      <Footer />
    </div>
  );
}
