"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "img/Logo.png";

import { useRouter } from "next/navigation";

import MobileThemeSwitch from "components/common/MobileThemeSwitch";

import { SignOutButton } from "@clerk/clerk-react";
import type { ActiveSessionResource } from "@clerk/types";

import {
  Fragment,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";

import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Doc, Id } from "convex/_generated/dataModel";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function Sidebar(props: {
  isAdmin: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  userTeams: Doc<"team">[];
  userActiveTeamInfo: Doc<"team">;
  currentUser: ActiveSessionResource;
}) {
  const router = useRouter();

  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent | TouchEvent) => {
      if (columnRef.current !== null) {
        if (!columnRef.current.contains(e.target as Node)) {
          props.setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", pageClickEvent);
    document.addEventListener("touchstart", pageClickEvent);

    return () => {
      document.removeEventListener("click", pageClickEvent);
      document.removeEventListener("touchstart", pageClickEvent);
    };
  }, [props.isOpen]);

  const selectTeam = useMutation(api.user.setActiveTeam);

  const teamOptions = props.userTeams.map((team) => {
    return (
      <ListboxOption
        value={team._id}
        key={team._id}
        className={`relative cursor-default select-none px-2 py-2 pr-4 text-left text-lightText data-[focus]:bg-black/10 dark:bg-dark dark:text-darkText dark:data-[focus]:bg-white/10`}
      >
        {team.name}
      </ListboxOption>
    );
  });

  return (
    <nav
      ref={columnRef}
      className={`fixed w-75vw shrink-0 ${props.isOpen ? "left-0" : "-left-full"} top-0 z-20 flex h-svh flex-col gap-2 bg-white  py-4 text-sm transition-all lg:relative lg:left-0 lg:z-0 lg:h-screen lg:w-64 lg:border-r lg:text-base dark:bg-dark lg:dark:border-r-neutral-700`}
    >
      <div className="flex items-center justify-between px-4 lg:hidden">
        <Image src={logo} alt="" className="h-6 w-8 " />
        <span onClick={() => props.setIsOpen(false)}>
          <Cross2Icon className="size-6 stroke-lightText dark:stroke-darkText" />
        </span>
      </div>
      <div className="px-4 py-2 font-medium">
        <Listbox
          onChange={(value) => {
            selectTeam({
              teamId: value as Id<"team">,
              userID: props.currentUser.user.id,
            });
            router.replace("/user");
          }}
        >
          <ListboxButton className="flex w-full items-center justify-between">
            {props.userActiveTeamInfo.name}
            <CaretSortIcon className="size-5 stroke-lightText dark:stroke-darkText" />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute left-0 mx-3 mt-1 max-h-40 w-11/12 overflow-auto rounded-md border bg-white  text-sm  focus:outline-none lg:text-base dark:border-darkText dark:bg-dark">
              {teamOptions}
            </ListboxOptions>
          </Transition>
        </Listbox>
      </div>
      <div className="h-full ">
        <ul className="font-medium">
          <li className="px-4 py-2 hover:bg-black/10 dark:hover:bg-white/10">
            <Link href={`/${props.isAdmin ? "admin" : "user"}`}>
              Dispositivos
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-black/10 dark:hover:bg-white/10">
            <Link href={`/${props.isAdmin ? "admin" : "user"}/team `}>
              Miembros
            </Link>
          </li>
          {/* <li className="py-2">
            <Link href={`/${props.isAdmin ? "admin" : "user"}`}>
              Configuración
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="px-4">
        <MobileThemeSwitch />
        <p className="py-2 pl-1 text-base font-medium ">
          {props.currentUser.user.username}
        </p>
        <SignOutButton>
          <button className="w-full justify-center rounded border border-lightText/60 py-2 text-center text-xs text-lightText transition hover:bg-neutral-50 lg:text-sm dark:border-darkText dark:text-darkText">
            Cerrar Sesión
          </button>
        </SignOutButton>
      </div>
    </nav>
  );
}
