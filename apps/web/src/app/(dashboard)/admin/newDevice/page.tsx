"use client";
import FunctionCardView from "components/dashboard/admin/newDevice/FunctionCardView";
import FunctionForm from "components/dashboard/admin/newDevice/FunctionForm";
import { Plus } from "components/icons/Plus";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatUrl } from "utils/urlUtils";

export default function NewDevice() {
  const router = useRouter();

  const createNewDevice = useMutation(api.device.createDevice);
  const createNewFunction = useMutation(api.deviceFunction.createFunction);

  const dispatch = useAppDispatch();

  const currentTeam = useAppSelector(
    (state) => state.databaseData.userActiveTeamInfo,
  );
  const [isCreating, setIsCreating] = useState(false);
  const currentFunctions = useAppSelector((state) => state.newDeviceFunctions);

  const currentFunctionsCards = currentFunctions.map((functionData) => {
    return <FunctionCardView name={functionData.name} key={functionData.id} />;
  });
  return (
    <section className=" flex max-h-screen flex-col px-5">
      <form
        className="  flex flex-col pt-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          const deviceName = formdata.get("deviceName") as string;
          const deviceDescription = formdata.get("deviceDescription") as string;
          const deviceId = await createNewDevice({
            name: deviceName,
            description: deviceDescription,
            teamId: currentTeam._id,
          });

          currentFunctions.forEach((functionData) => {
            createNewFunction({
              deviceId: deviceId,
              name: functionData.name,
              description: functionData.description,
              command: functionData.command as string,
              blocking: functionData.blocking,
              userInfo: functionData.userInfo,
              userTypeOfEntry: functionData.userTEntry,
              unit: functionData.unit,
              symbol: functionData.symbol,
              format: functionData.format,
              maxInterval: functionData.maxInterval,
              minInterval: functionData.minInterval,
              scaleData: functionData.scaleData,
              message: functionData.message,
              streaming: functionData.streaming,
            });
          });
          const url = formatUrl(deviceName, deviceId);

          router.replace(`/admin/devices/${url}`);
        }}
      >
        <input
          name="deviceName"
          placeholder="Nombre"
          className="my-0 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl"
          disabled={isCreating}
          autoComplete="off"
          required
        />

        <input
          name="deviceDescription"
          placeholder="Descripción"
          className={`border-0 bg-transparent px-0  text-sm outline-none focus:ring-0 lg:text-base focus:dark:border-white  ${isCreating ? "border-b-0" : "border-b"}`}
          disabled={isCreating}
          autoComplete="off"
          required
        />
        <h2 className=" mt-2  font-medium lg:text-2xl">
          Funciones del dispositivo
        </h2>
        <p className=" mb-4  py-2 text-sm font-medium text-lightText lg:text-base dark:text-darkText">
          Oprime el botón para crear una nueva función de tu dispositivo
        </p>
        <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
          <button
            className="rounded border border-danger bg-transparent px-8 py-2 text-sm text-danger"
            type="button"
            onClick={() => router.replace("/admin")}
          >
            Cancelar
          </button>
          <button className="rounded border border-accent bg-transparent px-8 py-2 text-sm text-accent dark:text-indigo-400">
            Crear Dispositivo
          </button>
        </div>
      </form>
      {isCreating ? (
        <div className="  h-min max-h-min overflow-y-scroll pb-32 lg:pb-40">
          <FunctionForm setIsEditing={setIsCreating} />
        </div>
      ) : (
        <div className="mb-4 flex flex-col gap-4">{currentFunctionsCards}</div>
      )}
      {isCreating ? (
        <></>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsCreating(true);
          }}
          className=" flex w-full items-center justify-center gap-2 rounded border border-lightText bg-white py-2  text-sm  text-lightText lg:text-base dark:border-darkText dark:bg-dark dark:text-darkText"
        >
          <Plus className="size-4" />
          Añadir nueva funcion
        </button>
      )}
    </section>
  );
}
