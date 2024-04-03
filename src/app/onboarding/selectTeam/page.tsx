"use client";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDown } from "components/icons/ChevronUpDown";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function SelectTeam() {
  const teamsData = useQuery(api.team.getUserTeams);
  const selectTeam = useMutation(api.user.setActiveTeam);
  const router = useRouter();

  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedID] = useState("");

  const teams = teamsData?.map((team, index) => {
    return (
      <Listbox.Option
        value={team.name + ":" + team._id}
        key={team._id as string}
        className={({ active }) =>
          `relative cursor-default select-none px-2 py-2 pr-4 ${
            active ? "bg-indigo-600 text-white" : "text-gray-900"
          }`
        }
      >
        {team.name}
      </Listbox.Option>
    );
  });

  const placeholder =
    (teams?.length as number) > 0
      ? "Seleciona un equipo"
      : "No hay equipos disponbiles";

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex w-full flex-col items-center rounded-md border p-4 shadow-lg">
        <h2 className="text-xl font-semibold">Bienvenido</h2>
        <p className="text-sm text-neutral-500">
          Crea o unete a un equipo para empezar
        </p>
        <h4 className="mt-4 self-start font-semibold"> Crea un nuevo equipo</h4>
        <button className="mt-2 w-full rounded-lg border p-2 text-center text-sm shadow-md">
          Crear +
        </button>
        <h4 className="mt-4 self-start font-semibold"> Unete a un equipo</h4>
        <p className="text text-xs text-neutral-500">
          Pidele a un administrador que te una a un equipo, los equipos
          disponibles apareceran aquí
        </p>
        <Listbox
          onChange={(value) => {
            const [name, id] = value.split(":");
            setSelected(name);
            setSelectedID(id);
            return;
          }}
        >
          <div className="relative w-full">
            <Listbox.Button className="relative mt-2 w-full rounded-lg border p-2 text-left text-sm shadow-md ">
              <span>{selected !== "" ? selected : placeholder}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDown className="size-6" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                {teams}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <button
          onClick={() => {
            selectTeam({ teamId: selectedId as Id<"team"> });
            router.push("/adminDashboard");
          }}
          className={`${selectedId !== "" ? "pointer-events-auto" : "pointer-events-none text-neutral-400 shadow-none"} mt-2 w-full rounded-lg border p-2 text-center text-sm shadow-md`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
