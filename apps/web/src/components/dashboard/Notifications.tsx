import { Menu, Transition } from "@headlessui/react";
import { Bell } from "components/icons/Bell";
import { Check } from "components/icons/Check";
import { XMark } from "components/icons/XMark";
import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useAppSelector } from "lib/hooks";
import { Fragment } from "react";
interface invitation {
  teams: Doc<"team">[];
  invitations: Doc<"invitations">[];
}

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
      <Menu.Item>
        <div className="flex items-center gap-6 px-4 py-2 text-sm font-light">
          <span className="dark:text-darktext flex size-8 shrink-0 items-center justify-center rounded-full border border-accent text-accent dark:border-darkText dark:text-darkText">
            {teamInfo?.name.charAt(0)}
          </span>
          <p className="flex w-52 flex-wrap items-center justify-center text-left ">
            Te han invitado a unirte al equipo {teamInfo?.name}
          </p>
          <div className=" flex items-center justify-center gap-4">
            <button
              onClick={() => acceptInvitation({ invitationId: data._id })}
            >
              <Check className="size-5 stroke-green-600" />
            </button>
            <button
              onClick={() => rejectInvitation({ invitationId: data._id })}
            >
              <XMark className="size-5 stroke-red-600" />
            </button>
          </div>
        </div>
      </Menu.Item>
    );
  });

  return (
    <Menu as="div" className="relative hidden  lg:block">
      <Menu.Button className="relative flex items-center justify-center">
        <Bell className="size-6 stroke-lightText dark:stroke-darkText " />
        {currentInvitations !== undefined && currentInvitations?.length > 0 ? (
          <span className="absolute right-15% top-10% size-2 rounded-full bg-danger" />
        ) : (
          <></>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-1 mt-2 flex w-96 origin-top-right flex-col gap-2 rounded bg-white py-4  shadow-lg ring-1 ring-lightText/20 focus:outline-none dark:bg-dark dark:ring-darkText ">
          <div>
            <h3 className="px-4 font-medium">Notificaciones</h3>
            <p className="border-b border-b-lightText/20  px-4 pb-2 text-sm text-lightText dark:border-darkText dark:text-darkText">
              Acepta o Rechaza las invitaciones a otros equipos
            </p>
          </div>

          {currentInvitations !== undefined &&
          currentInvitations?.length > 0 ? (
            currentInvitations
          ) : (
            <p className=" flex items-center justify-center pt-1 text-center text-sm text-lightText dark:text-darkText">
              No hay invitaciones
            </p>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
