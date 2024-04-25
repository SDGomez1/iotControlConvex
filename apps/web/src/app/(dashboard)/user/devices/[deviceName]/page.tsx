"use client";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { deFormatUrl } from "utils/urlUtils";
import { useParams } from "next/navigation";
import FunctionCardExecution from "components/dashboard/user/FunctionCardsExecution";
import { Card, LineChart } from "@tremor/react";
import { useEffect, useState } from "react";
import {
  fetchAndReadStreamData,
  filterAndFormatData,
  getCardsData,
  getDownloadData,
  getGraphData,
} from "utils/dataProcessingUtils";

export default function Device() {
  const [recievedData, setRecievedData] = useState("");
  const params = useParams<{ deviceName: string }>();
  const deviceId = deFormatUrl(params.deviceName);

  const device = useQuery(api.device.getdeviceById, {
    deviceId: deviceId as Id<"device">,
  });
  const functions = useQuery(api.deviceFunction.getFunctionByDeviceId, {
    deviceId: deviceId as Id<"device">,
  });

  const file = useQuery(api.device.getStorageUrl, {
    deviceId: deviceId as Id<"device">,
  });

  const getFileUrl = useMutation(api.device.getFiles);
  //Todo: comand lifecycle, and styles
  const functionscom = functions?.map((e, i) => {
    return (
      <FunctionCardExecution
        name={e.name}
        description={e.description}
        key={i}
        id={e._id}
      />
    );
  });

  useEffect(() => {
    if (file) {
      const getFunction = async () => {
        const fileUrl = await getFileUrl({ storageId: file as Id<"_storage"> });
        if (!fileUrl) {
          return;
        }
        const data = await fetchAndReadStreamData(fileUrl);
        setRecievedData(data);
      };
      getFunction();
    }
  }, [file]);

  const filteredData = filterAndFormatData(recievedData);
  const consoleData = filteredData?.map((value, index) => {
    return <li key={index}>{value}</li>;
  });
  const graphData = getGraphData(filteredData);
  const cardData = getCardsData(filteredData);
  return (
    <section className="h-full  items-start overflow-y-scroll px-4 pb-40 ">
      <h2 className="my-0 mb-2 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl">
        {device?.name}
      </h2>
      <p
        className={`mb-4 border-0 bg-transparent px-0 text-sm  text-lightText outline-none lg:text-base dark:text-darkText`}
      >
        {device?.description}
      </p>

      <h3 className="mb-2  text-xl font-medium lg:text-2xl">
        Funciones del dispositivo
      </h3>
      <div className="mb-8 flex w-full auto-rows-max grid-cols-2 flex-col justify-items-center   gap-4 lg:grid  2xl:grid-cols-3">
        {functionscom}
      </div>
      <h3 className="text-xl  font-medium lg:text-2xl">Datos Recibidos</h3>
      <h4 className="mb-2 text-sm lg:text-xl">Consola de comandos</h4>
      <p className="mb-2 text-xs text-lightText lg:text-base dark:text-darkText">
        Esta sección muestra todos los datos recibidos que no se configuraron
        para graficar
      </p>
      <div className="dark:border-darkTex relative mb-4 max-h-32 w-full overflow-y-scroll rounded border border-lightText p-2 text-sm">
        <button
          className="absolute right-1 top-1 border p-2"
          onClick={() => {
            const downloadData = getDownloadData(recievedData);
            const csvBlob = new Blob([downloadData], {
              type: "text/csv;charset=utf-8",
            });
            const url = window.URL.createObjectURL(csvBlob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${deviceId}.csv`;

            // Append the link to the body, click it, and then remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Free up the blob URL
            window.URL.revokeObjectURL(url);
          }}
        >
          Descargar
        </button>
        <ul>{consoleData}</ul>
      </div>
      <h4 className="mb-2 text-sm lg:text-xl">Últimos datos recibidos</h4>
      <p className="mb-2 text-xs text-lightText lg:text-base dark:text-darkText">
        Esta sección muestra los datos configurados como “mostrar ultimo”
      </p>
      <div className="mb-4 flex h-auto items-start justify-start gap-4 overflow-x-scroll p-2">
        {cardData.length > 0 ? (
          cardData.map((value, index) => {
            return (
              <Card
                className="mx-auto max-w-xs"
                decoration="top"
                decorationColor="indigo"
                key={index}
              >
                <p className="text-xs lg:text-sm dark:text-dark-tremor-content">
                  {value.title}
                </p>
                <p className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {value.data}
                </p>
              </Card>
            );
          })
        ) : (
          <p>No hay datos configurados para mostrar su ultimo valor</p>
        )}
      </div>
      <h4 className="mb-2 text-sm lg:text-xl">Graficas</h4>
      <p className="mb-2 text-xs text-lightText lg:text-base dark:text-darkText">
        Esta sección muestra los datos configurados como “Graficar”{" "}
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
    </section>
  );
}
