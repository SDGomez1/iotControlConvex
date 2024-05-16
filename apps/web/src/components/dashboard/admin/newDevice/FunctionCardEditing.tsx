"use client";
import { Plus } from "components/icons/Plus";
import { XMark } from "components/icons/XMark";
import { api } from "convex/_generated/api";
import { Doc, Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import {
  deleteDeviceFunctionClientData,
  updateDeviceFunctionClientData,
} from "lib/features/deviceFunctionClientData/deviceFunctionClientDataSlice";
import { useAppDispatch } from "lib/hooks";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  typeOfEntry,
  typeOfFormat,
  type deviceFunctionClientData,
} from "types/deviceFunctionClientData";
import { generateUUID } from "utils/uuidUtils";
export default function FunctionCardEditing(props: {
  initialData: deviceFunctionClientData;
  isCreating: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const initialState: deviceFunctionClientData = {
    id: props.initialData.id,
    name: props.initialData.name,
    description: props.initialData.description,
    tEntry: props.initialData.tEntry,
    command: props.initialData.command,
    blocking: props.initialData.blocking,
    userInfo: props.initialData.userInfo,
    userTEntry: props.initialData.userTEntry,
    unit: props.initialData.unit,
    symbol: props.initialData.symbol,
    format: props.initialData.format,
    maxInterval: props.initialData.maxInterval,
    minInterval: props.initialData.minInterval,
    scaleData: props.initialData.scaleData,
    message: props.initialData.message,
    sendData: props.initialData.sendData,
    streaming: props.initialData.streaming,
  };

  const [data, setData] = useState<deviceFunctionClientData>(initialState);
  const dispatch = useAppDispatch();
  const updateDeviceFunction = useMutation(
    api.deviceFunction.updateDeviceFunction,
  );
  const deleteDeviceFunction = useMutation(
    api.deviceFunction.deleteDeviceFunction,
  );

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
      className="flex  w-full flex-col gap-2 rounded border border-lightText/60 bg-white px-4 py-4 dark:border-darkText dark:bg-dark"
      onSubmit={(e) => {
        e.preventDefault();
        if (props.isCreating) {
          dispatch(updateDeviceFunctionClientData(data));
          props.setIsEditing(false);
        } else {
          updateDeviceFunction({
            functionId: data.id as Id<"deviceFunction">,
            name: data.name,
            description: data.description,
            command: data.command as string,
            blocking: data.blocking,
            userInfo: data.userInfo,
            userTypeOfEntry: data.userTEntry,
            unit: data.unit,
            symbol: data.symbol,
            format: data.format,
            maxInterval: data.maxInterval,
            minInterval: data.minInterval,
            scaleData: data.scaleData,
            message: data.message,
            sendData: data.sendData,
            streaming: data.streaming,
          });
          props.setIsEditing(false);
        }
      }}
    >
      <input
        required={data.name === "" ? true : false}
        value={data.name}
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
        required={data.name === "" ? true : false}
        value={data.description}
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
        required={data.name === "" ? true : false}
        value={data.command}
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
            value={data.userTEntry}
            name={`tEntry`}
            onChange={(e) => {
              setData({
                ...data,
                userTEntry: e.target.value as typeOfEntry,
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
              value={data.unit}
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
              value={data.symbol}
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
              {/* ------------ Intervalo minimo -------------- */}
              <input
                required
                value={data.minInterval}
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
              {/* ------------Intervalo Maximo-------------- */}
              <input
                required
                value={data.maxInterval}
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
            value={data.message}
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
      <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start lg:gap-4">
        <div className="mb-4 flex flex-col items-center justify-center lg:flex-row lg:gap-4">
          <h4 className="mb-2 px-1 text-xs font-medium text-lightText lg:m-0 lg:text-sm dark:text-darkText">
            ¿Esta funcion envia datos al usuario?
          </h4>
          {/* ------------ user data -------------- */}
          <div className=" flex items-center justify-center gap-5">
            <button
              type="button"
              className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
              onClick={() => {
                setData({
                  ...data,
                  sendData: true,
                });
              }}
            >
              <span
                className={`size-4 border border-lightText dark:border-darkText ${data.sendData ? "bg-lightText dark:bg-darkText" : ""}`}
              />
              Si
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-1 text-xs text-lightText lg:text-sm dark:text-darkText"
              onClick={() => {
                setData({
                  ...data,
                  sendData: false,
                });
              }}
            >
              <span
                className={`size-4 border border-lightText dark:border-darkText ${data.sendData ? "" : "bg-lightText dark:bg-darkText"}`}
              />
              No
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-4 ">
          <h4 className="mb-2 px-1 text-xs font-medium text-lightText lg:m-0 lg:text-sm dark:text-darkText">
            ¿Deseas enviar los datos en tiempo real?
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
      </div>
      {/* ------------ Global Buttons -------------- */}
      <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
        <button
          className="rounded  border border-errorText px-4 py-2 text-sm text-errorText lg:px-8"
          type="button"
          onClick={() => {
            if (props.isCreating) {
              dispatch(deleteDeviceFunctionClientData(data.id));
              props.setIsEditing(false);
            } else {
              deleteDeviceFunction({
                deviceFunction: data.id as Id<"deviceFunction">,
              });
              props.setIsEditing(false);
            }
          }}
        >
          Eliminar
        </button>

        <button
          className="rounded border border-danger bg-transparent px-4 py-2 text-sm text-danger lg:px-8"
          type="button"
          onClick={() => props.setIsEditing(false)}
        >
          Cancelar
        </button>
        <button className="rounded border border-accent bg-transparent px-4 py-2 text-sm text-accent lg:px-8 dark:text-indigo-400">
          Guardar
        </button>
      </div>
    </form>
  );
}
