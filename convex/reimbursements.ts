import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserReimbursements = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return ctx.db
      .query("reimbursements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const updateReimbursementStatus = mutation({
  args: {
    reimbursementId: v.id("reimbursements"),
    status: v.union(
      v.literal("PENDING"),
      v.literal("PAID"),
      v.literal("FAILED")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.reimbursementId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const processMonthlyReimbursement = mutation({
  args: {
    userId: v.id("users"),
    year: v.number(),
    month: v.number(),
  },
  handler: async (ctx, args) => {
    const period = `${args.year}-${args.month.toString().padStart(2, "0")}`;

    const existingReimbursement = await ctx.db
      .query("reimbursements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("period"), period))
      .first();

    if (existingReimbursement) {
      return existingReimbursement._id;
    }

    return ctx.db.insert("reimbursements", {
      userId: args.userId,
      amount: 0,
      status: "PENDING",
      period,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
