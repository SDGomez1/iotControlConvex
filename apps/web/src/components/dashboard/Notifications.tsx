import { useAppSelector } from "lib/hooks";

import { Fragment } from "react";

import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { BellIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function Notifications() {
  const invitationsByUser = useAppSelector(
    (state) => state.databaseData.invitationsByUser,
  );

  const acceptInvitation = useMutation(api.invitations.setInvitationAccepted);
  const rejectInvitation = useMutation(api.invitations.setInvitationRejected);

  const currentInvitations = invitationsByUser?.invitations.map((data: any) => {
    const teamInfo = invitationsByUser?.teams.find(
      (team: any) => team._id === data.teamId,
    );
    return (
      <MenuItem>
        <div className="flex items-center gap-6 px-4 py-2 text-sm font-light">
          <span className="dark:text-darktext flex size-8 shrink-0 items-center justify-center rounded-full border border-accent text-xs text-accent lg:text-base dark:border-darkText dark:text-darkText">
            {teamInfo?.name.charAt(0)}
          </span>
          <p className="flex w-52 flex-wrap items-center justify-center text-left text-xs lg:text-base ">
            Te han invitado a unirte al equipo {teamInfo?.name}
          </p>
          <div className=" flex items-center justify-center gap-4">
            <button
              onClick={() => acceptInvitation({ invitationId: data._id })}
            >
              <CheckIcon className="size-5 stroke-green-600" />
            </button>
            <button
              onClick={() => rejectInvitation({ invitationId: data._id })}
            >
              <Cross2Icon className="size-5 stroke-red-600" />
            </button>
          </div>
        </div>
      </MenuItem>
    );
  });

  return (
    <Menu as="div" className="relative ">
      <MenuButton className="relative flex items-center justify-center">
        <BellIcon className="size-6 stroke-lightText dark:stroke-darkText " />
        {currentInvitations !== undefined && currentInvitations?.length > 0 ? (
          <span className="absolute right-15% top-10% size-2 rounded-full bg-danger" />
        ) : (
          <></>
        )}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-1 z-10 mt-2 flex w-80 origin-top-right flex-col gap-2 rounded bg-white py-4 shadow-lg  ring-1 ring-lightText/20 focus:outline-none lg:w-96 dark:bg-dark dark:ring-darkText ">
          <div>
            <h3 className="px-4 text-sm font-medium lg:text-base">
              Notificaciones
            </h3>
            <p className="border-b border-b-lightText/20 px-4  pb-2 text-xs text-lightText lg:text-sm dark:border-darkText dark:text-darkText">
              Acepta o Rechaza las invitaciones a otros equipos
            </p>
          </div>

          {currentInvitations !== undefined &&
          currentInvitations?.length > 0 ? (
            currentInvitations
          ) : (
            <p className=" flex items-center justify-center pt-1 text-center text-xs text-lightText lg:text-sm dark:text-darkText">
              No hay invitaciones
            </p>
          )}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
