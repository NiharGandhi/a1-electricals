import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata = {
  title: "About Us | A-1 Electricals",
  description:
    "A-1 Electricals – leading manufacturer of cable accessories and electrical connectivity solutions since 2006.",
};

const productRange = [
  "Shear Bolt Cable Lugs and Connectors",
  "Substation Aluminium Compression & Bolted Connectors",
  "Copper, Aluminium & Bimetallic Cable Lugs and Connectors",
  "Aluminium and Polyamide Cable Cleats",
  "Cable Terminations and Joints",
  "Brass Industrial Cable Glands and Accessories",
  "Flexible Copper Braids and Laminated / Solid Busbars",
  "Tailor-Made Components for Switchgear, Transformers & Electrical Equipment",
];

const highlights = [
  {
    title: "Engineering Precision",
    text: "Products engineered in accordance with BS, DIN, and IS design standards and tested per applicable IEC standards, ensuring consistent electrical performance and mechanical integrity.",
  },
  {
    title: "Quality Management",
    text: "ISO 9001 certified Quality Management System ensuring strict control over raw materials, manufacturing processes, dimensional accuracy, and final inspection with emphasis on traceability and continuous improvement.",
  },
  {
    title: "Global Compliance",
    text: "CE & RoHS compliant products suitable for international projects and export markets where regulatory compliance, safety, and environmental responsibility are critical.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About A-1 Electricals"
        subtitle="Reliable cable accessory solutions for power & energy infrastructure since 2006."
      />

      {/* Company overview */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-[var(--muted-light)] leading-relaxed text-lg">
                  A-1 Electricals is a leading manufacturer of high-quality cable
                  accessories and electrical connectivity solutions, serving
                  utilities, EPC contractors, OEMs, and infrastructure developers
                  across power, transmission, distribution, renewable energy, and
                  industrial sectors.
                </p>
                <p className="text-[var(--muted)] leading-relaxed">
                  With strong in-house manufacturing capabilities and a focus on
                  engineering precision, A-1 Electricals designs and produces a
                  comprehensive range of products. Driven by engineering expertise,
                  manufacturing flexibility, and customer-focused solutions, we are
                  a trusted partner for reliable cable management, termination, and
                  connectivity solutions.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
                <span className="text-[var(--accent)] font-medium text-xs uppercase tracking-[0.2em]">
                  Director&apos;s Note
                </span>
                <p className="mt-1 text-[var(--foreground)] font-[family-name:var(--font-display)] text-xl tracking-wide">
                  Janki Vachhani, Director
                </p>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">
                  &ldquo;A-1 Electricals has extensive application engineering
                  experience for all of our products and can therefore ensure the
                  product recommendations and the products supplied are entirely fit
                  for purpose – and provide a lifetime trouble-free service.&rdquo;
                </p>
                <p className="mt-3 text-xs text-[var(--muted)]/60">
                  Featured in T&D Magazine
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 h-full">
                  <span className="font-[family-name:var(--font-display)] text-5xl text-[var(--accent)]/15 leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Product range */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle
            overline="Our Range"
            title="Comprehensive Product Portfolio"
            subtitle="Full range of power cable accessories and OEM solutions."
          />
          <ScrollReveal className="mt-14">
            <ul className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
              {productRange.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[var(--muted)] py-2"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
