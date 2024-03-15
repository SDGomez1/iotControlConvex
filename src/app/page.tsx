"use client";
import styles from "styles/app.module.css";
import { SignIn, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className={styles.container}>
      <SignIn
        redirectUrl="/adminDashboard"
        appearance={{ variables: { colorPrimary: "#131217" } }}
      />
    </main>
  );
}
