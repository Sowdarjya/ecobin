"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/../convex/_generated/dataModel";

type Bin = {
  _id: Id<"bins">;
  name: string;
};

export default function LogCompostPage() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.getUser, {
    clerkId: user?.id || "skip",
  });
  const bins = useQuery(
    api.bins.getUserBins,
    currentUser ? { userId: currentUser._id } : "skip"
  ) as Bin[] | undefined;
  const logCompost = useMutation(api.compost.logCompost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (!currentUser) {
      alert("Please sign in to log compost");
      return;
    }

    try {
      await logCompost({
        userId: currentUser._id,
        binId: form.binId.value as Id<"bins">,
        amount: Number(form.amount.value),
      });
      alert("Compost logged successfully!");
      form.reset();
    } catch (error) {
      console.error("Failed to log compost:", error);
      alert("An error occurred while logging compost. Please try again.");
    }
  };

  if (!user) return <div className="p-6">Please sign in to log compost</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <div>
        <Label htmlFor="binId">Select Bin</Label>
        <Select
          onValueChange={(value) => {
            const input = document.getElementById(
              "binIdInput"
            ) as HTMLInputElement;
            if (input) input.value = value;
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select bin" />
          </SelectTrigger>
          <SelectContent>
            {bins && bins.length > 0 ? (
              bins.map((bin) => (
                <SelectItem key={bin._id} value={bin._id}>
                  {bin.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-bins" disabled>
                No bins available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <input type="hidden" id="binIdInput" name="binId" required />
      </div>

      <div>
        <Label htmlFor="amount">Compost Generated (kg)</Label>
        <Input id="amount" name="amount" type="number" step="0.1" required />
      </div>

      <Button type="submit">Log Compost</Button>
    </form>
  );
}
