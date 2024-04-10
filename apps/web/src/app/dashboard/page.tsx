"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import type { Id } from "convex/_generated/dataModel";

import LoadingScreen from "components/common/LoadingScreen";

export default function dashboardPage() {
  const router = useRouter();
  const user = useUser();
  if (!user.isLoaded) {
    return <LoadingScreen />;
  }
  if (!user.user) {
    router.replace("/");
  } else {
    const activeTeam = useQuery(api.user.getUserActiveTeam, {
      userId: user.user.id,
    });
    if (activeTeam === null) {
      router.replace("/selectTeam");
    }

    const teamInfo = useQuery(api.team.getTeamById, {
      teamId: activeTeam as Id<"team">,
    });

    if (teamInfo === undefined || teamInfo === null) {
      return <LoadingScreen />;
    }

    if (teamInfo.adminId == user.user.id) {
      router.replace("dashboard/admin");
    } else {
      router.replace("dashboard/user");
    }

    return <LoadingScreen />;
  }
}
