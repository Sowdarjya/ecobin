// /lib/api.ts

import * as compost from "@/../convex/compost";
import * as reimburse from "@/../convex/reimbursements";
import * as bins from "@/../convex/bins";
import * as analytics from "@/../convex/analytics";

export const getCompost = async () => await compost.getMonthlyCompost;
export const getReimbursements = async () =>
  await reimburse.getUserReimbursements;
export const getAnalytics = async () => await analytics.getDashboardData;
export const addBin = async (data: { name: string }) => await bins.registerBin;
