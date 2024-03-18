"use client";

import FunctionCardEditing from "components/admin/FunctionCardEditing";

import { FunctionData } from "lib/types";
import { formatUrl, generateUUID } from "lib/utils";

import { Protect } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewDevice() {
  const router = useRouter();
  const createNewDevice = useMutation(api.device.createDevice);
  const createNewFunction = useMutation(api.deviceFunction.createFunction);

  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(-1);
  const [isCreating, setCreating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentData, setCurrentData] = useState<FunctionData>();
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [functionData, setFunctionData] = useState<FunctionData[]>([]);

  if (count > 0) {
    if (prevCount !== count) {
      const keygenerated = generateUUID();
      setPrevCount(count);
      setCards([
        ...cards,
        <FunctionCardEditing
          index={keygenerated}
          isCreating={setCreating}
          setCurrentIndex={setCurrentIndex}
          key={keygenerated}
          setData={setCurrentData}
        />,
      ]);
    }
  }
  if (currentData !== undefined) {
    setFunctionData([...functionData, currentData]);
    setCurrentData(undefined);
  }

  if (currentIndex !== "") {
    const newArray = cards.filter((e) => !e.props.index.includes(currentIndex));
    const newArrayData = functionData.filter(
      (e) => !e.index.includes(currentIndex),
    );
    setCards(newArray);
    setCurrentIndex("");
    setFunctionData(newArrayData);

    setCount(count - 1);
    setPrevCount(count - 1);
  }

  return (
    <main className="min-h-screen min-w-full bg-gray-50   ">
      <Protect
        fallback={<>No tienes permiso para acceder a esta funcionalidad</>}
        permission="org:admin:usage"
      >
        <form
          className=" flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.target as HTMLFormElement;

            const formdata = new FormData(e.currentTarget);
            const titulo = formdata.get("titulo") as string;
            const descripcion = formdata.get("descripcion") as string;

            if (
              !titulo ||
              !descripcion ||
              !(cards.length === functionData.length)
            ) {
              alert("Llena todos los espacios");

              return;
            }
            const deviceId = await createNewDevice({
              nombre: titulo,
              descripcion: descripcion,
            });

            functionData.map((data) => {
              createNewFunction({
                nombre: data.nombre,
                descripcion: data.descripcion,
                deviceId: deviceId,
                comando: data.comando,
              });
            });
            const url = formatUrl(titulo, deviceId);

            router.push(`devices/${url}`);

            form.reset();
          }}
          autoComplete="off"
        >
          <div className="ju flex flex-col gap-4 border-b-2 px-4 py-8 lg:flex-row lg:justify-between lg:px-40">
            <h1 className="my-0 text-xl font-semibold lg:text-3xl">
              Crea un nuevo dispositivo
            </h1>
            <button
              type="submit"
              className="w-1/4 rounded bg-neutral-950 py-2 text-sm text-white hover:bg-neutral-800 lg:w-1/12"
            >
              Guardar
            </button>
          </div>
          <div className="flex flex-col gap-4 px-4 pt-4 lg:px-40">
            <input
              name="titulo"
              placeholder="Nombre"
              className="border-b-2 bg-transparent px-1 py-1 text-xl outline-none focus:border-b-neutral-700"
            />

            <input
              name="descripcion"
              placeholder="Descripción"
              className="border-b-2 bg-transparent px-1 py-1 text-base outline-none focus:border-b-neutral-700   "
            ></input>
            <h2 className=" text-xl  font-medium lg:text-2xl">
              Funciones del dispositivo
            </h2>
          </div>

          {cards}

          {isCreating ? (
            <></>
          ) : (
            <div className="px-4 lg:px-40">
              <button
                type="button"
                onClick={() => {
                  setCount(count + 1);
                  setCreating(true);
                }}
                className="mt-4 w-full rounded border bg-white py-2 text-sm drop-shadow-sm hover:drop-shadow-md"
              >
                + Añadir nueva funcion
              </button>
            </div>
          )}
        </form>
      </Protect>
    </main>
  );
}
