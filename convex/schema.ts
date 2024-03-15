import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    userId: v.string(),
    email: v.string(),
  }),
  command: defineTable({
    deviceFunctionId: v.id("deviceFunction"),
    status: v.optional(v.string()),
  }),
  device: defineTable({
    userId: v.optional(v.string()),
    nombre: v.string(),
    description: v.string(),
  }),
  deviceFunction: defineTable({
    deviceId: v.id("device"),
    nombre: v.string(),
    descripcion: v.string(),
    command: v.string(),
  }),
  organization: defineTable({
    adminId: v.string(),
    userRegistered: v.array(v.string()),
    name: v.string(),
    description: v.string(),
  }),
});
