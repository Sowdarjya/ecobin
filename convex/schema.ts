import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    clerkId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_createdAt", ["createdAt"]),

  bins: defineTable({
    name: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  compost_entries: defineTable({
    amount: v.number(),
    binId: v.id("bins"),
    userId: v.id("users"),
    date: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_bin", ["binId"])
    .index("by_date", ["date"]),

  reimbursements: defineTable({
    amount: v.number(),
    status: v.union(
      v.literal("PENDING"),
      v.literal("PAID"),
      v.literal("FAILED")
    ),
    period: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_period", ["period"]),

  scheduled_jobs: defineTable({
    type: v.literal("MONTHLY_REIMBURSEMENT"),
    scheduledAt: v.number(),
    status: v.union(
      v.literal("PENDING"),
      v.literal("COMPLETED"),
      v.literal("FAILED")
    ),
  }).index("by_type_status", ["type", "status"]),
});
