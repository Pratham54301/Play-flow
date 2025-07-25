
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  emailVerified: z.literal(true, {
    errorMap: () => ({ message: "You must confirm your email is verified." }),
  }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      emailVerified: false,
    },
  });

  const isEmailVerified = form.watch("emailVerified");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === values.email && u.password === values.password
    );

    if (!user) {
        toast({
          title: "Not Registered",
          description: "You haven't joined yet. Please register first.",
          variant: "destructive",
        });
        router.push("/signup");
        return;
    }

    localStorage.setItem("currentUserEmail", user.email);

    if (!user.emailVerified) {
      toast({
        title: "Email Not Verified",
        description: "Please verify your email to continue. We've sent you to the dashboard to do so.",
        variant: "destructive",
      });
      router.push("/dashboard");
      return;
    }
    
    toast({
      title: "Logged In",
      description: "Welcome back! Redirecting...",
    });
    router.push("/dashboard");
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-sm bg-secondary/50 border-border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="gamer@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm my email is verified
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full font-bold" disabled={!isEmailVerified}>Login</Button>
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
          </form>
        </Form>
      </Card>
    </main>
  );
}
