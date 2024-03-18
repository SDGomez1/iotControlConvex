"use client";
import { SignIn, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn
        redirectUrl="/adminDashboard"
        appearance={{ variables: { colorPrimary: "#131217" } }}
      />
    </main>
  );
}
