import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createFolder = mutation({
  args: {
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const name = args.name.trim();

    if (!name || name.length > 100) {
      throw new Error("Folder name must be between 1 and 100 characters.");
    }

    await ctx.db.insert("folders", {
      name,
      userId: identity.subject,
    });

    return { success: true };
  },
});

export const getFolders = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("folders")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});
