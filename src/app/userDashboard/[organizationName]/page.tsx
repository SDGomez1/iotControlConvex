"use client";
import styles from "styles/dashboard/admin.module.css";

import Card from "components/dashboard/Card";
import Navbar from "components/dashboard/Navbar";
import { useParams } from "next/navigation";
import { deFormatUrl, formatUrl } from "lib/utils";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";

export default function () {
  const params = useParams<{ organizationName: string }>();
  const organizationId = deFormatUrl(params.organizationName);

  const devices = useQuery(api.device.getDeviceByOrganizationId, {
    organizationId: organizationId as Id<"organization">,
  });

  const deviceCard = devices?.map((device, index) => {
    const url = formatUrl(device.nombre, device._id);
    return (
      <Card
        titulo={device.nombre}
        descripcion={device.description}
        url={`${params.organizationName}/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className={styles.container}>
      <Navbar />

      <section className={styles.mainSection}>
        <div className={styles.linkContainer}>
          <h2> Conectar a dispositivo</h2>
        </div>
        <div className={styles.gridContainer}>{deviceCard}</div>
      </section>
    </main>
  );
}
