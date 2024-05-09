import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCommand = mutation({
  args: {
    deviceFunctionId: v.id("deviceFunction"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("command", {
      deviceFunctionId: args.deviceFunctionId,
      status: "PENDING",
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
        deviceFunctionId: deviceFunction?._id,
      };
    }
  },
});

export const getCommandsByDeviceId = query({
  args: {
    deviceId: v.array(v.id("device")),
  },
  handler: async (ctx, args) => {
    if (args.deviceId.length <= 0) {
      return undefined;
    }

    const getDevicesFunction = args.deviceId.map(async (deviceId) => {
      return await ctx.db
        .query("deviceFunction")
        .filter((q) => q.eq(q.field("deviceId"), deviceId))
        .collect();
    });

    const devicesFunctions = await Promise.all(getDevicesFunction);
    const commandsPromises = devicesFunctions.map(async (functions) => {
      const commandsForFunctions = await Promise.all(
        functions.map(async (functionData) => {
          return await ctx.db
            .query("command")
            .filter((q) => q.eq(q.field("deviceFunctionId"), functionData._id))
            .collect();
        }),
      );
      return commandsForFunctions.flat();
    });

    const commands = (await Promise.all(commandsPromises)).flat();

    const getfunctionCommands = await commands.map(async (commandData) => {
      const functionData = await ctx.db.get(commandData.deviceFunctionId);
      return {
        commandId: commandData._id,
        status: commandData.status,
        functionData: functionData,
      };
    });

    const functionCommands = await Promise.all(getfunctionCommands);
    return functionCommands;
  },
});

export const deleteCommandById = mutation({
  args: {
    commandId: v.id("command"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.commandId);
  },
});

export const updateCommandStatus = mutation({
  args: {
    commandId: v.id("command"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.commandId, { status: args.status });
  },
});
