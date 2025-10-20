import { Container } from "@/components/ui/container";

const services = [
  {
    title: "Editorial & Journalism",
    description:
      "Longform storytelling, investigative reporting, and recurring newsletters that deepen audience trust.",
  },
  {
    title: "Video & Documentary",
    description:
      "Full-service production for short and midform film, branded content, and immersive digital stories.",
  },
  {
    title: "Content Strategy",
    description:
      "Research-driven content systems and campaign roadmaps built to scale across channels and teams.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-foreground/10 bg-background py-16 sm:py-24">
      <Container className="space-y-10">
        <div className="max-w-xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Services
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From pitch to publish, we work as embedded storytellers for your team.
          </h2>
          <p className="text-base text-foreground/70 sm:text-lg">
            Every engagement pairs seasoned journalists with producers, ensuring rigorous reporting and cinematic craft.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="space-y-3 rounded-2xl border border-foreground/10 bg-background/60 p-6 shadow-sm shadow-foreground/5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-foreground/70">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
