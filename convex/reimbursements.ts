import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

const calculateReimbursement = (compostKg: number): number => {
  if (compostKg >= 20) return 500;
  if (compostKg >= 10) return 300;
  return 100;
};

export const processMonthlyReimbursement = mutation({
  args: {
    userId: v.id("users"),
    year: v.number(),
    month: v.number(),
  },
  handler: async (ctx, args) => {
    const compostTotal = await ctx.runQuery(
      api.compost.getMonthlyCompost,
      args
    );
    const amount = calculateReimbursement(compostTotal);

    return ctx.db.insert("reimbursements", {
      userId: args.userId,
      amount,
      status: "PENDING",
      period: `${args.year}-${args.month.toString().padStart(2, "0")}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getUserReimbursements = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return ctx.db
      .query("reimbursements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
