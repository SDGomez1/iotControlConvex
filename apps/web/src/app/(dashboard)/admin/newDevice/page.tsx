"use client";

import type { FunctionData } from "types/deviceFunction";
import { formatUrl } from "utils/urlUtils";
import { generateUUID } from "utils/uuidUtils";

import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FunctionCardEditing from "components/dashboard/admin/newDevice/FunctionCardEditing";
import { Plus } from "components/icons/Plus";

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
    <form
      className=" flex max-h-screen flex-col px-5 lg:px-0 "
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
        // const deviceId = await createNewDevice({
        //   name: titulo,
        //   description: descripcion,
        // });

        // functionData.map((data) => {
        //   createNewFunction({
        //     name: data.nombre,
        //     description: data.descripcion,
        //     deviceId: deviceId,
        //     comando: data.comando,
        //   });
        // });
        // const url = formatUrl(titulo, deviceId);

        // router.push(`devices/${url}`);

        // form.reset();
      }}
      autoComplete="off"
    >
      <div className="  flex flex-col pt-4">
        <input
          name="titulo"
          placeholder="Nombre"
          className="my-0 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl"
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          className="border-0 border-b bg-transparent px-0  text-sm outline-none focus:ring-0 lg:text-base focus:dark:border-white"
        />
        <h2 className=" mt-2  font-medium lg:text-2xl">
          Funciones del dispositivo
        </h2>
        <p className=" py-2  text-sm font-medium text-lightText lg:text-base dark:text-darkText">
          Oprime el botón para crear una nueva función de tu dispositivo
        </p>
      </div>

      {isCreating ? (
        <div className="  h-min max-h-min overflow-y-scroll pb-32 lg:pb-40">
          {cards}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setCount(count + 1);
            setCreating(true);
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-lightText bg-white  py-2  text-lightText dark:border-darkText dark:bg-dark dark:text-darkText"
        >
          <Plus className="size-4" />
          Añadir nueva funcion
        </button>
      )}
    </form>
  );
}
