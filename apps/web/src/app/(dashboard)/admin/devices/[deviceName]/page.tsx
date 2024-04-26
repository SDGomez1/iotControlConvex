"use client";

import { useParams } from "next/navigation";

import FunctionCard from "components/dashboard/admin/device/FunctionCard";

import {
  closePort,
  connectToSerial,
  getReader,
  startReading,
} from "utils/serialUtils";
import { deFormatUrl } from "utils/urlUtils";

import { useAppDispatch, useAppSelector } from "lib/hooks";
import { add, remove } from "lib/features/conectedDevices/conectedDevicesSlice";

import { useEffect, useState } from "react";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

import type { conectedDeviceData } from "types/serial";

export default function Device() {
  const dispatch = useAppDispatch();

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

  const functionscom = functions?.map((e, i) => {
    return (
      <FunctionCard
        name={e.name}
        description={e.description}
        key={i}
        serialPort={selectedPort}
        command={e.command}
      />
    );
  });

  const devicesList = useAppSelector((state) => state.conectedDevice);

  const isConected = devicesList.find((item) => item.id === deviceId);

  useEffect(() => {
    if (selectedPort !== undefined) {
      const data: conectedDeviceData = {
        id: deviceId,
        device: selectedPort,
        reader: reader as ReadableStreamDefaultReader,
      };
      dispatch(add(data));
    }
  }, [selectedPort]);

  if (selectedPort === undefined) {
    if (isConected) {
      setSelectedPort(isConected.device);
    }
  }

  return (
    <section className="flex h-full flex-col items-start gap-4 px-4 py-4">
      <h2 className="my-0 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl">
        {device?.name}
      </h2>
      <p
        className={`border-0 bg-transparent px-0 text-sm text-lightText  outline-none lg:text-base dark:text-darkText`}
      >
        {device?.description}
      </p>

      <h3 className="text-xl  font-medium lg:text-2xl">
        Funciones Disponibles
      </h3>

      <div className="flex h-full w-full auto-rows-max grid-cols-2 flex-col justify-items-center gap-4 overflow-y-scroll pb-32 lg:grid 2xl:grid-cols-3 2xl:pb-32 ">
        {functionscom}
      </div>

      <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
        {selectedPort ? (
          <></>
        ) : (
          <button
            className="rounded border border-lightText bg-transparent px-8 py-2 text-sm text-lightText dark:border-darkText dark:text-darkText"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}

        <button
          className={`rounded  px-8 py-2 text-sm text-white ${!selectedPort ? "bg-accent" : "bg-danger"}`}
          onClick={async () => {
            if (!selectedPort) {
              const serialPort = await connectToSerial();
              const reader = await getReader(serialPort);

              setSelectedPort(serialPort);
              setReader(reader);
              startReading(serialPort, reader, deviceId);
            } else {
              closePort(selectedPort, reader);
              dispatch(remove(deviceId));
              setReader(undefined);
              setSelectedPort(undefined);
            }
          }}
        >
          {selectedPort ? "Desconectar" : "Conectar"}
        </button>
      </div>
    </section>
  );
}
