import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCommand = mutation({
  args: {
    value: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("command", {
      value: args.value,
    });
  },
});

export const readCommand = query({
  args: {},
  handler: async (ctx, args) => {
    const command = await ctx.db.query("command").order("desc").take(1);
    return command[0] ? command[0].value : undefined;
  },
});
