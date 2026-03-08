import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Distributors | A-1 Electricals",
  description:
    "Become a distributor for A-1 Electricals power cable accessories.",
};

const benefits = [
  {
    title: "Comprehensive Product Range",
    description:
      "Access to our full portfolio of cable accessories, from shear bolt connectors to EHV power clamps.",
  },
  {
    title: "Technical Support",
    description:
      "Engineering expertise and application support for product recommendations and specifications.",
  },
  {
    title: "Quality Assurance",
    description:
      "ISO 9001 certified manufacturing with CE & RoHS compliance for international markets.",
  },
];

export default function DistributorsPage() {
  return (
    <>
      <PageHero
        title="Distributors"
        subtitle="Partner with A-1 Electricals for power cable accessories and electrical connectivity solutions."
      />
      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle
            overline="Partnership"
            title="Distribution Network"
            subtitle="We work with distributors across regions. Get in touch to explore distribution opportunities."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 h-full hover:border-[var(--accent)]/30 transition-all duration-400">
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--foreground)] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 text-center">
            <p className="text-[var(--muted)] leading-relaxed mb-8 max-w-xl mx-auto">
              If you are interested in becoming a distributor for A-1 Electricals
              products, please reach out with your company details and region.
            </p>
            <Button href="/contact" data-magnetic>
              Contact Us
            </Button>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
