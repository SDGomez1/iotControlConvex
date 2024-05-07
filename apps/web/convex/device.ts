import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { error } from "console";

export const createDevice = mutation({
  args: { name: v.string(), description: v.string(), teamId: v.id("team") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("You dont have authorizacion");
    }

    return await ctx.db.insert("device", {
      teamId: args.teamId,
      name: args.name,
      description: args.description,
    });
  },
});

export const getdevices = query({
  args: { teamId: v.id("team") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("device")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .collect();
  },
});

export const getdeviceById = query({
  args: { deviceId: v.id("device") },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId);

    if (!device) {
      return undefined;
    }
    return device;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendFile = mutation({
  args: {
    storageId: v.id("_storage"),
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.deviceId, {
      files: args.storageId,
    });
  },
});

export const getStorageUrl = query({
  args: {
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const deviceData = await ctx.db.get(args.deviceId);
    return deviceData?.files;
  },
});

export const getFiles = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.storage.getUrl(args.storageId);
  },
});

export const updateDevice = mutation({
  args: {
    deviceId: v.id("device"),
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.deviceId, {
      name: args.name,
      description: args.description,
    });
  },
});

export const deleteDevice = mutation({
  args: {
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const deviceFunctions = await ctx.db
      .query("deviceFunction")
      .filter((q) => q.eq(q.field("deviceId"), args.deviceId))
      .collect();
    const commands = deviceFunctions.map(async (functionData) => {
      const command = await ctx.db
        .query("command")
        .filter((q) => q.eq(q.field("deviceFunctionId"), functionData._id))
        .collect();
      return command;
    });
    commands.forEach((promise) => {
      promise.then((data) => {
        data.forEach(async (command) => {
          return ctx.db.delete(command._id);
        });
      });
    });
    deviceFunctions.forEach(async (deviceFunction) => {
      await ctx.db.delete(deviceFunction._id);
    });
    await ctx.db.delete(args.deviceId);
  },
});
