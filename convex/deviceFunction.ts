import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFunction = mutation({
  args: {
    deviceId: v.id("device"),
    nombre: v.string(),
    descripcion: v.string(),
  },
  handler: async (ctx, args) => {
    const deviceFunction = ctx.db.insert("deviceFunction", {
      deviceId: args.deviceId,
      nombre: args.nombre,
      descripcion: args.descripcion,
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
