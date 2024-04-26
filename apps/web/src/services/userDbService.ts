import { fetchQuery } from "convex/nextjs";
import { api } from "convex/_generated/api";

async function getUserActiveTeam(userId: string) {
  const activeTeam = await fetchQuery(api.user.getUserActiveTeamWithServer, {
    userId: userId,
  });
  return activeTeam;
}

async function getUserActiveTeamInfo(userId: string) {
  const team = await fetchQuery(api.team.getActiveTeamInfoWithServer, {
    userId: userId,
  });
  return team;
}

export { getUserActiveTeam, getUserActiveTeamInfo };
