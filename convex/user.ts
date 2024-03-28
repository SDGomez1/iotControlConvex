import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

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
