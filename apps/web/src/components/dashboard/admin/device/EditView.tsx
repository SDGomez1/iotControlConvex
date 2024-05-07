import { Doc, Id } from "convex/_generated/dataModel";
import { type Dispatch, type SetStateAction, useState } from "react";
import type {
  newDeviceFunctionData,
  typeOfEntry,
  typeOfFormat,
} from "types/newDeviceFunctions";
import FunctionCardEditing from "../newDevice/FunctionCardEditing";
import { Plus } from "components/icons/Plus";
import FunctionCardView from "../newDevice/FunctionCardView";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "next/navigation";

export default function EditView(props: {
  deviceId: string;
  name: string;
  description: string;
  deviceFunctions: Doc<"deviceFunction">[] | undefined;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [isEditing, setIsEditing] = useState(false);
  const [functionId, setFunctionId] = useState("");

  const deleteDevice = useMutation(api.device.deleteDevice);
  const updateDevice = useMutation(api.device.updateDevice);
  const currentFunctionsCards = props.deviceFunctions?.map((functionData) => {
    return (
      <FunctionCardView
        name={functionData.name}
        key={functionData._id}
        functionId={functionData._id}
        setIsEditing={setIsEditing}
        setFunctionId={setFunctionId}
      />
    );
  });

  return (
    <>
      <form
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
            className="rounded  border border-errorText px-8 py-2 text-sm text-errorText"
            type="button"
            onClick={() => {
              router.push("/admin");
              deleteDevice({ deviceId: props.deviceId as Id<"device"> });
            }}
          >
            borrar dispositivo
          </button>
          <button
            className="rounded border border-danger bg-transparent px-8 py-2 text-sm text-danger"
            type="button"
            onClick={() => {
              props.setIsEditing(false);
            }}
          >
            Cancelar
          </button>
          <button className="rounded border border-accent bg-transparent px-8 py-2 text-sm text-accent dark:text-indigo-400">
            Guardar
          </button>
        </div>
      </form>
      {!isEditing ? (
        <>
          <div className="mb-4 flex w-full flex-col gap-4">
            {currentFunctionsCards}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsCreating(true);
            }}
            className=" flex w-full items-center justify-center gap-2 rounded border border-lightText bg-white py-2  text-sm  text-lightText lg:text-base dark:border-darkText dark:bg-dark dark:text-darkText"
          >
            <Plus className="size-4" />
            Añadir nueva funcion
          </button>
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
              ) as newDeviceFunctionData
            }
          />
        </>
      )}
    </>
  );
}

function createDeviceFunctionData(
  data: Doc<"deviceFunction">[] | undefined,
  functionId: string,
) {
  const functionData = data?.find((data) => data._id === functionId);
  if (!functionData) {
    return;
  }
  const initialState: newDeviceFunctionData = {
    id: functionData._id,
    name: functionData.name,
    description: functionData.description,
    tEntry: "" as typeOfEntry,
    command: functionData.command,
    blocking: functionData.blocking,
    userInfo: functionData.userInfo,
    userTEntry: functionData.userTypeOfEntry as typeOfEntry,
    unit: functionData.unit,
    symbol: functionData.symbol,
    format: functionData.format as typeOfFormat,
    maxInterval: functionData.maxInterval,
    minInterval: functionData.minInterval,
    scaleData: functionData.scaleData,
    message: functionData.message,
    streaming: functionData.streaming,
  };

  return initialState;
}
