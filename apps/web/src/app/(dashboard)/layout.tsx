"use client";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "@clerk/clerk-react";
import type { Id } from "convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { databaseDataFormat, invitation } from "types/databaseData";
import { useAppDispatch } from "lib/hooks";
import { update } from "lib/features/databaseData/dataBaseDataSlice";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useSession();
  const dispatch = useAppDispatch();

  const invitationsByUser = useQuery(api.invitations.getInvitationByUser);
  const userActiveTeam = useQuery(api.user.getUserActiveTeam);
  const userActiveTeamInfo = useQuery(api.team.getActiveTeamInfo);
  const userTeams = useQuery(api.team.getUserTeams);

  if (!user) {
    router.replace("/");
  }

  if (!userActiveTeam || !userActiveTeamInfo || !userTeams || !user.session) {
    return;
  }
  const databaseData: databaseDataFormat = {
    invitationsByUser: invitationsByUser as invitation,
    userActiveTeam: userActiveTeam,
    userActiveTeamInfo: userActiveTeamInfo,
    userTeams: userTeams,
    currentUser: user.session,
  };

  dispatch(update(databaseData));

  return <>{children}</>;
}
