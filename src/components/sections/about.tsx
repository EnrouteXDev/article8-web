import Image from "next/image";

import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24 sm:px-16" id="about">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h2 className="text-5xl font-black leading-tight text-brand sm:text-6xl lg:text-7xl">
            About the
            <br />
            Studio
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-black sm:text-xl">
            We don&apos;t just make visuals, we build worlds. Article8 Media Studio is where design meets motion, and
            brands step into 3D storytelling that demands attention.
          </p>
          <div>
            <Button
              size="lg"
              className="rounded-lg bg-brand px-6 py-4 text-base font-semibold text-white transition-all hover:bg-brand/90"
            >
              Read More
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-20%20at%201.36.52%E2%80%AFAM-oECUEQEIuOJI016QXIQnETL4DuMi7H.png"
              alt="3D rendered figures with cross symbols in green tones"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
