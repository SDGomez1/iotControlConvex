"use client";
import { ChevronUpDown } from "components/icons/ChevronUpDown";
import { Moon } from "components/icons/Moon";
import { Sun } from "components/icons/Sun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function MobileThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <span>
        {resolvedTheme === "light" ? (
          <Sun className="stroke-lightText size-5" />
        ) : (
          <Moon className="size-5 stroke-darkText" />
        )}
      </span>
      <select
        className="text-lightText border-0 bg-none p-0 text-sm focus:border-none focus:outline-none dark:bg-dark dark:text-darkText"
        value={resolvedTheme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Modo claro</option>
        <option value="dark">Modo oscuro</option>
        <option value="system">Sistema</option>
      </select>
      <span>
        <ChevronUpDown className="stroke-lightText size-5 dark:stroke-darkText" />
      </span>
    </div>
  );
}
