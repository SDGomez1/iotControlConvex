import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createCommand = mutation({
  args: {
    value: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("Command", {
      value: args.value,
    });
  },
});
