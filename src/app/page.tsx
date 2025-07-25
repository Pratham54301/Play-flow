import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint="Free Fire gameplay"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="container relative z-20 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-white">
            Welcome to PayFlow
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
  );
}
