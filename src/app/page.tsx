"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Leaf, Recycle, Trash2, TreePine, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen text-white px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to EcoBin</h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          Revolutionizing waste management by collecting all types of waste and
          turning organic waste into valuable compost.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <Card className="">
          <CardHeader>
            <Leaf className="text-green-400 h-6 w-6" />
            <CardTitle>Organic Waste to Compost</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We efficiently convert food scraps, leaves, and biodegradable
              waste into rich compost for agricultural use.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <Recycle className="text-blue-400 h-6 w-6" />
            <CardTitle>Recycle Everything</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              From plastics to electronics, EcoBin ensures responsible recycling
              to reduce landfill waste.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <Trash2 className="text-red-400 h-6 w-6" />
            <CardTitle>Smart Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Smart bins and schedules make waste disposal effortless and
              eco-friendly.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-12 bg-zinc-700" />

      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">Why Choose EcoBin?</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Our mission is to create a sustainable world by reducing waste and
          promoting eco-conscious living.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-16">
        <Card className="">
          <CardHeader>
            <TreePine className="text-emerald-500 h-6 w-6" />
            <CardTitle>Eco-Friendly Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Each bin placement contributes to a greener planet and educates
              communities about sustainable habits.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <Sparkles className="text-yellow-400 h-6 w-6" />
            <CardTitle>Rewards for Recyclers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Earn points and reimbursements for your contributions towards a
              cleaner environment.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Home;
