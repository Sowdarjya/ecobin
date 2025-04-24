import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const registerBin = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bins", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getUserBins = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bins")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
