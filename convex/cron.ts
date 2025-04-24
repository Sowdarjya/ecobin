// import { mutation } from "./_generated/server";
// import { api } from "./_generated/api";

// export const monthlyJob = mutation({
//   handler: async (ctx) => {
//     const users = await ctx.db.query("users").collect();
//     const now = new Date();

//     for (const user of users) {
//       await ctx.runMutation(api.reimbursements.processMonthlyReimbursement, {
//         userId: user._id,
//         year: now.getFullYear(),
//         month: now.getMonth(),
//       });
//     }
//   },
// });
