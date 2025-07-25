
"use client";

import { Gamepad2, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { useState } from "react";

export default function NavigationBar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
          onClick={closeSheet}
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
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col gap-4 py-8">
                <SheetClose asChild>
                  <Link href="/#home" className="text-lg font-medium">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#tournaments" className="text-lg font-medium">Tournament</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#about" className="text-lg font-medium">About</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#contact" className="text-lg font-medium">Contact</Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
