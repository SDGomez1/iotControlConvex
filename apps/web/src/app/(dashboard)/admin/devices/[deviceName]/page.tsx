"use client";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import type { conectedDeviceData } from "types/serial";
import {
  closePort,
  connectToSerial,
  getReader,
  startReading,
  writeToPort,
} from "utils/serialUtils";

import { deFormatUrl } from "utils/urlUtils";
import { useAppDispatch, useAppSelector } from "lib/hooks";

import { add, remove } from "lib/features/conectedDevices/conectedDevicesSlice";
import Graph from "./Graph";

export default function Device() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPort, setSelectedPort] = useState<SerialPort | undefined>(
    undefined,
  );
  const [reader, setReader] = useState<ReadableStreamDefaultReader | undefined>(
    undefined,
  );

  const params = useParams<{ deviceName: string }>();
  const deviceId = deFormatUrl(params.deviceName);

  const device = useQuery(api.device.getdeviceById, {
    deviceId: deviceId as Id<"device">,
  });
  const functions = useQuery(api.deviceFunction.getFunctionByDeviceId, {
    deviceId: deviceId as Id<"device">,
  });

  // const functionscom = functions?.map((e, i) => {
  //   return (
  //     <FunctionCardView titulo={e.name} descripcion={e.description} key={i} />
  //   );
  // });

  const dispatchConectedDevices = useAppDispatch();
  const devicesList = useAppSelector((state) => state.conectedDevice);

  const isConected = devicesList.find((item) => item.id === deviceId);

  useEffect(() => {
    if (selectedPort !== undefined) {
      const data: conectedDeviceData = {
        id: deviceId,
        device: selectedPort,
        reader: reader as ReadableStreamDefaultReader,
      };
      dispatchConectedDevices(add(data));
    }
  }, [selectedPort]);

  return (
    <main className="min-h-screen min-w-full dark:bg-dark ">
      <section className="flex flex-col items-start  gap-4 border-b-2 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-40">
        <div className="w-full ">
          <h2 className="my-0 text-xl font-semibold lg:text-3xl">
            {device?.name}
          </h2>
          <p className="text-sm text-neutral-500">{device?.description}</p>
        </div>

        <div className="flex w-full gap-8  lg:justify-end">
          {!isConected ? (
            <button
              onClick={async () => {
                const port = await connectToSerial();
                const reader = await getReader(port);
                const readPort = async () => {
                  const data = await startReading(port, reader, deviceId);
                };
                readPort();
                setReader(reader);
                setSelectedPort(port);
              }}
              className=" hidden h-8 w-44 items-center justify-center gap-4 rounded bg-emerald-700 py-2 text-sm text-white transition hover:bg-emerald-600 lg:flex lg:h-9"
            >
              Conectar
            </button>
          ) : (
            <button
              onClick={async () => {
                closePort(selectedPort, reader);
                setReader(undefined);
                setSelectedPort(undefined);
                dispatchConectedDevices(remove(deviceId));
              }}
              className=" hidden h-8 w-44 items-center justify-center gap-4 rounded bg-red-700 py-2 text-sm text-white transition hover:bg-red-600 lg:flex lg:h-9"
            >
              Desconectar
            </button>
          )}

          <button className="flex h-8 w-44 items-center justify-center rounded border border-black bg-transparent px-8 py-1 text-sm transition hover:bg-white lg:h-9">
            Editar Funciones
          </button>
        </div>
      </section>
      <div className="flex flex-col gap-4 px-4 pt-4 lg:px-40">
        <h3 className="text-xl  font-medium lg:text-2xl">
          Funciones Disponibles
        </h3>
        {isEditing ? <></> : <></>}
      </div>
    </main>
  );
}
