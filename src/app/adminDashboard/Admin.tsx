"use client";

import Card from "components/dashboard/card";
import Navbar from "components/dashboard/navbar";
import { useConnectedDevice } from "context/conectedDeviceContext";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatUrl } from "lib/utils";
import Link from "next/link";
import style from "styles/dashboard/admin.module.css";

export default function Admin() {
  const devicesList = useQuery(api.device.getdevices);

  const devicesCards = devicesList?.map((device, index) => {
    const url = formatUrl(device.nombre, device._id);
    return (
      <Card
        titulo={device.nombre}
        descripcion={device.description}
        url={`adminDashboard/devices/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className={style.container}>
      <Navbar admin={true} />
      <section className={style.mainSection}>
        <div className={style.linkContainer}>
          <h2>Conectar un dispositvo</h2>
          <Link href={"adminDashboard/newDevice"}>
            <button>Nuevo dispositvo</button>
          </Link>
        </div>

        <div className={style.gridContainer}>{devicesCards}</div>
      </section>
    </main>
  );
}
