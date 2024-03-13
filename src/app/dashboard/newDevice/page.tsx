"use client";

import style from "styles/dashboard/newDevice/newDevice.module.css";

import { Protect } from "@clerk/nextjs";
import Navbar from "components/dashboard/navbar";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "next/navigation";
import { formatUrl } from "lib/utils";
import { useEffect, useState } from "react";
import FunctionCard from "components/admin/functionCard";

interface FunctionFormData {
  nombre: string;
  descripcion: string;
  comando: string;
}

export default function NewDevice() {
  const router = useRouter();
  const createNewDevice = useMutation(api.device.createDevice);
  const createNewFunction = useMutation(api.deviceFunction.createFunction);

  const [count, setCount] = useState(0);
  const [isCreating, setCreating] = useState(false);
  const [functionCards, setFunctionCards] = useState<JSX.Element[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const nextFunctionCards = functionCards;
  let ActualFunctionCard: JSX.Element[] = functionCards;
  useEffect(() => {
    console.log(currentIndex);
    console.log(nextFunctionCards);
    nextFunctionCards.splice(currentIndex, 1);
    console.log(nextFunctionCards);
    setFunctionCards(nextFunctionCards);
  }, [currentIndex]);

  useEffect(() => {
    ActualFunctionCard = functionCards.map((card, index) => {
      return <div key={index}>{card}</div>;
    }); // TODO fix cardRendering
  }, [functionCards]);

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

              const deviceId = await createNewDevice({
                nombre: titulo,
                descripcion: descripcion,
              });

              const functionsarray: () => FunctionFormData[] = () => {
                const data: FunctionFormData[] = [];

                for (let index = 0; index < count; index++) {
                  data.push({
                    nombre: formdata.get(`nombreF${index}`) as string,
                    descripcion: formdata.get(`descripcionF${index}`) as string,
                    comando: formdata.get(`comando${index}`) as string,
                  });
                }

                return data;
              };

              functionsarray().map((e) => {
                createNewFunction({
                  nombre: e.nombre,
                  descripcion: e.descripcion,
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
            {ActualFunctionCard}
            {isCreating ? (
              <></>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCount(count + 1);
                  setCreating(true);

                  nextFunctionCards.push(
                    <FunctionCard
                      isEditing={true}
                      index={count}
                      isCreating={setCreating}
                      setCurrentIndex={setCurrentIndex}
                    />
                  );
                  setFunctionCards(nextFunctionCards);
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
