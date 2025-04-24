import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const logCompost = mutation({
  args: {
    binId: v.id("bins"),
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("compost_entries", {
      ...args,
      date: Date.now(),
      createdAt: Date.now(),
    });
  },
});

export const getMonthlyCompost = query({
  args: { userId: v.id("users"), year: v.number(), month: v.number() },
  handler: async (ctx, args) => {
    const startDate = new Date(args.year, args.month - 1, 1).getTime();
    const endDate = new Date(args.year, args.month, 1).getTime();

    const entries = await ctx.db
      .query("compost_entries")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.and(q.gte(q.field("date"), startDate), q.lt(q.field("date"), endDate))
      )
      .collect();

    return entries.reduce((total, entry) => total + entry.amount, 0);
  },
});
