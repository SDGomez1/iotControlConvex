"use client";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useAppSelector } from "lib/hooks";
import TeamMemberCard from "./TeamMemberCard";
import { Plus } from "components/icons/Plus";

export default function TeamPage(props: { isAdmin: boolean }) {
  const currentTeamInfo = useAppSelector(
    (state) => state.databaseData.userActiveTeamInfo,
  );

  const usersInTeam = useQuery(api.team.getTeamUsersInfo, {
    teamId: currentTeamInfo._id,
  });

  const pendingUser = useQuery(api.invitations.getUserInvitationInfoByTeamId, {
    teamId: currentTeamInfo._id,
  });
  const userMemberCards = usersInTeam?.teamUsers.map((user, index) => {
    return (
      <TeamMemberCard
        key={index}
        userName={user}
        isPending={false}
        isAdmin={props.isAdmin}
      />
    );
  });

  const pendingUserCards = pendingUser?.map((user, index) => {
    return (
      <TeamMemberCard
        key={index}
        userName={user}
        isPending={true}
        isAdmin={props.isAdmin}
      />
    );
  });
  return (
    <section className="h-full overflow-y-scroll px-4 pb-40">
      <h2 className="my-0 mb-4 border-none bg-transparent px-0 text-xl font-semibold outline-none focus:ring-0 lg:text-4xl">
        {currentTeamInfo.name}
      </h2>
      <h3 className="mb-2 font-medium lg:text-xl">Administrador</h3>
      <div className="mb-4">
        <TeamMemberCard
          userName={usersInTeam?.adminUser}
          isPending={false}
          isAdmin={false}
        />
      </div>
      <h3 className="mb-2 font-medium lg:text-xl">Integrantes</h3>
      <div className=" flex flex-col gap-2">
        {userMemberCards}
        {pendingUserCards}
        {props.isAdmin ? (
          <button className="flex w-full  items-center justify-center gap-4 rounded-md border  border-lightText p-4 text-sm text-lightText dark:border-darkText dark:text-darkText">
            <Plus className="size-5 stroke-lightText  dark:stroke-darkText " />
            Añadir nuevo integrante
          </button>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
