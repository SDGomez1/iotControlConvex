"use client";

import { Protect } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { deFormatUrl } from "lib/utils";
import { useParams } from "next/navigation";
import FunctionCardExecution from "components/user/FunctionCardsExecution";

export default function Device() {
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
      <FunctionCardExecution
        titulo={e.nombre}
        descripcion={e.descripcion}
        key={i}
        id={e._id}
      />
    );
  });

  return (
    <main className="min-h-screen min-w-full bg-gray-50 ">
      <Protect>
        <section className="flex flex-col items-start  gap-4 border-b-2 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-40">
          <div className="w-full ">
            <h2 className="my-0 text-xl font-semibold lg:text-3xl">
              {device?.nombre}
            </h2>
            <p className="text-sm text-neutral-500">{device?.description}</p>
          </div>
        </section>
        <div className="flex flex-col gap-4 px-4 pt-4 lg:px-40">
          <h3 className="text-xl  font-medium lg:text-2xl">
            Funciones Disponibles
          </h3>
          {functionscom}
        </div>
      </Protect>
    </main>
  );
}
