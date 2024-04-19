"use client";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { deFormatUrl } from "utils/urlUtils";
import { useParams } from "next/navigation";
import FunctionCardExecution from "components/dashboard/user/FunctionCardsExecution";
import { Card, LineChart } from "@tremor/react";
import { useEffect } from "react";

export default function Device() {
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
    const getFunction = async () => {
      const fileUrl = await getFileUrl({ storageId: file as Id<"_storage"> });
      if (!fileUrl) {
        return;
      }
      const fileData = await fetch(fileUrl);
      console.log(fileData);
      const reader = new FileReader();
    };
    getFunction();
  }, [file]);

  return (
    <section className="h-full  items-start overflow-y-scroll px-4 pb-20 ">
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
      <div className="dark:border-darkTex mb-4 max-h-32 w-full overflow-y-scroll rounded border border-lightText p-2 text-sm">
        <ul>
          <li>Dato 1</li>
          <li>Dato 2</li>
        </ul>
      </div>
      <h4 className="mb-2 text-sm lg:text-xl">Últimos datos recibidos</h4>
      <p className="mb-2 text-xs text-lightText lg:text-base dark:text-darkText">
        Esta sección muestra los datos configurados como “mostrar ultimo”
      </p>
      <div className="mb-4 flex h-auto items-start justify-start gap-4 overflow-x-scroll p-2">
        <Card
          className="mx-auto max-w-xs"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-xs lg:text-sm dark:text-dark-tremor-content">
            Sales
          </p>
          <p className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $34,743
          </p>
        </Card>
        <Card
          className="mx-auto max-w-xs"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-xs lg:text-sm dark:text-dark-tremor-content">
            Sales
          </p>
          <p className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $34,743
          </p>
        </Card>
      </div>
      <h4 className="mb-2 text-sm lg:text-xl">Graficas</h4>
      <p className="mb-2 text-xs text-lightText lg:text-base dark:text-darkText">
        Esta sección muestra los datos configurados como “Graficar”{" "}
      </p>
    </section>
  );
}
