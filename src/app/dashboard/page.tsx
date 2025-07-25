
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  memberGameUid: z.string().min(1, { message: "Game UID is required." }),
  inGameName: z.string().min(1, { message: "In-game name is required." }),
  fullName: z.string().min(1, { message: "Full name is required." }),
  upiId: z.string().min(1, { message: "UPI ID is required." }),
  paymentMode: z.enum(["Cash", "Online"]),
  cashCollectorName: z.string().optional(),
});

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberGameUid: "",
      inGameName: "",
      fullName: "",
      upiId: "",
      paymentMode: "Online",
    },
  });

  const paymentMode = form.watch("paymentMode");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values.paymentMode === "Online") {
      router.push('/pay-now');
    } else {
      toast({
        title: "Form Submitted",
        description: "Your reward request has been received.",
      });
      form.reset();
    }
  }

  const handleVerifyEmail = () => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const currentUserEmail = localStorage.getItem("currentUserEmail");
      if (currentUserEmail) {
        const updatedUsers = users.map((user: any) =>
          user.email === currentUserEmail ? { ...user, emailVerified: true } : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        toast({
          title: "Email Verified!",
          description: "Your email has been successfully verified. You can now log in normally.",
        });
      }
    } catch (error) {
      console.error("Failed to verify email:", error);
      toast({
        title: "Verification Failed",
        description: "Could not verify your email. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="w-full">
      <section className="relative w-full h-64 md:h-80">
        <Image
          src="https://placehold.co/1920x400.png"
          alt="Dashboard Banner"
          fill
          style={{objectFit:"cover"}}
          className="z-0"
          data-ai-hint="esports gaming banner"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Claim Your Reward
          </h1>
        </div>
      </section>

      <main className="flex justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl bg-secondary/50 border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reward Collection Form</CardTitle>
            <CardDescription>
              Fill out the form below to receive your reward. Or verify your email if you haven&apos;t.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <Button onClick={handleVerifyEmail} type="button" variant="outline" className="w-full">
                  Verify Email (For Demo Purposes)
                </Button>
                <FormField
                  control={form.control}
                  name="memberGameUid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Game UID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Game UID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inGameName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>In-game Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your in-game name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your UPI ID for rewards" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Payment Mode</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {paymentMode === "Cash" && (
                  <FormField
                    control={form.control}
                    name="cashCollectorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Name</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a name" />
                            </Trigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Pratham">Pratham</SelectItem>
                            <SelectItem value="Jayraj Sinh">Jayraj Sinh</SelectItem>
                            <SelectItem value="Devsinh">Devsinh</SelectItem>
                            <SelectItem value="Umesh">Umesh</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {paymentMode === "Online" && (
                   <div className="p-4 text-center text-muted-foreground border border-dashed rounded-md">
                    Payment Gateway will appear here.
                  </div>
                )}
                
                <Button type="submit" className="w-full font-bold">Submit</Button>
              </CardContent>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
}
