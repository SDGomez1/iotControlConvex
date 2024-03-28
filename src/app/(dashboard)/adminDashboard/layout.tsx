"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import Navbar from "components/common/Navbar";
import LinkBar from "components/common/LinkBar";
import Footer from "components/common/Footer";
import { useAppSelector } from "lib/hooks";
import { RootState } from "lib/store";
import { writeToPort } from "utils/serialUtils";

export default function AdminLayout({ children }: PropsWithChildren) {
  const commands = useQuery(api.commands.readFirstCommand);
  const deviceConected = useAppSelector(
    (state: RootState) => state.conectedDevice,
  );

  useEffect(() => {
    if (commands !== undefined && deviceConected.length > 0) {
      const targetDevice = deviceConected.find(
        (device) => device.id === commands?.deviceId,
      );
      writeToPort(targetDevice?.device, commands?.command as string);
    }
  });
  return (
    <div>
      <nav className="border-b">
        <Navbar />
        <LinkBar
          links={[
            {
              link: "Dispositivos",
              location: "adminDashboard",
              url: "/adminDashboard",
            },
            {
              link: "Nuevo Dispostivo",
              location: "newDevice",
              url: "/adminDashboard/newDevice",
            },
            {
              link: "Nuevo usuario",
              location: "newAdmin",
              url: "/adminDashboard/newAdmin",
            },
          ]}
        />
      </nav>
      {children}
      <Footer />
    </div>
  );
}
