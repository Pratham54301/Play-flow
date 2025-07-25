import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 12.87c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zm2.4 0c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2z" />
      <path d="M15.23 7.23s-.47-.53-1.09-.76c.03-.05.05-.1.08-.15.35-.47.65-1.12.65-1.12s-.71-.05-1.61.64c-1.35-.38-2.7-.38-4.05 0-.9-.69-1.61-.64-1.61-.64s.3.65.65 1.12c.03.05.05.1.08.15-.62.23-1.09.76-1.09.76s-1.88 2.65-2.22 6.63c2.05 1.2 4.1 1.2 4.1 1.2H12s2.05 0 4.1-1.2c-.34-3.98-2.22-6.63-2.22-6.63z" />
    </svg>
  );

export default function ContactPage() {
  return (
    <main className="py-12 md:py-24">
      <section className="container mx-auto px-4">
        <Card className="max-w-xl mx-auto bg-secondary/50 border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold">Get In Touch</CardTitle>
            <CardDescription>
              Have questions or feedback? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full font-bold">
                Send Message
              </Button>
            </form>
            <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
                <div className="flex justify-center gap-6">
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-6 w-6" />
                        <span className="sr-only">X</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <DiscordIcon className="h-6 w-6" />
                        <span className="sr-only">Discord</span>
                    </Link>
                </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
