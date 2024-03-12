"use client";
import styles from "styles/app.module.css";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className={styles.container}>
      <SignIn
        redirectUrl="/dashboard"
        appearance={{ variables: { colorPrimary: "#131217" } }}
      />
    </main>
  );
}
