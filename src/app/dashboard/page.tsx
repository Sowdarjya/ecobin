"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"; // Importing ShadCN chart components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function DashboardPage() {
  const { user } = useUser();

  const ChartConfig = {
    compost: {
      label: "Compost",
      color: "#2563eb",
    },
    reimbursements: {
      label: "Reimbursements",
      color: "#60a5fa",
    },
  };

  const userIdQuery = useQuery(
    api.users.getUser,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const convexUserId = userIdQuery?.userId;

  const dashboardData = useQuery(
    api.analytics.getDashboardData,
    convexUserId ? { userId: convexUserId } : "skip"
  );

  const monthlyCompostQuery = useQuery(
    api.compost.getMonthlyCompost,
    convexUserId
      ? {
          userId: convexUserId,
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        }
      : "skip"
  );

  const reimbursementsData = useQuery(
    api.reimbursements.getUserReimbursements,
    convexUserId ? { userId: convexUserId } : "skip"
  );

  const registerBin = useMutation(api.bins.registerBin);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleRegister = async () => {
    if (!convexUserId) return;

    await registerBin({
      userId: convexUserId,
      name,
      location,
    });

    setName("");
    setLocation("");
  };

  const formattedReimbursementsData =
    reimbursementsData?.map((entry) => ({
      name: new Date(entry.period).toLocaleString("default", { month: "long" }),
      reimbursement: entry.amount,
    })) || [];

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total Compost</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {dashboardData?.totalCompost ?? 0} kg
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Reimbursements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ₹ {dashboardData?.totalEarned ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Compost</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyCompostQuery ? (
            <ChartContainer config={ChartConfig}>
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      {
                        name: `Month ${new Date().getMonth() + 1}`,
                        compost: monthlyCompostQuery,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      formatter={(value) => `${value} kg`}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="compost" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
                <ChartLegend>
                  <ChartLegendContent>
                    <p>
                      Compost Data for{" "}
                      {new Date().toLocaleString("default", { month: "long" })}
                    </p>
                  </ChartLegendContent>
                </ChartLegend>
              </>
            </ChartContainer>
          ) : (
            <p>Loading monthly compost data...</p>
          )}
        </CardContent>
      </Card>

      {/* Reimbursement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Reimbursements Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {reimbursementsData ? (
            <ChartContainer config={ChartConfig}>
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={formattedReimbursementsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `₹${value}`,
                        "Reimbursement",
                      ]}
                    />
                    <Bar dataKey="reimbursement" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                <ChartLegend>
                  <ChartLegendContent>
                    <p>Total Reimbursements</p>
                  </ChartLegendContent>
                </ChartLegend>
              </>
            </ChartContainer>
          ) : (
            <p>Loading reimbursements data...</p>
          )}
        </CardContent>
      </Card>

      {/* Bin Registration */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Add a New Bin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Bin name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bin location"
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleRegister}>
            Register Bin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
