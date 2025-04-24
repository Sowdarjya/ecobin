import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDashboardData = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const [bins, compostEntries, reimbursements] = await Promise.all([
      ctx.db
        .query("bins")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect(),
      ctx.db
        .query("compost_entries")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect(),
      ctx.db
        .query("reimbursements")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect(),
    ]);

    const totalCompost = compostEntries.reduce((sum, e) => sum + e.amount, 0);
    const totalEarned = reimbursements.reduce((sum, r) => sum + r.amount, 0);

    return {
      bins,
      totalCompost,
      totalEarned,
      lastEntry: compostEntries.at(-1),
    };
  },
});
