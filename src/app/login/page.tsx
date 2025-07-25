"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-sm bg-secondary/50 border-border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="gamer@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-bold">Login</Button>
          <div className="text-center text-sm">
            <Link href="#" className="underline text-muted-foreground hover:text-primary">
              Forgot your password?
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-primary font-medium hover:text-primary/90">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
