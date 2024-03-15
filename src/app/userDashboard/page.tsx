"use client";
import styles from "styles/dashboard/admin.module.css";

import Card from "components/dashboard/card";
import Navbar from "components/dashboard/navbar";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatUrl } from "lib/utils";

export default function () {
  const availableOrganizations = useQuery(
    api.organization.getUserOrganizations
  );

  const organizationCards = availableOrganizations?.map((info, index) => {
    const url = formatUrl(info.name, info._id);
    return (
      <Card
        titulo={info.name}
        descripcion={info.description}
        url={`userDashboard/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className={styles.container}>
      <Navbar admin={false} />

      <section className={styles.mainSection}>
        <div className={styles.linkContainer}>
          <h2> Conectar a Admin</h2>
        </div>
        <div className={styles.gridContainer}>{organizationCards}</div>
      </section>
    </main>
  );
}
