import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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

export const userFirstLogin = query({
  args: {},
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity().then((user) => {
      if (!user) {
        console.log(user);
      }
    });
  },
});
