
"use client";

import { Gamepad2, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface UserData {
  fullname: string;
  email: string;
  gameName: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
}

export default function NavigationBar() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This effect will run on the client side, so window and localStorage are available.
    const checkUser = () => {
      const userEmail = localStorage.getItem("currentUserEmail");
      if (userEmail) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const currentUser = users.find((u: any) => u.email === userEmail);
        if (currentUser) {
          setUser({
            ...currentUser,
            // Mock data for game stats
            gameName: "ProGamer123",
            matchesPlayed: 125,
            matchesWon: 90,
            matchesLost: 35,
          });
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Listen for storage changes to update the navbar in real-time
    // This is useful if login/logout happens in another tab
    window.addEventListener('storage', checkUser);
    
    // We also need a custom event listener because `storage` event doesn't fire for the same tab.
    window.addEventListener('authChange', checkUser);

    return () => {
        window.removeEventListener('storage', checkUser);
        window.removeEventListener('authChange', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
     // Dispatch event to notify other components on the same page
    window.dispatchEvent(new CustomEvent('authChange'));
    router.push("/");
  };

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
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" alt={user.fullname} data-ai-hint="gamer avatar" />
                    <AvatarFallback>{user.fullname.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.fullname}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem className="flex justify-between">
                  <span>Game Name</span>
                  <span>{user.gameName}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between">
                  <span>Matches Played</span>
                  <span>{user.matchesPlayed}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between">
                  <span>Matches Won</span>
                  <span>{user.matchesWon}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between">
                  <span>Matches Lost</span>
                  <span>{user.matchesLost}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
