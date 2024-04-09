"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function ThemesProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      {children}
    </ThemeProvider>
  );
}
