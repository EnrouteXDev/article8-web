import { Container } from "@/components/ui/container";

const products = [
  {
    name: "Signal",
    summary:
      "A turnkey newsroom-in-a-box for founders: weekly dispatches, podcast-ready scripts, and launch films in a 12-week sprint.",
  },
  {
    name: "Orbit",
    summary:
      "Serialized docu-style episodes paired with interactive hubs that keep enterprise audiences engaged all quarter long.",
  },
  {
    name: "Beacon",
    summary:
      "Executive visibility program that blends keynote scripting, live-stream broadcast, and social-ready documentaries.",
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="border-b border-foreground/10 bg-background py-16 sm:py-24">
      <Container className="space-y-10">
        <div className="max-w-xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Products
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready-to-run storytelling systems engineered for busy teams.
          </h2>
          <p className="text-base text-foreground/70 sm:text-lg">
            Pick the production kit that fits your launch moment and we&apos;ll plug the right talent into it.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="space-y-3 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-brand">{product.name}</h3>
              <p className="text-sm text-foreground/70">{product.summary}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
