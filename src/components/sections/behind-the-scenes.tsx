import Image from "next/image";

const behindSceneImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/behind-scenes-title-uNz18Y53bP4e9D3HTVyN1EHL64xAcv.png",
    alt: "Behind the scenes title graphic",
    aspect: "aspect-[5/3]",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/behind-scenes-rigging-X1ZlCtg8jJcZfNqkL4jyvC9rUpRuvH.png",
    alt: "3D rigging model pose",
    aspect: "aspect-square",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/behind-scenes-avatar-frames-VPoQl6usI1wtnYGn0Iwo7kNwsBMXRO.png",
    alt: "Blue avatar character progression",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/behind-scenes-kids-W31hdoGplRc8s0Pq57wKlxQvRhCGth.png",
    alt: "Animated kids drawing character",
    aspect: "aspect-[5/3]",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/behind-scenes-director-G0kqp3z2ijKha0oSWe24MPm8FyPB3q.png",
    alt: "Animated director smiling",
    aspect: "aspect-[5/3]",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/behind-scenes-animation-progress-4V5mtN8nWQ6WbV49Hn4yLakUqccOnL.png",
    alt: "Animation progress on screen",
    aspect: "aspect-[5/3]",
  },
];

export function BehindTheScenesSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24 sm:px-16" id="behind-the-scenes">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className="text-center">
          <h2 className="section-heading text-brand uppercase">
            Behind the Scene
          </h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-wide text-brand">
            Inside the Process
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {behindSceneImages.map((image) => (
            <div key={image.src} className={`relative overflow-hidden rounded-3xl ${image.aspect}`}>
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
