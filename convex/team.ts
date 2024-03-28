import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUserTeams = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    const team = await ctx.db.query("team").collect();
    const userTeam = team.filter((team) =>
      team.userRegistered.includes(user?.subject as string),
    );

    return userTeam;
  },
});

export const getTeamById = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("No tienes permitido ver esta pagina");
    }
    return await ctx.db
      .query("team")
      .filter((q) => q.eq(q.field("_id"), args.teamId))
      .take(1);
  },
});
