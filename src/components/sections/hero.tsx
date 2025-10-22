import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-[#F5F5F5] font-display">
      <div className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col items-start justify-center px-6 py-24 sm:px-16">
        <h2 className="mb-4 text-2xl font-medium text-brand ">Coming Soon to your screens</h2>
        <h1 className="mb-12 text-[clamp(5.5rem,18vw,12rem)] font-black uppercase leading-none tracking-tight text-brand font-display">
          Skyfall
        </h1>
        <div className="flex flex-wrap gap-6">
          <Button
            variant="outline"
            size="lg"
            className="rounded-lg border-2 border-brand bg-transparent px-6 py-4 text-base font-semibold text-brand transition-all hover:bg-brand hover:text-white"
          >
            Watch Showreel
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-lg border-2 border-brand bg-transparent px-6 py-4 text-base font-semibold text-brand transition-all hover:bg-brand hover:text-white"
          >
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
}
