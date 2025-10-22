import Image from "next/image";

import { Button } from "@/components/ui/button";
export function AboutSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24 sm:px-16 font-display" id="about">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h2 className="section-heading text-brand">
            About the
            <br />
            Studio
          </h2>
            <p className="max-w-xl text-lg leading-relaxed text-black sm:text-xl">
            At our core, we are committed to projecting Africa through a global lens telling stories that transcend borders while staying deeply rooted in the continent’s cultural essence. 
            </p>
            <p className="max-w-xl text-lg leading-relaxed text-black sm:text-xl">
              We strive to redefine how African narratives are experienced, merging traditional heritage with modern storytelling to create animation that captivate audiences everywhere. 
            </p>
          <div>
            <Button
              size="md"
              className="rounded-lg bg-brand px-6 py-4 text-base font-semibold text-white transition-all hover:bg-brand/90"
            >
              Read More
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="/hero.jpg"
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
