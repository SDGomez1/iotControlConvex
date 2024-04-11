import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTeam = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return;
    }
    const newTeam = await ctx.db.insert("team", {
      name: args.name,
      description: args.description,
      adminId: user.subject,
      userRegistered: [user.subject],
    });
    const userId = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), user.subject))
      .unique();
    if (!userId) {
      return;
    }
    await ctx.db.patch(userId._id, { activeTeam: newTeam });
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
    teamId: v.id("team"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.teamId);
  },
});

export const getActiveTeamInfo = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return;
    }
    const data = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), user.subject))
      .first();
    if (!data?.activeTeam) {
      return;
    }
    return await ctx.db.get(data.activeTeam);
  },
});
