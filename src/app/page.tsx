import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-grid-white/[0.05] z-0"></div>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e33e620,transparent)] z-10"
      ></div>
      <div className="container relative z-20 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            UNLEASH THE FLOW
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground md:text-xl">
            The ultimate eSports platform for seamless payments, competitive tournaments, and gamer rewards.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transition-transform transform hover:scale-105">
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
