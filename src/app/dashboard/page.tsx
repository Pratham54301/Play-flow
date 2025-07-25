
"use client";

import Image from "next/image";
import RegistrationCard from "@/components/registration-card";

export default function DashboardPage() {
  return (
    <div>
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
          <RegistrationCard type="Solo" />
          <RegistrationCard type="Duo" />
          <RegistrationCard type="Squad" />
        </div>
      </main>
    </div>
  );
}
