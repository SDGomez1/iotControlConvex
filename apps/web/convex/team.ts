import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTeam = mutation({
  args: {
    adminID: v.string(),
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("team", {
      name: args.name,
      description: args.description,
      adminId: args.adminID,
      userRegistered: [args.adminID],
    });
  },
});

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
