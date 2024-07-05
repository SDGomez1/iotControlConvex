"use client";

import { useParams, useRouter } from "next/navigation";

import FunctionCard from "components/dashboard/admin/device/FunctionCard";

import {
  closePort,
  connectToSerial,
  getReader,
  startReading,
} from "utils/serialUtils";
import { deFormatUrl } from "utils/urlUtils";

import { useAppDispatch, useAppSelector } from "lib/hooks";
import {
  addConectedDevice,
  removeConectedDevice,
} from "lib/features/conectedDevices/conectedDevicesSlice";
import { cleanRawSerialData } from "lib/features/rawSerialData/rawSerialDataSlice";

import { useEffect, useState } from "react";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import type { conectedDeviceData } from "types/serial";
import EditView from "components/dashboard/admin/device/EditView";
import { cleanDeviceFunctionClientData } from "lib/features/deviceFunctionClientData/deviceFunctionClientDataSlice";
import {
  ejex,
  filterAndFormatData,
  generarListaNumeros,
  getCardsData,
  getGraphData,
} from "utils/FileProcessingUtils";
import { Card, LineChart } from "@tremor/react";

export default function Device() {
  const params = useParams<{ deviceName: string }>();
  const deviceId = deFormatUrl(params.deviceName);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedPort, setSelectedPort] = useState<SerialPort | undefined>(
    undefined,
  );
  const [reader, setReader] = useState<ReadableStreamDefaultReader | undefined>(
    undefined,
  );

  const dispatch = useAppDispatch();

  const currentDeviceFunctions = useAppSelector(
    (state) => state.deviceFunctionClientData,
  );
  const rawSerialData = useAppSelector((state) => state.rawSerialData);
  const devicesList = useAppSelector((state) => state.conectedDevice);

  const device = useQuery(api.device.getdeviceById, {
    deviceId: deviceId as Id<"device">,
  });
  const functions = useQuery(api.deviceFunction.getFunctionByDeviceId, {
    deviceId: deviceId as Id<"device">,
  });

  const setDeviceInactive = useMutation(api.device.setDeviceInactive);

  const isConected = devicesList.find((item) => item.id === deviceId);

  if (selectedPort === undefined) {
    if (isConected) {
      setSelectedPort(isConected.device);
      setReader(isConected.reader);
    }
  }

  useEffect(() => {
    if (selectedPort !== undefined) {
      const data: conectedDeviceData = {
        id: deviceId,
        device: selectedPort,
        reader: reader as ReadableStreamDefaultReader,
      };
      dispatch(addConectedDevice(data));
    } else {
      dispatch(cleanRawSerialData(deviceId));
    }
  }, [selectedPort]);

  useEffect(() => {
    if (currentDeviceFunctions.length > 0) {
      dispatch(cleanDeviceFunctionClientData());
    }
  }, [currentDeviceFunctions]);

  const textSerialData = rawSerialData.map((data) => data.data);
  const formattedData = filterAndFormatData(textSerialData.join(""));

  const graphData = getGraphData(formattedData);
  const cardData = getCardsData(formattedData);

  const serialDataCard = formattedData.map((data, index) => {
    return <ul key={index}>{data}</ul>;
  });
  const cardDataComponent = cardData?.map((value, index) => {
    return (
      <Card
        className="max-w-xs shrink-0"
        decoration="top"
        decorationColor="indigo"
        key={index}
      >
        <p className="text-center text-xs lg:text-sm dark:text-dark-tremor-content">
          {value.title}
        </p>
        <p className="text-center text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {value.data}
        </p>
      </Card>
    );
  });
  const functionscom = functions?.map((e, i) => {
    return <FunctionCard functionData={e} key={i} serialPort={selectedPort} />;
  });

  const array = [
    -100, 1000, -30, 500, -29.8, 150, 300, 1000, 200, 500, 600, 150,
  ];
  const ejexData = ejex(array);

  return (
    <section className="h-full overflow-y-scroll px-4 pb-40">
      {isEditing ? (
        <EditView
          deviceId={deviceId}
          name={device?.name as string}
          description={device?.description as string}
          deviceFunctions={functions}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <h2 className="my-0 mb-2 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl">
            {device?.name}
          </h2>
          <p
            className={`mb-4 border-0 bg-transparent px-0 text-sm  text-lightText outline-none lg:text-base dark:text-darkText`}
          >
            {device?.description}
          </p>

          <h3 className="mb-2 text-xl font-medium lg:text-2xl">
            Funciones Disponibles
          </h3>

          <div className="mb-8 flex w-full auto-rows-max grid-cols-2 flex-col justify-items-center gap-4 lg:grid 2xl:grid-cols-3">
            {functionscom}
          </div>
          <h4 className="text-sm lg:text-xl">Consola de comandos</h4>
          <p className="mb-4 text-xs italic text-lightText lg:text-sm dark:text-darkText">
            Datos recibidos del microcontrolador
          </p>

          <div className="dark:border-darkTex relative mb-4 max-h-32 min-h-20 w-full overflow-y-scroll rounded border border-lightText p-2 text-sm">
            <ul>{serialDataCard}</ul>
          </div>
          <h4 className="mb-2 text-sm lg:text-xl">Últimos datos recibidos</h4>
          <p className="mb-4 text-xs italic text-lightText lg:text-sm dark:text-darkText">
            Para ver datos en esta seccion envialos con el formato
            "&lt;variable:"
          </p>
          <div className="mb-4 flex h-auto w-full max-w-full items-start justify-start gap-4 overflow-x-scroll">
            {(cardDataComponent?.length as number) > 0 ? (
              <>{cardDataComponent}</>
            ) : (
              <p>No hay datos configurados para mostrar su ultimo valor</p>
            )}
          </div>
          <h4 className="mb-2 text-sm lg:text-xl">Graficas</h4>
          <p className="mb-4 text-xs italic text-lightText lg:text-sm dark:text-darkText">
            Para ver datos en esta seccion envialos con el formato
            "&gt;variable:"
          </p>
          {graphData.jsonResult.length > 0 ? (
            <LineChart
              data={graphData.jsonResult}
              index="index"
              categories={graphData.variableNames}
              onValueChange={(v) => console.log(v)}
            />
          ) : (
            <p>No hay datos configurados para graficar</p>
          )}
          <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
            {selectedPort ? (
              <></>
            ) : (
              <button
                className="rounded border border-lightText bg-transparent px-8 py-2 text-sm text-lightText transition hover:bg-gray-50 dark:border-darkText dark:text-darkText"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            )}
            {"serial" in navigator ? (
              <>
                <button
                  className={`rounded  px-8 py-2 text-sm text-white ${!selectedPort ? "bg-accent hover:bg-indigo-700" : "bg-danger hover:bg-red-600"} transition`}
                  onClick={async () => {
                    if (!selectedPort) {
                      const serialPort = await connectToSerial(9600);
                      const reader = await getReader(serialPort);

                      setSelectedPort(serialPort);
                      setReader(reader);
                      startReading(serialPort, reader, deviceId);
                    } else {
                      await closePort(selectedPort, reader);
                      dispatch(removeConectedDevice(deviceId));
                      setReader(undefined);
                      setSelectedPort(undefined);
                      setDeviceInactive({ deviceId: deviceId as Id<"device"> });
                    }
                  }}
                >
                  {selectedPort ? "Desconectar" : "Conectar"}
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </section>
  );
}
