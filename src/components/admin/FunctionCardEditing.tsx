import { FunctionData } from "lib/types";
import { Dispatch, SetStateAction, useState } from "react";

export default function functionCardEditing(props: {
  index: string;
  isCreating: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<FunctionData | undefined>>;
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comando, setComando] = useState("");
  const [savedState, setSavedState] = useState(false);

  function addData() {
    props.setData({
      index: props.index,
      nombre: nombre,
      descripcion: descripcion,
      comando: comando,
    });
  }

  return (
    <section className="mb-4 mt-4 px-4 lg:px-40">
      <div className=" flex flex-col gap-2 rounded bg-white px-2 py-4 drop-shadow-md">
        <input
          placeholder="Nombre de la funcion"
          name={`nombreF${props.index}`}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          value={nombre}
          className=" block w-full border-0 border-b  px-1 py-1 outline-none"
        />
        <h3 className="font-medium"> Informacion general</h3>
        <input
          placeholder="Descripcion"
          name={`descripcionF${props.index}`}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          className="block w-full border-0 border-b px-1 py-1 outline-none"
        />
        <h3 className="font-medium">Inputs</h3>
        <input
          placeholder="Comando de ejecucion"
          name={`comando${props.index}`}
          onChange={(e) => {
            setComando(e.target.value);
          }}
          className="block w-full border-0 border-b px-1 py-1 outline-none"
        />

        <div className="mt-4 flex items-center justify-center gap-8 lg:justify-start">
          {savedState ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setSavedState(false);
                  props.isCreating(true);
                }}
                className="flex h-8 w-28 items-center justify-center rounded bg-neutral-900 px-8 py-1 text-sm text-white hover:bg-neutral-800"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setCurrentIndex(props.index);
                  props.isCreating(false);
                }}
                className="flex h-8 w-28 items-center justify-center rounded border border-black px-8 py-1 text-sm hover:bg-neutral-50"
              >
                Borrar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  if (!nombre || !descripcion || !comando) {
                    alert("Llena todos los espacios");
                    return;
                  }
                  addData();
                  setSavedState(true);
                  props.isCreating(false);
                }}
                className="flex h-8 w-28 items-center justify-center rounded bg-neutral-900 px-8 py-1 text-sm text-white hover:bg-neutral-800"
              >
                Crear
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setCurrentIndex(props.index);
                  props.isCreating(false);
                }}
                className="flex h-8 w-28 items-center justify-center rounded border border-black px-8 py-1 text-sm hover:bg-neutral-50"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
