import { InformationCircle } from "components/icons/InformationCircle";
import { api } from "convex/_generated/api";
import { Doc, Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { typeOfFormat, typeOfFunction } from "types/deviceFunctionClientData";
import { writeToPort } from "utils/serialUtils";

export default function ExecutionAlert(props: {
  setSendConfirmation: Dispatch<SetStateAction<boolean>>;
  functionData: Doc<"deviceFunction">;
  serialPort: SerialPort | undefined;
  isAdmin: boolean;
}) {
  const createCommand = useMutation(api.command.createCommand);
  const [value, setValue] = useState<number | string | undefined>(
    props.functionData.minInterval,
  ); // Initialize state with the default value
  const [payload, setPayload] = useState<number | string | undefined>(
    undefined,
  );
  let inputReactNode = <></>;

  useEffect(() => {
    if (props.functionData.format === typeOfFormat.interval) {
      setPayload(props.functionData.minInterval as number);
    }
    if (props.functionData.format === typeOfFormat.scale) {
      if (props.functionData.scaleData) {
        setPayload(props.functionData.scaleData[0]);
      }
    }
  }, []);
  if (props.functionData.format === typeOfFormat.interval) {
    const newReactNode = (
      <>
        <span className="relative">
          <input
            className="my-2 w-10/12 shrink-0 appearance-none border-0 border-b border-b-lightText bg-transparent px-1 py-1 text-sm ring-0 focus:ring-0 dark:border-b-darkText"
            type="number"
            value={value}
            onBlur={() => {
              const formatValue = value ? value : 0;
              const newValue = Math.max(
                props.functionData.minInterval as number,
                Math.min(
                  props.functionData.maxInterval as number,
                  Number(formatValue),
                ),
              );
              setValue(newValue);
              setPayload(newValue);
            }}
            onChange={(event) => {
              const inputValue = event.target.value;
              setValue(inputValue === "" ? undefined : Number(inputValue));
            }}
          />
          <p className="absolute -inset-y-1 right-0 flex items-center text-xs italic">{`${props.functionData.unit}(${props.functionData.symbol})`}</p>
        </span>
        <p className="mb-8 text-xs italic">{`escribe un valor entre ${props.functionData.minInterval} y ${props.functionData.maxInterval}`}</p>
      </>
    );
    inputReactNode = newReactNode;
  }
  if (props.functionData.format === typeOfFormat.scale) {
    const newReactNode = (
      <>
        <select
          onChange={(e) => {
            setPayload(Number(e.target.value));
          }}
          className="dark: my-2 w-full shrink-0 border-0 border-b border-b-lightText bg-transparent px-1 py-1 text-sm ring-0 focus:ring-0 dark:border-b-darkText"
        >
          {props.functionData.scaleData?.map((data, index) => {
            return (
              <option value={data} key={index}>
                {data}
              </option>
            );
          })}
        </select>
        <p className=" mb-8 text-xs italic">{`${props.functionData.unit}(${props.functionData.symbol})`}</p>
      </>
    );
    inputReactNode = newReactNode;
  }
  if (props.functionData.tEntry === typeOfFunction.free) {
    const newReactNode = (
      <>
        <span className="relative">
          <input
            className="my-2 w-10/12 shrink-0 appearance-none border-0 border-b border-b-lightText bg-transparent px-1 py-1 text-sm ring-0 focus:ring-0 dark:border-b-darkText"
            value={value}
            onBlur={() => {
              setValue(value);
              setPayload(value);
            }}
            onChange={(event) => {
              const inputValue = event.target.value;
              setValue(inputValue);
            }}
          />
        </span>
      </>
    );
    inputReactNode = newReactNode;
  }
  return (
    <span
      className={`fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/15 px-4 transition-all dark:bg-black/65`}
    >
      <div className="flex h-fit w-screen flex-col items-center  rounded-lg bg-white px-5 py-8 lg:w-500px dark:bg-dark">
        <InformationCircle className="mb-2 size-8 stroke-accent dark:stroke-white" />
        <p className="mb-4 text-sm font-bold">
          Esta función requiere información adicional
        </p>
        <p className=" w-full text-left text-sm">
          {props.functionData.tEntry === typeOfFunction.free
            ? "Escribe lo que quieras mandar al microcontrolador"
            : `${props.functionData.message}: `}
        </p>
        <form
          className="flex h-full w-full flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            if (props.isAdmin) {
              writeToPort(
                props.serialPort,
                `${props.functionData.command}${payload}`,
              );
              props.setSendConfirmation(false);
            } else {
              createCommand({
                deviceId: props.functionData.deviceId,
                deviceFunctionId: props.functionData
                  ._id as Id<"deviceFunction">,
                payload: payload?.toString(),
              });
              props.setSendConfirmation(false);
            }
          }}
        >
          {inputReactNode}
          <div className="flex h-full items-end justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                props.setSendConfirmation(false);
              }}
              className="h-10 rounded-sm border border-danger p-2 text-sm text-danger  "
            >
              Cancelar
            </button>
            <button
              onClick={() => {}}
              className="h-10 rounded bg-accent p-2 text-sm text-white "
            >
              Ejecutar
            </button>
          </div>
        </form>
      </div>
    </span>
  );
}
