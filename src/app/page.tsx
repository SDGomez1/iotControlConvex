"use client";
import styles from "styles/app.module.css";
import { SignIn, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (setActive) {
      setActive({
        organization: "org_2dSi93ePI2j6ChAUUT3dGSCQAJp",
      });
    }
  }, []);
  return (
    <main className={styles.container}>
      <SignIn
        redirectUrl="/dashboard"
        appearance={{ variables: { colorPrimary: "#131217" } }}
      />
    </main>
  );
}
