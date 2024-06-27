"use client";

import { useTheme } from "next-themes";

import { Fragment, useEffect, useState } from "react";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Menu as="div" className="relative hidden lg:block">
      <MenuButton className="flex items-center justify-center">
        {resolvedTheme === "light" ? (
          <SunIcon className="size-6 stroke-lightText" />
        ) : (
          <MoonIcon className="size-6 stroke-darkText" />
        )}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-1 mt-2 flex w-44 origin-top-right flex-col rounded bg-white  shadow-lg ring-1 ring-lightText/20 focus:outline-none dark:bg-dark dark:ring-darkText ">
          <MenuItem>
            <button
              onClick={() => setTheme("light")}
              className="flex h-full items-center gap-2 px-2 py-1 text-sm text-lightText data-[focus]:bg-black/10 dark:text-darkText dark:data-[focus]:bg-white/10 "
            >
              <SunIcon className="size-6 stroke-lightText dark:stroke-darkText" />
              Modo claro
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 px-2 py-1 text-sm text-lightText data-[focus]:bg-black/10 dark:text-darkText dark:data-[focus]:bg-white/10"
            >
              <MoonIcon className="size-6 stroke-lightText  dark:stroke-darkText" />
              Modo Oscuro
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 px-2 py-1 text-sm text-lightText data-[focus]:bg-black/10 dark:text-darkText dark:data-[focus]:bg-white/10"
            >
              <DesktopIcon className="size-6 stroke-lightText dark:stroke-darkText" />
              Sistema
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
