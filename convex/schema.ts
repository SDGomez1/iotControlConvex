import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    userId: v.string(),
    email: v.string(),
  }),
  command: defineTable({
    value: v.string(),
  }),
  device: defineTable({
    userId: v.optional(v.string()),
    nombre: v.string(),
    description: v.string(),
  }),
  deviceFunction: defineTable({
    deviceId: v.optional(v.string()),
    nombre: v.string(),
    descripcion: v.string(),
    command: v.optional(v.string()),
  }),
});
