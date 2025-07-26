
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Gamepad2, Mail, MapPin, Phone, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

function RegistrationInfoCard({ title, formLink }: { title: string, formLink: string }) {
  return (
    <Card className="bg-secondary/50 border-border text-center hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground space-y-2">
          <p className="font-semibold">Date: 04/10/2025</p>
          <p className="font-semibold">Timing: 7:00 PM</p>
        </div>
        <Button asChild className="w-full font-bold transition-transform transform hover:scale-105">
          <Link href={formLink}>Registration</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

const soloLeaderboardData = [
  { rank: 1, name: 'ShadowStriker', played: 150, wins: 120, losses: 30, points: 4500 },
  { rank: 2, name: 'Viper', played: 145, wins: 115, losses: 30, points: 4300 },
  { rank: 3, name: 'Phoenix', played: 160, wins: 110, losses: 50, points: 4100 },
  { rank: 4, name: 'Ghost', played: 130, wins: 100, losses: 30, points: 3800 },
  { rank: 5, name: 'Reaper', played: 155, wins: 95, losses: 60, points: 3600 },
];

const duoLeaderboardData = [
  { rank: 1, name: 'Thunder & Bolt', played: 120, wins: 100, losses: 20, points: 5200 },
  { rank: 2, name: 'Fire & Ice', played: 115, wins: 95, losses: 20, points: 4900 },
  { rank: 3, name: 'Night & Day', played: 130, wins: 90, losses: 40, points: 4600 },
  { rank: 4, name: 'Salt & Pepper', played: 125, wins: 85, losses: 40, points: 4300 },
  { rank: 5, name: 'Yin & Yang', played: 110, wins: 80, losses: 30, points: 4000 },
];

const squadLeaderboardData = [
  { rank: 1, name: 'The Titans', played: 100, wins: 90, losses: 10, points: 6000 },
  { rank: 2, name: 'Apex Predators', played: 95, wins: 85, losses: 10, points: 5700 },
  { rank: 3, name: 'Cyber Warriors', played: 105, wins: 80, losses: 25, points: 5400 },
  { rank: 4, name: 'Dragon Slayers', played: 90, wins: 75, losses: 15, points: 5100 },
  { rank: 5, name: 'Ghost Platoon', played: 110, wins: 70, losses: 40, points: 4800 },
];


export default function Home() {
  const [leaderboardMode, setLeaderboardMode] = useState('Solo');

  const leaderboardData = {
    Solo: soloLeaderboardData,
    Duo: duoLeaderboardData,
    Squad: squadLeaderboardData,
  }[leaderboardMode] || [];

  return (
    <>
      <section id="home" className="relative flex h-screen w-full items-center justify-center text-center">
        <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero Background"
            fill
            className="object-cover -z-10"
            data-ai-hint="gaming esports"
        />
        <div className="absolute inset-0 bg-background/60 -z-10" />
        <div className="container px-4 py-16">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-foreground">
                Welcome to PlayFlow
                </h1>
                <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground md:text-xl">
                The ultimate platform for eSports payments and tournaments. Join today and start your journey to the top.
                </p>
            </div>
        </div>
      </section>

      <section id="tournaments" className="py-12 md:py-24 bg-background">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                Register for a Tournament
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Choose your format and sign up to compete against the best.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <RegistrationInfoCard title="Solo Registration Form" formLink="/register/solo" />
              <RegistrationInfoCard title="Duo Registration Form" formLink="/register/duo" />
              <RegistrationInfoCard title="Squad Registration Form" formLink="/register/squad" />
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

      <section id="leaderboard" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              Leaderboard
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Check out the top players and teams dominating the competition.
            </p>
          </div>
          <div className="max-w-md mx-auto mb-8">
            <Select onValueChange={(value) => setLeaderboardMode(value)} defaultValue={leaderboardMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Solo">Solo</SelectItem>
                <SelectItem value="Duo">Duo</SelectItem>
                <SelectItem value="Squad">Squad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-secondary/50 border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Rank</TableHead>
                  <TableHead>Player Name</TableHead>
                  <TableHead className="text-center">Matches</TableHead>
                  <TableHead className="text-center">Wins</TableHead>
                  <TableHead className="text-center">Losses</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((player) => (
                  <TableRow key={player.rank} className="hover:bg-accent/50">
                    <TableCell className="font-medium text-center">{player.rank}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-center">{player.played}</TableCell>
                    <TableCell className="text-center">{player.wins}</TableCell>
                    <TableCell className="text-center">{player.losses}</TableCell>
                    <TableCell className="text-right">{player.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                Got a question, feedback, or just want to say hi? Our team is ready to assist you. Use the contact details below. We're here to help you dominate the game.
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
                <div className="space-y-4 text-center">
                    <h3 className="text-2xl font-bold">Have a question?</h3>
                    <p className="text-muted-foreground">We are here to help!</p>
                    <Button asChild size="lg">
                        <Link href="mailto:bhatidevsinh@gmail.com">Email Us</Link>
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
