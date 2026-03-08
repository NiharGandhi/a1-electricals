import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata = {
  title: "News & Events | A-1 Electricals",
  description: "Latest news and events from A-1 Electricals.",
};

const events = [
  {
    title: "T&D Magazine Feature",
    date: "2024",
    description:
      "Janki Vachhani, Director, featured in Transmission & Distribution Magazine discussing A-1 Electricals' engineering expertise and product innovations.",
  },
  {
    title: "Industry Participation",
    date: "Ongoing",
    description:
      "Active participation in power sector exhibitions and trade events across India and international markets.",
  },
  {
    title: "Product Range Expansion",
    date: "2025",
    description:
      "Launch of the comprehensive Grid Solution Catalogue covering EHV power clamps, shear bolt connectors, and expanded substation accessories range.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Updates and highlights from A-1 Electricals."
      />
      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle
            overline="Updates"
            title="Latest News"
            subtitle="Stay informed about our company and industry presence."
          />
          <div className="mt-14 space-y-6 max-w-3xl mx-auto">
            {events.map((event, i) => (
              <ScrollReveal key={event.title} delay={i * 0.1}>
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 hover:border-[var(--accent)]/30 transition-all duration-400">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      {event.date}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] tracking-wide">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed">
                    {event.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
