"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggler from "./ThemeToggler";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { AlignRight } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-xl font-bold text-primary font-mono tracking-wider"
          >
            EcoBin
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {isSignedIn ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <SignOutButton>
                    <Button variant="outline" className="hover:cursor-pointer">
                      Log out
                    </Button>
                  </SignOutButton>
                </>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="outline" className="hover:cursor-pointer">
                    Sign in
                  </Button>
                </SignInButton>
              )}
            </div>

            <ThemeToggler />

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:cursor-pointer"
                  >
                    <AlignRight className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="px-5">
                  <div className="flex flex-col gap-4 mt-8">
                    {isSignedIn ? (
                      <>
                        <Link href="/dashboard" className="text-center">
                          Dashboard
                        </Link>
                        <SignOutButton>
                          <Button variant="outline" className="cursor-pointer">
                            Log out
                          </Button>
                        </SignOutButton>
                      </>
                    ) : (
                      <SignInButton mode="modal">
                        <Button className="cursor-pointer">Sign in</Button>
                      </SignInButton>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
