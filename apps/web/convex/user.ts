import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

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
    if (!data) {
      return;
    }
    return data.activeTeam;
  },
});

export const setActiveTeam = mutation({
  args: {
    teamId: v.id("team"),
    userID: v.string(),
  },
  handler: async (ctx, args) => {
    const userData = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), args.userID))
      .first();
    const userId = userData?._id;
    if (!userId) {
      return;
    }

    await ctx.db.patch(userId, { activeTeam: args.teamId });
  },
});

export const getUserbyUserName = mutation({
  args: { userName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("user")
      .withSearchIndex("search_user", (q) =>
        q.search("userName", args.userName),
      )
      .take(3);
  },
});

//----------------------------------------
//  Server Actions for usage with middleware
//----------------------------------------

export const getUserActiveTeamWithServer = query({
  args: { userId: v.string() },
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
