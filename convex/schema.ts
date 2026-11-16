import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),
  folders: defineTable({
    name: v.string(),
    userId: v.string(),
    parentId: v.optional(v.id("folders")),
  })
    .index("by_user", ["userId"])
    .index("by_parent", ["parentId"])
    .index("by_user_parent", ["userId", "parentId"]),
});
