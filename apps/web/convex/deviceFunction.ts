import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFunction = mutation({
  args: {
    deviceId: v.id("device"),
    name: v.string(),
    description: v.string(),
    comando: v.string(),
  },
  handler: async (ctx, args) => {
    const deviceFunction = ctx.db.insert("deviceFunction", {
      deviceId: args.deviceId,
      name: args.name,
      description: args.description,
      command: args.comando,
    });
  },
});

export const getFunctionByDeviceId = query({
  args: {
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const functions = ctx.db
      .query("deviceFunction")
      .filter((q) => q.eq(q.field("deviceId"), args.deviceId))
      .collect();

    return functions;
  },
});
