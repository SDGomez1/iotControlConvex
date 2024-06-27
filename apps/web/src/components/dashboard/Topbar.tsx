"use client";
import { usePathname, useRouter } from "next/navigation";

import Notifications from "components/dashboard/Notifications";
import ThemeSwitch from "components/common/ThemeSwitch";

import type { ActiveSessionResource } from "@clerk/types";

import type { Dispatch, SetStateAction } from "react";

import { Doc } from "convex/_generated/dataModel";
import { HamburgerMenuIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default function Topbar(props: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentTeam: Doc<"team">;
  currentUser: ActiveSessionResource;
}) {
  const currentUrl = usePathname();
  const router = useRouter();

  const isAdmin = props.currentTeam.adminId === props.currentUser.user.id;
  const adminUrl = currentUrl.includes("admin");

  let navigationIndicator = "Dispositivos";
  if (currentUrl.includes("devices")) {
    navigationIndicator = "Dispositivos";
  }
  if (currentUrl.includes("logs")) {
    navigationIndicator = "Historial";
  }
  if (currentUrl.includes("team")) {
    navigationIndicator = "Equipo";
  }
  return (
    <nav className="flex w-full items-center justify-between px-4 py-4 lg:px-0 lg:py-6">
      <div className="flex items-center justify-center gap-4">
        <span onClick={() => props.setIsOpen(true)} className="lg:hidden">
          <HamburgerMenuIcon className="size-6 fill-lightText stroke-[0px] lg:hidden dark:fill-darkText" />
        </span>
        <h1 className="text-sm font-bold lg:text-base">
          {navigationIndicator} /
        </h1>
        {!isAdmin ? (
          <p className="font-bold">Usuario</p>
        ) : (
          <select
            value={adminUrl ? "/admin" : "/user"}
            className="border-none bg-transparent pl-0 font-bold ring-0 focus:ring-0"
            onChange={(e) => {
              const value = e.currentTarget.value;
              const route = currentUrl.includes(value);

              if (!route) {
                const newRoute = currentUrl.replace(
                  /\/admin|\/user/g,
                  `${value}/`,
                );
                router.push(`${newRoute}`);
              }
            }}
          >
            <option value={"/user"} className="dark:bg-dark">
              Usuario
            </option>

            <option value={"/admin"} className="dark:bg-dark">
              Admin
            </option>
          </select>
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeSwitch />
        <a href="https://iot-control-convex-docs.vercel.app/" target="_blank">
          <InfoCircledIcon className="size-6 text-lightText dark:text-darkText" />
        </a>
        <Notifications />
      </div>
    </nav>
  );
}
