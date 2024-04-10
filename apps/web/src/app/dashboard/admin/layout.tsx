"use client";
import Skeleton from "components/dashboard/Skeleton";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "@clerk/clerk-react";

import { Doc, Id } from "convex/_generated/dataModel";
interface invitation {
  teams: Doc<"team">[];
  invitations: Doc<"invitations">[];
}
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useSession();

  if (!user) {
    return;
  }
  if (user.session?.user.id) {
    const invitationsByUser = useQuery(api.invitations.getInvitationByUser);
    const userActiveTeam = useQuery(api.user.getUserActiveTeam, {
      userId: user.session.user.id,
    });
    const userActiveTeamInfo = useQuery(api.team.getTeamById, {
      teamId: userActiveTeam as Id<"team">,
    });

    const userTeams = useQuery(api.team.getUserTeams);

    if (!userTeams || !userActiveTeamInfo || !userActiveTeam || !user.session) {
      return;
    }

    return (
      <Skeleton
        userActiveTeamInfo={userActiveTeamInfo}
        currentUser={user.session}
        userTeams={userTeams}
        invitationsByUser={invitationsByUser as invitation | null}
      >
        {children}
      </Skeleton>
    );
  }
}
