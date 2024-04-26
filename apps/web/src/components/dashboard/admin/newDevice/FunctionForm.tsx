"use client";

import { Plus } from "components/icons/Plus";
import { XMark } from "components/icons/XMark";

import { add } from "lib/features/newDeviceFunctions/newDeviceFunctionsSlice";
import { useAppDispatch } from "lib/hooks";

import { generateUUID } from "utils/uuidUtils";

import { useState, type Dispatch, type SetStateAction } from "react";

import {
  type newDeviceFunctionData,
  typeOfEntry,
  typeOfFormat,
} from "types/newDeviceFunctions";

const initialState: newDeviceFunctionData = {
  id: generateUUID(),
  name: "",
  description: "",
  tEntry: typeOfEntry.string,
  command: "",
  blocking: false,
  userInfo: false,
  userTEntry: undefined,
  unit: undefined,
  symbol: undefined,
  format: typeOfFormat.interval,
  maxInterval: undefined,
  minInterval: undefined,
  scaleData: undefined,
  message: undefined,
  streaming: false,
};

export default function FunctionForm(props: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const [data, setData] = useState<newDeviceFunctionData>(initialState);
  const dispatch = useAppDispatch();

  console.log(data.scaleData);
  const scaleData = data.scaleData?.map((value, key) => {
    return (
      <div
        className="flex w-1/2 items-center justify-center gap-1"
        key={generateUUID()}
      >
        <input
          type="number"
          placeholder={value.toString()}
          onBlur={(e) => {
            let entry = Number(e.target.value);
            let newData = data.scaleData;
            if (!newData) {
              return;
            }
            newData[key] = entry;
            setData({
              ...data,
              scaleData: newData,
            });
          }}
          className="mb-2 block w-4/5 border-0 border-b border-lightText/60 bg-transparent px-1  py-1 text-xs focus:border-black focus:ring-0  lg:text-sm dark:border-darkText dark:focus:border-white"
        />
        <span
          onClick={() => {
            let newData = data.scaleData;
            if (newData !== undefined) {
              newData.splice(key, 1);
              setData({
                ...data,
                scaleData: newData,
              });
            }
          }}
        >
          <XMark className="size-4 stroke-lightText dark:stroke-darkText" />
        </span>
      </div>
    );
  });

  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-2 rounded border border-lightText/60 bg-white px-4 py-4 dark:border-darkText dark:bg-dark"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(add(data));
        props.setIsEditing(false);
      }}
    >
      {/* ------------ Nombre de la funcion -------------- */}
      <input
        required
        placeholder="Nombre de la función"
        name="name"
        onChange={(e) => {
          setData({
            ...data,
            name: e.target.value,
          });
        }}
        className=" block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1 text-center text-sm focus:border-black focus:ring-0 lg:text-left lg:text-base dark:border-darkText dark:focus:border-white"
      />
      <h3 className="text-center text-sm font-bold lg:text-left lg:text-xl">
        Información general
      </h3>
      {/* ------------ Descripcion  -------------- */}
      <input
        required
        placeholder="Descripción"
        name="description"
        onChange={(e) => {
          setData({
            ...data,
            description: e.target.value,
          });
        }}
        className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1  py-1 text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
      />
      <h3 className="text-center text-sm font-bold lg:text-left lg:text-xl">
        Datos de entrada
      </h3>
      {/* ------------ Comando -------------- */}
      <input
        required
        placeholder="Comando de ejecución"
        name="command"
        onChange={(e) => {
          setData({
            ...data,
            command: e.target.value,
          });
        }}
        className="mb-2 block w-full  border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
      />
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-4">
        <h4 className=" mb-2 px-1 text-xs  font-medium text-lightText lg:text-sm dark:text-darkText">
          ¿Deseas bloquear otras funciones al ejecutar esta función?
        </h4>
        {/* ------------ blocking -------------- */}
        <div className=" mb-2 flex items-center justify-center gap-5">
          <button
            className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
            onClick={() => {
              setData({
                ...data,
                blocking: true,
              });
            }}
            type="button"
          >
            <span
              className={`size-4 border border-lightText dark:border-darkText ${data.blocking ? "bg-lightText dark:bg-darkText" : ""}`}
            />
            Si
          </button>
          <button
            className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
            type="button"
            onClick={() => {
              setData({
                ...data,
                blocking: false,
              });
            }}
          >
            <span
              className={`size-4 border border-lightText dark:border-darkText ${data.blocking ? "" : "bg-lightText dark:bg-darkText"}`}
            />
            No
          </button>
        </div>
      </div>
      <h3 className="text-center text-sm font-bold lg:text-left  lg:text-xl ">
        Datos del Usuario
      </h3>
      <div className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:justify-start lg:gap-4">
        <h4 className="  mb-2 px-1 text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
          ¿Deseas recibir información del usuario para ejecutar la función?
        </h4>
        {/* ------------ User Info -------------- */}
        <div className=" flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => {
              setData({
                ...data,
                userInfo: true,
              });
            }}
            className="flex items-center justify-center  gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
          >
            <span
              className={`size-4 border border-lightText dark:border-darkText ${data.userInfo ? "bg-lightText dark:bg-darkText" : ""}`}
            />
            Si
          </button>
          <button
            type="button"
            onClick={() => {
              setData({
                ...data,
                userInfo: false,
              });
            }}
            className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
          >
            <span
              className={`size-4 border border-lightText dark:border-darkText ${data.userInfo ? "" : "bg-lightText dark:bg-darkText"}`}
            />
            No
          </button>
        </div>
      </div>
      {data.userInfo ? (
        <div className="flex flex-col gap-4">
          {/* ------------ Tipo de entrada -------------- */}
          <select
            required
            name={`tEntry`}
            onChange={(e) => {
              setData({
                ...data,
                tEntry: e.target.value as typeOfEntry,
              });
            }}
            className="border-0 border-b border-lightText/60 p-0 px-1 py-2 text-xs text-lightText focus:border-black focus:ring-0 lg:text-sm 2xl:w-1/4 dark:border-darkText dark:bg-dark dark:text-darkText dark:focus:border-white"
          >
            <option value="" selected disabled hidden>
              Tipo de entrada
            </option>

            <option className="bg-transparent" value={typeOfEntry.number}>
              Numerica
            </option>
            <option value={typeOfEntry.string}> Texto</option>
          </select>
          <div className="flex items-center justify-center gap-4 2xl:w-1/4">
            {/* ------------ Unidad -------------- */}
            <input
              required
              placeholder="Unidad de de medida"
              name={"unit"}
              onChange={(e) => {
                setData({
                  ...data,
                  unit: e.target.value,
                });
              }}
              className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
            />
            {/* ------------ Simbolo -------------- */}
            <input
              required
              placeholder="Simbolo"
              name={`symbol`}
              onChange={(e) => {
                setData({
                  ...data,
                  symbol: e.target.value,
                });
              }}
              className="block w-full border-0 border-b  border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
            />
          </div>
          {/* ------------ Formato -------------- */}
          <select
            value={data.format}
            name={`format`}
            onChange={(e) => {
              setData({
                ...data,
                format: e.target.value as typeOfFormat,
              });
            }}
            className="border-0 border-b border-lightText/60 p-0 px-1 py-2 text-xs text-lightText focus:border-black focus:ring-0 lg:text-sm 2xl:w-1/4 dark:border-darkText dark:bg-dark dark:text-darkText dark:focus:border-white"
          >
            <option value="" selected disabled hidden>
              Formato
            </option>

            <option className="bg-transparent" value={typeOfFormat.interval}>
              Intervalo
            </option>
            <option value={typeOfFormat.scale}> Escala</option>
          </select>
          {data.format === typeOfFormat.interval ? (
            <div className="flex items-center justify-center gap-4 2xl:w-1/4">
              {/* ------------Intervalo Maximo-------------- */}
              <input
                required
                placeholder="Intervalo Maximo"
                name={`maxInterval`}
                type="number"
                onChange={(e) => {
                  setData({
                    ...data,
                    maxInterval: Number(e.target.value),
                  });
                }}
                className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
              />

              {/* ------------ Intervalo minimo -------------- */}
              <input
                required
                placeholder="Intervalo minimo"
                name={`minInterval`}
                type="number"
                onChange={(e) => {
                  setData({
                    ...data,
                    minInterval: Number(e.target.value),
                  });
                }}
                className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
              />
            </div>
          ) : (
            <div className="flex flex-wrap  items-center justify-between 2xl:w-1/4">
              {/* ------------ escala -------------- */}
              {scaleData}
              <button
                type="button"
                className="2xl:text- mt-2 flex w-1/2 items-center justify-center gap-2 rounded border border-lightText/60 py-2 text-xs text-lightText dark:border-darkText dark:text-darkText"
                onClick={() => {
                  let newData: number[] = [];
                  if (data.scaleData !== undefined) {
                    newData = data.scaleData;
                  }
                  newData.push(0);
                  setData({
                    ...data,
                    scaleData: newData,
                  });
                }}
              >
                <Plus className="dark:stroke-darkTe size-3  stroke-lightText" />
                Añadir
              </button>
            </div>
          )}

          <h4 className="  px-1 text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
            Redacta un mensaje para el usuario
          </h4>
          {/* ------------ Mensaje -------------- */}
          <input
            required
            placeholder="Mensaje"
            name={`message`}
            onChange={(e) => {
              setData({
                ...data,
                message: e.target.value,
              });
            }}
            className="block w-full border-0 border-b border-lightText/60 bg-transparent px-1 py-1  text-xs focus:border-black focus:ring-0 lg:text-sm  dark:border-darkText dark:focus:border-white"
          />
        </div>
      ) : (
        <></>
      )}
      <h3 className="text-center text-sm font-bold lg:text-left  lg:text-xl ">
        Datos de Salida
      </h3>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-4">
        <h4 className="  px-1 text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
          ¿Necesitas tener control total de los datos del dispositivo durante la
          ejecución de la función?
        </h4>
        {/* ------------ Streaming -------------- */}
        <div className=" flex items-center justify-center gap-5">
          <button
            type="button"
            className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
            onClick={() => {
              setData({
                ...data,
                streaming: true,
              });
            }}
          >
            <span
              className={`size-4 border border-lightText dark:border-darkText ${data.streaming ? "bg-lightText dark:bg-darkText" : ""}`}
            />
            Si
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
            onClick={() => {
              setData({
                ...data,
                streaming: false,
              });
            }}
          >
            <span
              className={`size-4 border border-lightText dark:border-darkText ${data.streaming ? "" : "bg-lightText dark:bg-darkText"}`}
            />
            No
          </button>
        </div>
      </div>
      {/* ------------ Global Buttons -------------- */}
      <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
        <button
          className="rounded border border-danger bg-transparent px-8 py-2 text-sm text-danger"
          type="button"
          onClick={() => props.setIsEditing(false)}
        >
          Cancelar
        </button>
        <button className="rounded border border-accent bg-transparent px-8 py-2 text-sm text-accent dark:text-indigo-400">
          Guardar Funcion
        </button>
      </div>
    </form>
  );
}
