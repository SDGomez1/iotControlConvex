import type { FunctionData } from "types/deviceFunction";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

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
    <div className="  flex h-min flex-col gap-2 rounded border border-lightText/60 bg-white px-4 py-4 dark:border-darkText dark:bg-dark">
      <input
        placeholder="Nombre de la función"
        name={`nombreF${props.index}`}
        onChange={(e) => {
          setNombre(e.target.value);
        }}
        value={nombre}
        className=" block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1 text-center text-sm focus:border-black focus:ring-0 lg:text-left lg:text-base dark:border-darkText dark:focus:border-white"
      />
      <h3 className="text-center text-sm font-bold lg:text-left lg:text-xl">
        Información general
      </h3>
      <input
        placeholder="Descripcion"
        name={`descripcionF${props.index}`}
        onChange={(e) => {
          setDescripcion(e.target.value);
        }}
        className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1  py-1 text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
      />
      <h3 className="text-center text-sm font-bold lg:text-left lg:text-xl">
        Datos de entrada
      </h3>

      <input
        placeholder="Comando de ejecución"
        name={`comando${props.index}`}
        onChange={(e) => {
          setComando(e.target.value);
        }}
        className="block w-full  border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
      />
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-4">
        <h4 className="  px-1 text-xs  font-medium text-lightText lg:text-sm dark:text-darkText">
          ¿Deseas bloquear otras funciones al ejecutar esta función?
        </h4>
        <div className=" flex items-center justify-center gap-5">
          <button className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText">
            <span className="size-4 border border-lightText dark:border-darkText" />
            Si
          </button>
          <button className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText">
            <span className="size-4 border border-lightText dark:border-darkText" />
            No
          </button>
        </div>
      </div>
      <h3 className="text-center text-sm font-bold lg:text-left  lg:text-xl ">
        Datos del Usuario
      </h3>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-4">
        <h4 className="  px-1 text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
          ¿Deseas recibir información del usuario para ejecutar la función?{" "}
        </h4>
        <div className=" flex items-center justify-center gap-5">
          <button className="flex items-center justify-center  gap-1 text-xs text-lightText lg:text-sm dark:text-darkText">
            <span className="size-4 border border-lightText dark:border-darkText" />
            Si
          </button>
          <button className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText">
            <span className="size-4 border border-lightText dark:border-darkText" />
            No
          </button>
        </div>
      </div>
      <select
        name={`descripcionF${props.index}`}
        onChange={(e) => {
          setDescripcion(e.target.value);
        }}
        className="border-0 border-b border-lightText/60 p-0 px-1 text-xs text-lightText focus:border-black focus:ring-0 lg:text-sm 2xl:w-1/4 dark:border-darkText dark:bg-dark dark:text-darkText dark:focus:border-white"
      >
        <option value="" selected disabled hidden>
          Tipo de entrada
        </option>

        <option className="bg-transparent"> Numerica</option>
        <option> Texto</option>
      </select>
      <div className="flex items-center justify-center gap-4 2xl:w-1/4">
        <input
          placeholder="Unidad de de medida"
          name={`descripcionF${props.index}`}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
        />
        <input
          placeholder="Simbolo"
          name={`descripcionF${props.index}`}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          className="block w-full border-0 border-b  border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
        />
      </div>

      <select
        name={`descripcionF${props.index}`}
        onChange={(e) => {
          setDescripcion(e.target.value);
        }}
        className="border-0 border-b border-lightText/60 p-0 px-1 text-xs text-lightText focus:border-black focus:ring-0 lg:text-sm 2xl:w-1/4 dark:border-darkText dark:bg-dark dark:text-darkText dark:focus:border-white"
      >
        <option value="" selected disabled hidden>
          Formato
        </option>

        <option className="bg-transparent"> Intervalo</option>
        <option> Escala</option>
      </select>
      <div className="flex items-center justify-center gap-4 2xl:w-1/4">
        <input
          placeholder="Intervalo Maximo"
          name={`descripcionF${props.index}`}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
        />
        <input
          placeholder="Intervalo minimo"
          name={`descripcionF${props.index}`}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
        />
      </div>
      <h4 className="  px-1 text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
        ¿Deseas recibir información del usuario para ejecutar la función?
      </h4>
      <input
        placeholder="Mensaje"
        name={`comando${props.index}`}
        onChange={(e) => {
          setComando(e.target.value);
        }}
        className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
      />
      <h3 className="text-center text-sm font-bold lg:text-left  lg:text-xl ">
        Datos de Salida
      </h3>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-4">
        <h4 className="  px-1 text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
          ¿Necesitas tener control total de los datos del dispositivo durante la
          ejecución de la función?
        </h4>
        <div className=" flex items-center justify-center gap-5">
          <button className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText">
            <span className="size-4 border border-lightText dark:border-darkText" />
            Si
          </button>
          <button className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText">
            <span className="size-4 border border-lightText dark:border-darkText" />
            No
          </button>
        </div>
      </div>

      <div className="lg fixed bottom-0  left-0 mt-4 flex h-16 w-full items-center justify-center gap-8 border-t bg-white px-6 lg:absolute lg:justify-end dark:bg-dark">
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
  );
}
