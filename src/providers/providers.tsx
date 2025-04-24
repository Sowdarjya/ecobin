"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ConvexProvider client={convex}>
          <Navbar />
          {children}
        </ConvexProvider>
      </ThemeProvider>
    </ConvexClerkProvider>
  );
}

export default Providers;
