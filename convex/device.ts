import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { error } from "console";

export const createDevice = mutation({
  args: { nombre: v.string(), descripcion: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("You dont have authorizacion");
    }

    return await ctx.db.insert("device", {
      userId: user.subject,
      nombre: args.nombre,
      description: args.descripcion,
    });
  },
}); // todo: circular references

export const getdevices = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    // if (!user) {
    //   throw new Error("You dont have authorizacion");
    // }
    return await ctx.db
      .query("device")
      .filter((q) => q.eq(q.field("userId"), user?.subject))
      .collect();
  },
});

export const getdeviceById = query({
  args: { deviceId: v.id("device") },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId);

    if (!device) {
      throw new Error("No device Found");
    }
    return device;
  },
});

export const getDeviceByOrganizationId = query({
  args: { organizationId: v.id("organization") },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organization")
      .filter((q) => q.eq(q.field("_id"), args.organizationId))
      .take(1);
    return await ctx.db
      .query("device")
      .filter((q) => q.eq(q.field("userId"), organization[0]?.adminId))
      .collect();
  },
});
