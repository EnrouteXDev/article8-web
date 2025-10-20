import Image from "next/image";

export function ArtifactsSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24 sm:px-16" id="artifacts">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <h2 className="text-center text-5xl font-black uppercase tracking-tight text-brand sm:text-6xl lg:text-7xl">
          Artifacts
        </h2>
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-20%20at%201.37.01%E2%80%AFAM-oVPcO3wDniwBNISIPxaS1F2OQyK2S6.png"
                alt="Three cartoon children running together"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 text-base leading-relaxed text-brand sm:text-lg">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
              hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te
              feugait nulla facilisi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
