import { invitations } from "@clerk/clerk-sdk-node";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    userId: v.string(),
    userName: v.string(),
    firstLogin: v.boolean(),
    activeTeam: v.optional(v.id("team")),
  }).searchIndex("search_user", {
    searchField: "userName",
  }),
  command: defineTable({
    deviceFunctionId: v.id("deviceFunction"),
    status: v.optional(v.string()),
  }),
  device: defineTable({
    teamId: v.id("team"),
    name: v.string(),
    description: v.string(),
  }),
  deviceFunction: defineTable({
    deviceId: v.id("device"),
    name: v.string(),
    description: v.string(),
    command: v.string(),
  }),
  team: defineTable({
    adminId: v.string(),
    userRegistered: v.array(v.string()),
    name: v.string(),
    description: v.string(),
  }),
  invitations: defineTable({
    teamId: v.id("team"),
    userId: v.string(),
  }),
});
