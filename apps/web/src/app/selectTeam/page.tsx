"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "img/Logo.png";

import { ChevronUpDown } from "components/icons/ChevronUpDown";

import { useUser } from "@clerk/clerk-react";

import { Fragment, useState } from "react";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { Listbox, Transition } from "@headlessui/react";

export default function SelectTeam() {
  const router = useRouter();

  const user = useUser();

  const queryData = useQuery(api.invitations.getInvitationByUser);
  const selectTeam = useMutation(api.user.setActiveTeam);
  const acceptInvitation = useMutation(api.invitations.setInvitationAccepted);
  const createTeam = useMutation(api.team.createTeam);

  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedID] = useState("");

  if (queryData?.invitations.length === undefined) {
  }
  const teams = queryData?.invitations.map((data) => {
    const teamInfo = queryData?.teams.find((team) => team._id === data.teamId);

    return (
      <Listbox.Option
        value={`${teamInfo?.name};${data._id}:${teamInfo?._id}`}
        key={data._id as string}
        className={({ active }) =>
          `relative cursor-default select-none px-2 py-2 pr-4 ${
            active
              ? "bg-indigo-600 text-white"
              : "text-gray-900 lg:text-base dark:text-darkText"
          }`
        }
      >
        {teamInfo?.name}
      </Listbox.Option>
    );
  });

  const placeholder =
    (teams?.length as number) > 0
      ? "Seleciona una invitacion a un equipo"
      : "No hay invitaciones disponbiles";

  return (
    <div className=" flex h-screen w-full items-center justify-center px-4">
      <div className="flex w-full flex-col  p-4  lg:w-500px">
        <Image
          src={logo}
          alt="Logo"
          className="mb-4 h-10 w-12 self-center lg:h-14 lg:w-16"
        />
        <h2 className="text-xl font-semibold lg:text-center lg:text-4xl">
          Crea un nuevo equipo
        </h2>
        <p className="mb-6 text-sm text-lightText lg:text-center lg:text-base dark:text-darkText">
          O unete a un equipo por invitación
        </p>
        <form
          className="flex w-full flex-col"
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            const description = formData.get("description") as string;

            if (name !== "" && description !== "") {
              createTeam({
                name: name,
                description: description,
              });
              router.push("/admin");
            }
          }}
        >
          <label className=" text-xs font-bold lg:text-base"> Nombre</label>
          <input
            className="mb-4 border-lightText/60 bg-transparent dark:border-darkText/60"
            name="name"
            placeholder={`Equipo de ${user.user?.username}`}
          />
          <label className="  text-xs font-bold lg:text-base">
            Descripción
          </label>
          <input
            className="mb-4 border-lightText/60 bg-transparent dark:border-darkText/60"
            name="description"
            placeholder={`Equipo personal de ${user.user?.username}`}
          />

          <button className="mb-10 w-full rounded bg-accent py-2 text-xs text-white lg:text-base">
            Crear
          </button>
        </form>
        <h2 className="text-xl font-semibold lg:text-center lg:text-4xl">
          Tus invitaciones
        </h2>
        <p className="text-sm  text-lightText lg:mb-4 lg:text-center lg:text-base dark:text-darkText">
          Pidele a un administrador de equipo que te invite
        </p>
        <Listbox
          onChange={(value) => {
            const [name, id] = value.split(";");
            setSelected(name);
            setSelectedID(id);
            return;
          }}
        >
          <div className="relative mb-4 w-full">
            <Listbox.Button className="relative mt-2 w-full rounded-lg border border-lightText/60 p-2 text-left text-sm dark:border-darkText/60 ">
              <span className="text-lightText lg:text-base dark:text-darkText">
                {selected !== "" ? selected : placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDown className="size-6 stroke-lightText dark:stroke-darkText" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm ring-1 ring-black/5 focus:outline-none lg:text-base ">
                {teams}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <button
          className="mb-10 w-full rounded bg-accent py-2 text-xs text-white lg:text-base"
          onClick={() => {
            const [invitationID, teamID] = selectedId.split(":");
            selectTeam({
              teamId: teamID as Id<"team">,
              userID: user.user?.id as string,
            });
            acceptInvitation({
              invitationId: invitationID as Id<"invitations">,
            });
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
