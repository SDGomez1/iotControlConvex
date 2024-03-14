"use client";
import styles from "styles/devices/deviceName.module.css";

import { Protect } from "@clerk/nextjs";
import Navbar from "components/dashboard/navbar";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { deFormatUrl } from "lib/utils";
import { useParams } from "next/navigation";
import FunctionCardView from "components/admin/functionCardView";
import { useState } from "react";
import { ConectedDeviceProvider } from "../../../context/conectedDeviceContext";

export default function Device() {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams<{ deviceName: string }>();
  const deviceId = deFormatUrl(params.deviceName);

  const device = useQuery(api.device.getdeviceById, {
    deviceId: deviceId as Id<"device">,
  });
  const functions = useQuery(api.deviceFunction.getFunctionByDeviceId, {
    deviceId: deviceId as Id<"device">,
  });

  //Todo: comand lifecycle, and styles
  const functionscom = functions?.map((e, i) => {
    return (
      <FunctionCardView titulo={e.nombre} descripcion={e.descripcion} key={i} />
    );
  });
  return (
    <ConectedDeviceProvider>
      <main className={styles.container}>
        <Protect>
          <Navbar />
          <section className={styles.mainContainer}>
            <div className={styles.titleContainer}>
              <h2>{device?.nombre}</h2>
              <div>
                <button>Conectar</button>
                <button>Editar Funciones</button>
              </div>
            </div>
            <p>{device?.description}</p>
            <h3>Funciones Disponibles</h3>
            {isEditing ? <></> : functionscom}
          </section>
        </Protect>
      </main>
    </ConectedDeviceProvider>
  );
}
