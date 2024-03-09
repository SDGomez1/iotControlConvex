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
});
