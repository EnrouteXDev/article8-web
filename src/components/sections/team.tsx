import Image from "next/image";

const teamGroups = [
  {
    label: "Pre-Prod",
    alt: "Storyboard artist reviewing sketches on a wall",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Production",
    alt: "Camera operator filming on a soundstage",
    image:
      "https://images.unsplash.com/photo-1522199994200-7b3f9bca0e1b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Post-Prod",
    alt: "Editor working with animation rigs on a workstation",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Managerial",
    alt: "Creative leads collaborating in a meeting",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
];

export function TeamSection() {
  return (
    <section className="bg-[#F5F5F5] py-24 " id="team">
      <div className="mx-auto flex w-full  flex-col gap-16">
        <h2 className="text-center text-5xl font-black uppercase tracking-tight text-brand sm:text-6xl lg:text-7xl">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {teamGroups.map((group) => (
            <article
              key={group.label}
              className="group relative aspect-[361/488] cursor-pointer overflow-hidden transition-all duration-300 "
            >
              <Image
                src={group.image}
                alt={group.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-[1.03] "
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black to-60% opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-x-0 bottom-0 p-10 text-center uppercase"> 
                <h3 className="text-xl font-bold text-white">{group.label}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
