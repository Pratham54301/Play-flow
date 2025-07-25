"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Wallet className="h-6 w-6" />
          <span>PayFlow</span>
        </Link>
      </div>
    </header>
  );
}
