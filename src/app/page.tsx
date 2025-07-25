
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Gamepad2, Mail, MapPin, Phone, ShieldCheck, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onContactSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center text-center">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Background"
          fill
          objectFit="cover"
          className="z-0"
          data-ai-hint="Free Fire gameplay"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="container relative z-20 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-white">
              Welcome to PlayFlow
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-300 md:text-xl">
              Power your gaming journey with secure payments
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transition-transform transform hover:scale-105">
                <Link href="/signup">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              What is PlayFlow?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              PlayFlow is the revolutionary hub for competitive gamers. We provide a seamless and secure platform for tournament payouts, team funding, and content creator support, empowering the entire eSports ecosystem.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 border border-border rounded-lg bg-secondary/50">
              <Trophy className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Competitive Hub</h3>
              <p className="mt-2 text-muted-foreground">
                Join exclusive tournaments, challenge top players, and win real cash prizes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-border rounded-lg bg-secondary/50">
              <ShieldCheck className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Secure Transactions</h3>
              <p className="mt-2 text-muted-foreground">
                Instant, secure, and transparent payments so you can focus on the game.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-border rounded-lg bg-secondary/50">
              <Gamepad2 className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">For Gamers, By Gamers</h3>
              <p className="mt-2 text-muted-foreground">
                Built by a team of passionate gamers who understand the needs of the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-primary">
                Contact
              </h2>
              <h3 className="text-3xl font-bold">
                Level up your support.
              </h3>
              <p className="text-muted-foreground text-lg">
                Got a question, feedback, or just want to say hi? Our team is ready to assist you. Fill out the form or use the contact details below. We're here to help you dominate the game.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="text-lg">bhatidevsinh@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <span className="text-lg">+91 9998467204</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="text-lg">Ahmedabad, Gujarat</span>
                </div>
              </div>
              <Link href="https://www.google.com/maps/search/?api=1&query=Ahmedabad,Gujarat" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Open Map <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="bg-secondary/50 p-8 rounded-lg border border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this about?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full font-bold bg-[#ff8c00] hover:bg-[#ff8c00]/90 text-black">
                    Submit Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
