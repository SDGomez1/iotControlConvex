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
    <section className="px-4 lg:px-40">
      <div className="flex flex-col gap-2 rounded bg-white px-2 py-4">
        <input
          placeholder="Nombre de la funcion"
          name={`nombreF${props.index}`}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          value={nombre}
          className="block w-full border-b-2 px-1 py-1 outline-none"
        />
        <h3 className="font-medium"> Informacion general</h3>
        <input
          placeholder="Descripcion"
          name={`descripcionF${props.index}`}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          className="block w-full border-b-2 px-1 py-1 outline-none"
        />
        <h3 className="font-medium">Inputs</h3>
        <input
          placeholder="Comando de ejecucion"
          name={`comando${props.index}`}
          onChange={(e) => {
            setComando(e.target.value);
          }}
          className="block w-full border-b-2 px-1 py-1 outline-none"
        />

        <div className="flex gap-8">
          {savedState ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setSavedState(false);
                  props.isCreating(true);
                }}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setCurrentIndex(props.index);
                  props.isCreating(false);
                }}
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
              >
                Crear
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setCurrentIndex(props.index);
                  props.isCreating(false);
                }}
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
