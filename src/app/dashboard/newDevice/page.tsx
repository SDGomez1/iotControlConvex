"use client";

import style from "styles/dashboard/newDevice/newDevice.module.css";

import { Protect } from "@clerk/nextjs";
import Navbar from "components/dashboard/navbar";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "next/navigation";
import { formatUrl } from "lib/utils";

export default function NewDevice() {
  const router = useRouter();
  const createNewDevice = useMutation(api.device.createDevice);
  return (
    <Protect
      fallback={<>No tienes permiso para acceder a esta funcionalidad</>}
      permission="org:admin:usage"
    >
      <Navbar />
      <section className={style.mainSection}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData(e.currentTarget);
            const titulo = formdata.get("titulo") as string;
            const descripcion = formdata.get("descripcion") as string;
            const deviceId = await createNewDevice({
              nombre: titulo,
              descripcion: descripcion,
            });
            const url = formatUrl(titulo, deviceId);
            router.push(`/devices/${url}`);
            const form = e.target as HTMLFormElement;
            form.reset();
          }}
          autoComplete="off"
        >
          <div>
            <label>Titulo:</label>
            <input name="titulo" /> <button> Guardar</button>
          </div>
          <label>Descripcion</label>
          <input name="descripcion"></input>
        </form>
        <h2>Funciones disponibles</h2>
      </section>
    </Protect>
  );
}
