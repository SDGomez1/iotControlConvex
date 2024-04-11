"use client";
import { Menu, Transition } from "@headlessui/react";
import { Desktop } from "components/icons/Desktop";
import { Moon } from "components/icons/Moon";
import { Sun } from "components/icons/Sun";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";

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
      <Menu.Button className="flex items-center justify-center">
        {resolvedTheme === "light" ? (
          <Sun className="size-6 stroke-lightText" />
        ) : (
          <Moon className="size-6 stroke-darkText" />
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-1 mt-2 flex w-44 origin-top-right flex-col gap-2 rounded bg-white p-2 shadow-lg ring-1 ring-lightText/20 focus:outline-none dark:bg-dark dark:ring-darkText ">
          <Menu.Item>
            <button
              onClick={() => setTheme("light")}
              className="flex items-center gap-2 px-2 text-sm text-lightText dark:text-darkText "
            >
              <Sun className="size-6 stroke-lightText  dark:stroke-darkText" />
              Modo claro
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 px-2 text-sm text-lightText dark:text-darkText"
            >
              <Moon className="size-6 stroke-lightText  dark:stroke-darkText" />
              Modo Oscuro
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 px-2 text-sm text-lightText dark:text-darkText"
            >
              <Desktop className="size-6 stroke-lightText dark:stroke-darkText" />
              Sistema
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
