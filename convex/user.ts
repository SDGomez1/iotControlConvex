import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { useId } from "react";

export const createUser = internalMutation({
  args: { userName: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("user", {
      userName: args.userName,
      userId: args.userId,
      firstLogin: true,
    });
  },
});

export const getUserFirstLogin = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!data) {
      return;
    }
    return data.firstLogin;
  },
});

export const getUserActiveTeam = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!data) {
      return;
    }
    return data.activeTeam;
  },
});

export const setActiveTeam = mutation({
  args: {
    teamId: v.id("team"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return;
    }
    const userData = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), user.subject))
      .first();
    const userId = userData?._id;
    if (!userId) {
      return;
    }

    await ctx.db.patch(userId, { activeTeam: args.teamId });
  },
});
