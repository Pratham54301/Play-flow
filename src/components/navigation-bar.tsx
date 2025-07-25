
"use client";

import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NavigationBar() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Gamepad2 className="h-6 w-6" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            PlayFlow
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/#home">Home</Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/#tournaments">Tournament</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
