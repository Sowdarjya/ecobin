import ThemeToggler from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return (
    <div>
      Home
      <SignedOut>
        <SignInButton>
          <Button variant="secondary"> Sign in </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <ThemeToggler />
    </div>
  );
};

export default Home;
