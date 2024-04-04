import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCommand = mutation({
  args: {
    deviceFunctionId: v.id("deviceFunction"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("command", {
      deviceFunctionId: args.deviceFunctionId,
    });
  },
});

export const readFirstCommand = query({
  args: {},
  handler: async (ctx, args) => {
    const commnadCreated = await ctx.db.query("command").order("desc").first();
    if (commnadCreated === null) {
      return undefined;
    } else {
      const deviceFunction = await ctx.db.get(commnadCreated.deviceFunctionId);
      const command = deviceFunction?.command;
      const deviceID = deviceFunction?.deviceId;

      return {
        deviceId: deviceID,
        command: command,
      };
    }
  },
});
