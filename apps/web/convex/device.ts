import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

export const createDevice = mutation({
  args: { name: v.string(), description: v.string(), teamId: v.id("team") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("You dont have authorizacion");
    }
    const currentDate = new Date().getTime();
    return await ctx.db.insert("device", {
      teamId: args.teamId,
      name: args.name,
      description: args.description,
      isOnline: {
        isOnline: false,
        lastCheck: currentDate,
      },
      files: [null, null, null],
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

export const sendFileIdentifier = mutation({
  args: {
    storageId: v.optional(v.id("_storage")),
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const currentDevice = await ctx.db.get(args.deviceId);

    const currentFiles = currentDevice?.files;

    let dataTosend = null;
    if (args.storageId) {
      dataTosend = args.storageId;
    }
    if (!currentFiles) {
      await ctx.db.patch(args.deviceId, {
        files: [dataTosend],
      });
      return;
    }

    if (currentFiles.length >= 3) {
      const firstFile = currentFiles[0];
      if (firstFile) {
        await ctx.storage.delete(firstFile);
      }
      currentFiles.splice(0, 1);
      currentFiles.push(dataTosend);
      await ctx.db.patch(args.deviceId, {
        files: currentFiles,
      });
      return;
    }
    await ctx.db.patch(args.deviceId, {
      files: [...currentFiles, dataTosend],
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
    return await ctx.storage.getUrl(args.storageId);
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

export const setDeviceActive = mutation({
  args: {
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const currentDate = new Date();

    await ctx.db.patch(args.deviceId, {
      isOnline: { isOnline: true, lastCheck: currentDate.getTime() },
    });
    await ctx.scheduler.runAfter(
      600000,
      internal.device.setTimerForInActivity,
      {
        deviceId: args.deviceId,
      },
    );
  },
});

export const setDeviceInactive = mutation({
  args: {
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const currentDate = new Date();

    await ctx.db.patch(args.deviceId, {
      isOnline: { isOnline: false, lastCheck: currentDate.getTime() },
    });
  },
});

export const setTimerForInActivity = internalMutation({
  args: {
    deviceId: v.id("device"),
  },
  handler: async (ctx, args) => {
    const currentDate = new Date();
    await ctx.db.patch(args.deviceId, {
      isOnline: { isOnline: false, lastCheck: currentDate.getTime() },
    });
  },
});
