"use client";
import FunctionCardView from "components/dashboard/admin/newDevice/FunctionCardView";
import FunctionForm from "components/dashboard/admin/newDevice/FunctionForm";
import { Plus } from "components/icons/Plus";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useState } from "react";

export default function NewDevice() {
  const [isCreating, setIsCreating] = useState(false);
  const currentFunctions = useAppSelector((state) => state.newDeviceFunctions);
  const dispatch = useAppDispatch();

  const currentFunctionsCards = currentFunctions.map((functionData) => {
    return <FunctionCardView name={functionData.name} />;
  });
  return (
    <section className=" flex max-h-screen flex-col px-5">
      <form className="  flex flex-col pt-4">
        <input
          name="deviceName"
          placeholder="Nombre"
          className="my-0 border-none bg-transparent px-0 font-semibold outline-none focus:ring-0 lg:text-4xl"
          disabled={isCreating}
          autoComplete="off"
          required
        />

        <input
          name="deviceDescription"
          placeholder="Descripción"
          className={`border-0 bg-transparent px-0  text-sm outline-none focus:ring-0 lg:text-base focus:dark:border-white  ${isCreating ? "border-b-0" : "border-b"}`}
          disabled={isCreating}
          autoComplete="off"
          required
        />
        <h2 className=" mt-2  font-medium lg:text-2xl">
          Funciones del dispositivo
        </h2>
        <p className=" mb-4  py-2 text-sm font-medium text-lightText lg:text-base dark:text-darkText">
          Oprime el botón para crear una nueva función de tu dispositivo
        </p>
      </form>
      {isCreating ? (
        <div className="  h-min max-h-min overflow-y-scroll pb-32 lg:pb-40">
          <FunctionForm setIsEditing={setIsCreating} />
        </div>
      ) : (
        <div className="mb-4 flex flex-col gap-4">{currentFunctionsCards}</div>
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
          <Plus className="size-4" />
          Añadir nueva funcion
        </button>
      )}
    </section>
  );
}
