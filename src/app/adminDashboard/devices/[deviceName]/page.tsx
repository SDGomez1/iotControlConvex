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
import { useEffect, useState } from "react";
import { useConnectedDeviceDispatch } from "context/conectedDeviceContext";
import { conectedDeviceData } from "lib/types";
import { connectToSerial } from "lib/Serial";

export default function Device() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPort, setSelectedPort] = useState<SerialPort | undefined>(
    undefined
  );

  const dispatch = useConnectedDeviceDispatch();

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

  useEffect(() => {
    if (selectedPort !== undefined) {
      const data: conectedDeviceData = {
        id: deviceId,
        device: selectedPort,
      };
      console.log(data);
      dispatch({
        type: "ADD",
        payload: data,
      });
    }
  }, [selectedPort]);
  return (
    <main className={styles.container}>
      <Protect>
        <Navbar admin={true} />
        <section className={styles.mainContainer}>
          <div className={styles.titleContainer}>
            <h2>{device?.nombre}</h2>
            <div>
              <button
                onClick={async () => {
                  const port = await connectToSerial();
                  setSelectedPort(port);
                }}
              >
                Conectar
              </button>
              <button>Editar Funciones</button>
            </div>
          </div>
          <p>{device?.description}</p>
          <h3>Funciones Disponibles</h3>
          {isEditing ? <></> : functionscom}
        </section>
      </Protect>
    </main>
  );
}
