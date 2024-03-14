"use client";

import style from "styles/dashboard/newDevice/newDevice.module.css";

import { Protect } from "@clerk/nextjs";
import Navbar from "components/dashboard/navbar";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "next/navigation";
import { formatUrl, generateUUID } from "lib/utils";
import { useState } from "react";
import FunctionCard from "components/admin/functionCard";
import { FunctionData } from "lib/types";

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
        <FunctionCard
          isEditing={true}
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
      (e) => !e.index.includes(currentIndex)
    );
    setCards(newArray);
    setCurrentIndex("");
    setFunctionData(newArrayData);

    setCount(count - 1);
    setPrevCount(count - 1);
  }

  return (
    <main className={style.container}>
      <Protect
        fallback={<>No tienes permiso para acceder a esta funcionalidad</>}
        permission="org:admin:usage"
      >
        <Navbar />
        <section className={style.mainSection}>
          <form
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
                });
              });
              const url = formatUrl(titulo, deviceId);

              router.push(`/devices/${url}`);

              form.reset();
            }}
            autoComplete="off"
          >
            <div className={style.titleContainer}>
              <input name="titulo" placeholder="Nombre" />
              <button type="submit"> Guardar</button>
            </div>

            <input
              name="descripcion"
              placeholder="Descripción"
              className={style.deviceDescription}
            ></input>

            <h2 className={style.funcionTitle}>Funciones del dispositivo</h2>
            {cards}

            {isCreating ? (
              <></>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCount(count + 1);
                  setCreating(true);
                }}
                className={style.addButton}
              >
                + Añadir nueva funcion
              </button>
            )}
          </form>
        </section>
      </Protect>
    </main>
  );
}
