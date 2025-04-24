import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const logCompost = mutation({
  args: {
    binId: v.id("bins"),
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const compostId = await ctx.db.insert("compost_entries", {
      ...args,
      date: Date.now(),
      createdAt: Date.now(),
    });

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const period = `${currentYear}-${currentMonth.toString().padStart(2, "0")}`;

    const monthlyCompost = await ctx.runQuery(api.compost.getMonthlyCompost, {
      userId: args.userId,
      year: currentYear,
      month: currentMonth,
    });

    let amount = 0;
    if (monthlyCompost >= 20) {
      amount = 500;
    } else if (monthlyCompost >= 10) {
      amount = 300;
    } else {
      amount = 100;
    }

    amount = Math.min(amount, 500);

    const existingReimbursement = await ctx.db
      .query("reimbursements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("period"), period))
      .first();

    if (existingReimbursement) {
      await ctx.db.patch(existingReimbursement._id, {
        amount,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("reimbursements", {
        userId: args.userId,
        amount,
        status: "PENDING",
        period,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return compostId;
  },
});

export const getMonthlyCompost = query({
  args: { userId: v.id("users"), year: v.number(), month: v.number() },
  handler: async (ctx, args) => {
    const startDate = new Date(args.year, args.month - 1, 1).getTime();
    const endDate = new Date(args.year, args.month, 0).getTime() + 86400000;

    const entries = await ctx.db
      .query("compost_entries")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.and(
          q.gte(q.field("date"), startDate),
          q.lte(q.field("date"), endDate)
        )
      )
      .collect();

    return entries.reduce((total, entry) => total + entry.amount, 0);
  },
});
