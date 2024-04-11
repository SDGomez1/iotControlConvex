"use client";

import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <nav className="border-b"></nav>
      {children}
    </div>
  );
}
