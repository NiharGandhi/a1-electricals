import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import Link from "next/link";

export const metadata = {
  title: "About A-1 Electricals | Cable Accessories Manufacturer Since 2006",
  description:
    "A-1 Electricals — ISO 9001:2015 certified manufacturer of power cable accessories since 2006. Serving utilities, EPC contractors, and OEMs with CE & RoHS compliant products from Rajkot, Gujarat, India.",
  openGraph: {
    title: "About A-1 Electricals | Cable Accessories Manufacturer Since 2006",
    description:
      "ISO 9001 certified manufacturer of shear bolt lugs, EHV connectors, cable glands, and busbars. CE & RoHS compliant. Rajkot, India.",
    images: [{ url: "/landing.png", width: 1200, height: 630, alt: "A-1 Electricals" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    images: ["/landing.png"],
  },
  alternates: { canonical: "https://www.a1electricals.com/about" },
};

const pillars = [
  {
    n: "01",
    title: "Engineering Precision",
    body: "Designed to BS, DIN, and IS standards. Tested per IEC — ensuring consistent electrical performance and mechanical integrity across every product.",
  },
  {
    n: "02",
    title: "Quality Management",
    body: "ISO 9001:2015 certified. Strict control over raw materials, manufacturing, dimensional accuracy, and final inspection with full traceability.",
  },
  {
    n: "03",
    title: "Global Compliance",
    body: "CE & RoHS compliant across our range. Suitable for international projects and export markets where regulatory and environmental standards are non-negotiable.",
  },
  {
    n: "04",
    title: "Manufacturing Flexibility",
    body: "Strong in-house OEM and custom engineering capability. Tailor-made components for switchgear, transformers, and electrical equipment with competitive lead times.",
  },
];

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

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About A-1 Electricals"
        subtitle="20 years of engineering reliability for power & energy infrastructure."
      />

      {/* ── LIGHT: Stats + Overview ───────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border)]">
        <Container>
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[var(--border)] divide-x divide-[var(--border)] mb-16">
            {[
              { value: "20+", label: "Years in Business" },
              { value: "500+", label: "Product Variants" },
              { value: "550 kV", label: "Max Voltage Rating" },
              { value: "ISO 9001", label: "Quality Certified" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6">
                <p className="display text-[var(--foreground)]" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
                  {s.value}
                </p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Overview text */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 items-start">
            <div>
              <p className="eyebrow mb-5">Our Company</p>
              <h2 className="display text-[var(--foreground)]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Two Decades of Powering Connectivity
              </h2>
              <div className="mt-6 w-full h-px bg-[var(--border)]" />
              <p className="mt-7 text-[var(--muted-light)] leading-relaxed text-base">
                Founded in 2006, A-1 Electricals has spent over 20 years engineering cable accessories that utilities, EPC contractors, OEMs, and infrastructure developers worldwide can rely on.
              </p>
              <p className="mt-4 text-[var(--muted)] leading-relaxed text-sm">
                From high-voltage substation connectors rated to 550 kV, to precision cable glands for industrial installations — every product reflects our commitment to engineering integrity, compliance, and manufacturing excellence.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["ISO 9001:2015", "CE Certified", "RoHS Compliant", "IEC 61238-1", "TÜV Certified", "FIEO Member"].map((c) => (
                  <span key={c} className="border border-[var(--border)] px-3 py-1.5 text-[10px] font-mono font-medium text-[var(--muted)] uppercase tracking-wider">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Director note */}
            <div className="border-t-[3px] border-[var(--accent)] pt-8">
              <p className="eyebrow-muted mb-6">Director&apos;s Note</p>
              <p className="text-[var(--foreground)] leading-relaxed text-lg font-light">
                &ldquo;A-1 Electricals has extensive application engineering experience for all of our products and can therefore ensure the product recommendations and the products supplied are entirely fit for purpose — and provide a lifetime trouble-free service.&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-4">
                <div className="h-10 w-10 border border-[var(--border)] bg-[var(--background-secondary)] flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] font-bold text-[var(--accent)]">JV</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Janki Vachhani</p>
                  <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider mt-0.5">Director · Featured in T&amp;D Magazine</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── DARK: Core Pillars ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--dark)]">
        <Container>
          <div className="mb-14">
            <p className="eyebrow-light mb-4">What Drives Us</p>
            <h2 className="display text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Built on Four Core Pillars
            </h2>
          </div>

          <div className="grid gap-0 sm:grid-cols-2 sm:divide-x divide-white/8 border border-white/8">
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className={`p-8 ${i < 2 ? "border-b border-white/8" : ""}`}
              >
                <span className="font-mono text-[10px] tracking-widest text-[var(--accent)] block mb-5">{p.n}</span>
                <h3 className="text-base font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed font-light">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── LIGHT: Product Range ─────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-[var(--border)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20 items-start">
            <div>
              <p className="eyebrow mb-5">Our Range</p>
              <h2 className="display text-[var(--foreground)]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                Comprehensive Product Portfolio
              </h2>
              <div className="mt-6 w-full h-px bg-[var(--border)]" />
              <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
                A full range of power cable accessories engineered for every stage of the power delivery chain — from generation to the last mile.
              </p>
              <Link href="/products" className="btn-primary mt-8 inline-flex">
                View All Products
              </Link>
            </div>

            <div className="border border-[var(--border)]">
              {productRange.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-start gap-4 px-5 py-4 ${i < productRange.length - 1 ? "border-b border-[var(--border)]" : ""}`}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted-light)] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── DARK: CTA ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--dark)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="block w-8 h-[2px] bg-[var(--accent)] mb-6" />
              <h2 className="display text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)" }}>
                Partner with A-1 Electricals
              </h2>
              <p className="mt-3 text-white/45 text-sm leading-relaxed font-light max-w-md">
                Trusted by utilities, EPC contractors, and OEMs globally. Talk to our engineering team about product selection, specifications, or custom solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/inquiry" className="btn-primary">Submit Inquiry</Link>
              <Link href="/contact" className="btn-ghost-light">Contact Us</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
