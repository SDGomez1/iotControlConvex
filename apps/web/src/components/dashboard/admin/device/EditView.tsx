import { Doc, Id } from "convex/_generated/dataModel";
import { type Dispatch, type SetStateAction, useState } from "react";

import FunctionCardEditing from "../newDevice/FunctionCardEditing";
import FunctionCardView from "../newDevice/FunctionCardView";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "next/navigation";
import FunctionForm from "../newDevice/FunctionForm";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { cleanDeviceFunctionClientData } from "lib/features/deviceFunctionClientData/deviceFunctionClientDataSlice";
import { PlusIcon } from "@radix-ui/react-icons";
import DeviceFormManager from "../deviceFunctionForm/DeviceFormManager";
import {
  deviceFunctionFormType,
  formSchemaType,
} from "types/deviceFunctionClientData";

import { typeOfEntry, typeOfFormat } from "types/deviceFunctionClientData";
import { initialState } from "@clerk/nextjs/dist/types/app-router/server/auth";
import { generateUUID } from "utils/uuidUtils";
export default function EditView(props: {
  deviceId: string;
  name: string;
  description: string;
  deviceFunctions: Doc<"deviceFunction">[] | undefined;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const deviceFunctions = createDeviceFunctionData(props.deviceFunctions);
  console.log(deviceFunctions);

  const [isCreating, setIsCreating] = useState(false);

  const dispatch = useAppDispatch();
  const deleteDevice = useMutation(api.device.deleteDevice);
  const updateDevice = useMutation(api.device.updateDevice);
  const addDeviceFunction = useMutation(api.deviceFunction.createFunction);
  const updateDeviceFunction = useMutation(
    api.deviceFunction.updateDeviceFunction,
  );
  const localFunctions = useAppSelector(
    (state) => state.deviceFunctionClientData,
  );

  // if (localFunctions.length > 0) {
  //   localFunctions.forEach((functionData) => {
  //     addDeviceFunction({
  //       deviceId: props.deviceId as Id<"device">,
  //       name: functionData.name,
  //       description: functionData.description,
  //       command: functionData.command as string,
  //       blocking: functionData.blocking,
  //       userInfo: functionData.userInfo,
  //       userTypeOfEntry: functionData.userTEntry,
  //       unit: functionData.unit,
  //       symbol: functionData.symbol,
  //       format: functionData.format,
  //       maxInterval: functionData.maxInterval,
  //       minInterval: functionData.minInterval,
  //       scaleData: functionData.scaleData,
  //       message: functionData.message,
  //       sendData: functionData.sendData,
  //       streaming: functionData.streaming,
  //     });
  //   });
  //   dispatch(cleanDeviceFunctionClientData());
  // }

  // const currentFunctionsCards = props.deviceFunctions?.map((functionData) => {
  //   return (
  //     <FunctionCardView
  //       name={functionData.name}
  //       key={functionData._id}
  //       functionId={functionData._id}
  //       setIsEditing={setIsEditing}
  //       setFunctionId={setFunctionId}
  //     />
  //   );
  // });

  function submitHandler(data: formSchemaType) {
    updateDevice({
      name: data.deviceName,
      description: data.deviceDescription,
      deviceId: props.deviceId as Id<"device">,
    });
    props.setIsEditing(false);
  }

  function functionSubmitHandler(data: deviceFunctionFormType) {
    if (data.id === "") {
      data.id = generateUUID();
      addDeviceFunction({
        deviceId: props.deviceId as Id<"device">,
        name: data.name,
        description: data.description,
        command: data.command as string,
        blocking: false,
        userInfo: data.userInfo,
        userTypeOfEntry: data.userTypeOfEntry,
        unit: data.unit,
        symbol: "",
        format: data.format,
        maxInterval: data.maxInterval,
        minInterval: data.minInterval,
        scaleData: data.scaleData,
        message: data.message,
        sendData: data.sendData,
        streaming: false,
      });
    } else {
      updateDeviceFunction({
        functionId: data.id as Id<"deviceFunction">,
        name: data.name,
        description: data.description,
        command: data.command as string,
        blocking: false,
        userInfo: data.userInfo,
        userTypeOfEntry: data.userTypeOfEntry,
        unit: data.unit,
        symbol: "",
        format: data.format,
        maxInterval: data.maxInterval,
        minInterval: data.minInterval,
        scaleData: data.scaleData,
        message: data.message,
        sendData: data.sendData,
        streaming: false,
      });
      props.setIsEditing(false);
    }
    setIsCreating(false);
  }

  function functionDeleteHandler(id: string) {
    //dispatch(deleteDeviceFunctionClientData(id));
    setIsCreating(false);
  }

  function deviceCancelHandler() {
    router.replace("/admin");
    dispatch(cleanDeviceFunctionClientData());
  }

  const deviceInitialState: formSchemaType = {
    deviceName: props.name,
    deviceDescription: props.description,
  };
  return (
    <>
      <DeviceFormManager
        submitHandler={submitHandler}
        functionData={[]}
        functionSubmitHandler={functionSubmitHandler}
        setIsCreating={setIsCreating}
        isCreating={isCreating}
        functionDeleteHandler={functionDeleteHandler}
        cancelHandler={deviceCancelHandler}
        deviceInitialState={deviceInitialState}
      />
      {/* <form
        className="  flex w-full flex-col pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          updateDevice({
            name: name,
            description: description,
            deviceId: props.deviceId as Id<"device">,
          });
          props.setIsEditing(false);
        }}
      >
        <input
          name="deviceName"
          placeholder={name === "" ? "Nombre del dispositivo" : name}
          className="my-0 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl"
          disabled={isCreating}
          autoComplete="off"
          required={name === "" ? true : false}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          name="deviceDescription"
          placeholder={
            description === "" ? "Nombre del dispositivo" : description
          }
          className={`border-0 bg-transparent px-0  text-sm outline-none focus:ring-0 lg:text-base focus:dark:border-white  ${isCreating ? "border-b-0" : "border-b"}`}
          disabled={isCreating}
          autoComplete="off"
          required={description === "" ? true : false}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h2 className=" mt-2  font-medium lg:text-2xl">
          Funciones del dispositivo
        </h2>
        <p className=" mb-4  py-2 text-sm font-medium text-lightText lg:text-base dark:text-darkText">
          Edita o crea las funciones de tu dispositivo
        </p>
        <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-center gap-8 border-t border-t-lightText/60 bg-white drop-shadow lg:absolute lg:justify-end lg:px-12 dark:border-t-darkText dark:bg-dark">
          <button
            className="rounded  border border-errorText px-4 py-2 text-sm text-errorText lg:px-8"
            type="button"
            onClick={() => {
              router.push("/admin");
              deleteDevice({ deviceId: props.deviceId as Id<"device"> });
            }}
          >
            Borrar
          </button>
          <button
            className="rounded border border-danger bg-transparent px-4 py-2 text-sm text-danger lg:px-8"
            type="button"
            onClick={() => {
              props.setIsEditing(false);
            }}
          >
            Cancelar
          </button>
          <button className="rounded border border-accent bg-transparent px-4 py-2 text-sm text-accent lg:px-8 dark:text-indigo-400">
            Guardar
          </button>
        </div>
      </form>
      {!isEditing ? (
        <>
          {isCreating ? (
            <div className="  h-min max-h-min w-full overflow-y-scroll pb-32 lg:pb-40">
              <FunctionForm setIsEditing={setIsCreating} />
            </div>
          ) : (
            <div className=" mb-4 flex w-full flex-col gap-4">
              {currentFunctionsCards}
            </div>
          )}
          {isCreating ? (
            <></>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsCreating(true);
              }}
              className=" flex w-full items-center justify-center gap-2 rounded border border-lightText bg-white py-2  text-sm  text-lightText lg:text-base dark:border-darkText dark:bg-dark dark:text-darkText"
            >
              <PlusIcon className="size-4" />
              Añadir nueva funcion
            </button>
          )}
        </>
      ) : (
        <>
          <FunctionCardEditing
            isCreating={false}
            setIsEditing={setIsEditing}
            initialData={
              createDeviceFunctionData(
                props.deviceFunctions,
                functionId,
              ) as deviceFunctionClientData
            }
          />
        </>
      )} */}
    </>
  );
}

function createDeviceFunctionData(data: Doc<"deviceFunction">[] | undefined) {
  const functionsData = data?.map((functionData) => {
    if (
      !functionData.userTypeOfEntry ||
      !functionData.format ||
      !functionData.maxInterval ||
      !functionData.minInterval ||
      !functionData.scaleData ||
      !functionData.unit
    ) {
      console.log("enter");
      return;
    }
    const initialState: deviceFunctionFormType = {
      id: functionData._id,
      name: functionData.name,
      description: functionData.description,
      typeOfFunction: "FREE",
      command: functionData.command,
      userInfo: functionData.userInfo,
      userTypeOfEntry: functionData.userTypeOfEntry as typeOfEntry,
      unit: functionData.unit,
      format: functionData.format as typeOfFormat,
      maxInterval: functionData.maxInterval,
      minInterval: functionData.minInterval,
      scaleData: functionData.scaleData,
      message: functionData.message,
      sendData: functionData.sendData,
    };

    return initialState;
  });
  if (functionsData) {
    const definedFunctions: deviceFunctionFormType[] = functionsData?.filter(
      (functionData): functionData is deviceFunctionFormType =>
        functionData !== undefined,
    );

    return definedFunctions;
  }
  return [];
}
