
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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


export default function DashboardPage() {
  return (
    <div className="w-full">
      <section className="relative w-full h-64 md:h-80">
        <Image
          src="https://placehold.co/1920x400.png"
          alt="Dashboard Banner"
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
          data-ai-hint="eSports tournament banner"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Register for Tournament
          </h1>
        </div>
      </section>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RegistrationInfoCard title="Solo Registration Form" formLink="/register/solo" />
          <RegistrationInfoCard title="Duo Registration Form" formLink="/register/duo" />
          <RegistrationInfoCard title="Squad Registration Form" formLink="/register/squad" />
        </div>
      </main>
    </div>
  );
}
