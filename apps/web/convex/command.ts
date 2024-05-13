import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const createCommand = mutation({
  args: {
    deviceId: v.id("device"),
    deviceFunctionId: v.id("deviceFunction"),
    payload: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const deviceFunctions = await ctx.db
      .query("deviceFunction")
      .filter((q) => q.eq(q.field("deviceId"), args.deviceId))
      .collect();

    const commandsPromises = deviceFunctions.map(async (functionData) => {
      return await ctx.db
        .query("command")
        .filter((q) => q.eq(q.field("deviceFunctionId"), functionData._id))
        .collect();
    });
    const commands = (await Promise.all(commandsPromises)).flat();
    const definedCommands: Doc<"command">[] = commands.filter(
      (commandData): commandData is Doc<"command"> => commandData !== null,
    );
    const sortedCommands = definedCommands.sort(
      (a, b) => a._creationTime - b._creationTime,
    );
    const excludingMostRecentTwo = sortedCommands.slice(0, -2);

    excludingMostRecentTwo.forEach(async (command) => {
      await ctx.db.delete(command._id);
    });

    await ctx.db.insert("command", {
      deviceFunctionId: args.deviceFunctionId,
      status: "PENDING",
      payload: args.payload,
    });
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

export const getPendingCommandsByDeviceId = query({
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
    const pendingCommandsPromises = devicesFunctions.map(async (functions) => {
      const commandsForFunctions = await Promise.all(
        functions.map(async (functionData) => {
          return await ctx.db
            .query("command")
            .filter((q) => q.eq(q.field("deviceFunctionId"), functionData._id))
            .filter((q) => q.eq(q.field("status"), "PENDING"))
            .first();
        }),
      );
      return commandsForFunctions.flat();
    });

    const pendingCommands = (await Promise.all(pendingCommandsPromises)).flat();

    const definedCommands: Doc<"command">[] = pendingCommands.filter(
      (commandData): commandData is Doc<"command"> => commandData !== null,
    );
    const getfunctionCommands = definedCommands.map(async (commandData) => {
      const functionData = await ctx.db.get(commandData.deviceFunctionId);
      return {
        commandId: commandData._id,
        status: commandData.status,
        functionData: functionData,
        payload: commandData.payload,
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
