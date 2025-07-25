import { Gamepad2, ShieldCheck, Trophy } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="py-12 md:py-24">
      <section className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            What is PayFlow?
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            PayFlow is the revolutionary hub for competitive gamers. We provide a seamless and secure platform for tournament payouts, team funding, and content creator support, empowering the entire eSports ecosystem.
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
      </section>
    </main>
  );
}
