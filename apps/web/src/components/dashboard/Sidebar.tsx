"use client";
import { XMark } from "components/icons/XMark";
import Image from "next/image";
import logo from "img/Logo.png";
import MobileThemeSwitch from "components/common/MobileThemeSwitch";
import { SignOutButton } from "@clerk/clerk-react";
import { Fragment, type Dispatch, type SetStateAction } from "react";

import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { ChevronUpDown } from "components/icons/ChevronUpDown";
import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "lib/hooks";
import { Id } from "convex/_generated/dataModel";
export default function Sidebar(props: {
  isAdmin: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const selectTeam = useMutation(api.user.setActiveTeam);

  const userTeams = useAppSelector((state) => state.databaseData.userTeams);
  const userActiveTeamInfo = useAppSelector(
    (state) => state.databaseData.userActiveTeamInfo,
  );
  const currentUser = useAppSelector((state) => state.databaseData.currentUser);

  const teamOptions = userTeams.map((team) => {
    return (
      <Listbox.Option
        value={team._id}
        key={team._id}
        className={`relative cursor-default select-none px-2 py-2 pr-4 text-lightText dark:bg-dark dark:text-darkText`}
      >
        {team.name}
      </Listbox.Option>
    );
  });

  return (
    <nav
      className={`fixed w-75vw shrink-0 ${props.isOpen ? "left-0" : "-left-full"} top-0 z-20 flex h-screen flex-col gap-2 bg-white px-4 py-4 text-sm transition-all lg:relative lg:left-0 lg:z-0 lg:w-64 lg:border-r lg:text-base dark:bg-dark lg:dark:border-r-neutral-700`}
    >
      <div className="flex items-center justify-between lg:hidden">
        <Image src={logo} alt="" className="h-6 w-8 " />
        <span onClick={() => props.setIsOpen(false)}>
          <XMark className="size-6 stroke-lightText dark:stroke-darkText" />
        </span>
      </div>
      <div className="py-2 font-medium">
        <Listbox
          onChange={(value) => {
            selectTeam({
              teamId: value as Id<"team">,
              userID: currentUser.user.id,
            });
          }}
        >
          <Listbox.Button className="flex w-full items-center justify-between">
            {userActiveTeamInfo.name}
            <ChevronUpDown className="size-5 stroke-lightText dark:stroke-darkText" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-40 w-11/12 overflow-auto rounded-md border bg-white py-1  text-sm  focus:outline-none lg:text-base dark:border-darkText dark:bg-dark">
              {teamOptions}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
      <div className="h-full">
        <ul className="font-medium">
          <li className="py-2">
            <Link href={`/${props.isAdmin ? "admin" : "user"}`}>
              Dispositivos
            </Link>
          </li>
          <li className="py-2">
            <Link href={`/${props.isAdmin ? "admin" : "user"}/newDevice`}>
              Miembros
            </Link>
          </li>
          <li className="py-2">
            <Link href={`/${props.isAdmin ? "admin" : "user"}`}>
              Configuración
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <MobileThemeSwitch />
        <p className="py-2 pl-1 text-base font-medium ">
          {currentUser.user.username}
        </p>
        <SignOutButton>
          <button className="w-full justify-center rounded border border-lightText/60 py-2 text-center text-xs text-lightText lg:text-sm dark:border-darkText dark:text-darkText">
            Cerrar Sesión
          </button>
        </SignOutButton>
      </div>
    </nav>
  );
}
