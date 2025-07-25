import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="py-12 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-primary">
              Contact
            </h1>
            <h2 className="text-3xl font-bold">
              Level up your support.
            </h2>
            <p className="text-muted-foreground text-lg">
              Got a question, feedback, or just want to say hi? Our team is ready to assist you. Fill out the form or use the contact details below. We're here to help you dominate the game.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-lg">support@payflow.gg</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-lg">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-lg">123 Gaming Lane, eSports City, 90210</span>
              </div>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Open Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="bg-secondary/50 p-8 rounded-lg border border-border">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={6} />
              </div>
              <Button type="submit" className="w-full font-bold bg-[#ff8c00] hover:bg-[#ff8c00]/90 text-black">
                Submit Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
