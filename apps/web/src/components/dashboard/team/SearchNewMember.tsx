"use client";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useAppSelector } from "lib/hooks";
import { Dispatch, SetStateAction, useState } from "react";

export default function SearchNewMember(props: {
  setIsSearchUser: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedPerson, setSelectedPerson] = useState<Doc<"user"> | null>(
    null,
  );

  const [currentOptions, setCurrentOptions] = useState<Doc<"user">[]>([]);
  const currentTeamId = useAppSelector(
    (state) => state.databaseData.userActiveTeam,
  );
  const getUsers = useMutation(api.user.getUserbyUserName);
  const sendInvitation = useMutation(api.invitations.createInvitation);
  const comboboxOptions = currentOptions.map((people) => {
    return (
      <ComboboxOption
        key={people._id}
        value={people}
        className={
          " flex cursor-default select-none items-center gap-2  px-3 py-1.5 data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10"
        }
      >
        {people.userName}
      </ComboboxOption>
    );
  });

  return (
    <span
      className={`fixed left-0 top-0  z-10 flex h-screen w-screen items-center justify-center bg-black/15 px-4 transition-all dark:bg-black/65`}
    >
      <div className="flex h-fit w-screen flex-col  rounded-lg bg-white px-5 py-8 lg:w-500px dark:bg-dark">
        <p className="mb-4 text-sm ">
          Busca a nuevos miembros por nombre de usuario
        </p>
        <Combobox
          value={selectedPerson}
          onChange={setSelectedPerson}
          onClose={() => setCurrentOptions([])}
        >
          <span className="relative w-full">
            <ComboboxInput
              autoComplete="off"
              placeholder="Nombre de usuario"
              className={"  mb-2 w-full bg-transparent"}
              displayValue={(item: Doc<"user">) => item?.userName}
              onChange={async (e) => {
                if (e.target.value.length >= 3) {
                  const fountPeople = await getUsers({
                    userName: e.target.value,
                  });
                  setCurrentOptions(fountPeople);
                } else {
                  setCurrentOptions([]);
                }
              }}
            ></ComboboxInput>

            <ComboboxOptions className="absolute top-full w-full overflow-hidden overflow-y-scroll rounded bg-white ring-1 ring-lightText empty:hidden dark:bg-dark dark:ring-darkText">
              {comboboxOptions}
            </ComboboxOptions>
          </span>
        </Combobox>

        <button
          disabled={!selectedPerson ? true : false}
          onClick={() => {
            sendInvitation({
              userId: selectedPerson?.userId as string,
              teamId: currentTeamId,
            });
            props.setIsSearchUser(false);
          }}
          className="mb-4 h-10 rounded bg-accent p-2 text-sm text-white disabled:bg-indigo-300 disabled:text-zinc-100"
        >
          Enviar invitacion
        </button>
        <button
          onClick={() => {
            props.setIsSearchUser(false);
          }}
          className="h-10 rounded-sm border border-danger p-2 text-sm text-danger  "
        >
          Cancelar
        </button>
      </div>
    </span>
  );
}
