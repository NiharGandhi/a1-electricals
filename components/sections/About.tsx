import { Container } from "@/components/ui/Container";
import Link from "next/link";

const pillars = [
  {
    n: "01",
    title: "Engineering Precision",
    body: "Every product designed and manufactured to BS, DIN, and IS standards — tested against IEC specifications for consistent electrical performance and long-term mechanical integrity.",
  },
  {
    n: "02",
    title: "Rigorous Quality Control",
    body: "ISO 9001:2015 QMS governs raw material intake, production, dimensional control, and final inspection — with full traceability at every stage.",
  },
  {
    n: "03",
    title: "Global Compliance",
    body: "CE & RoHS compliance across the entire range makes our accessories ready for international projects where safety and environmental standards are non-negotiable.",
  },
  {
    n: "04",
    title: "Custom Manufacturing",
    body: "Strong in-house machining and casting capabilities deliver standard catalogue products and fully tailor-made components for switchgear, transformers, and OEM equipment.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--dark)]">
      <Container>

        {/* ── Two-column: sticky heading + numbered pillars ── */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start mb-20">

          {/* Left sticky */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <p className="eyebrow-light">About the Company</p>
            <h2
              className="display text-white"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              Powering Infrastructure
              <br />
              <span style={{ color: "var(--accent)" }}>Since 2006.</span>
            </h2>
            <p className="text-base font-light leading-relaxed text-white/45 max-w-sm">
              A-1 Electricals is a leading manufacturer of cable accessories and
              electrical connectivity solutions, serving utilities, EPC contractors,
              OEMs, and infrastructure developers across power, transmission,
              renewable energy, and industrial sectors.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/about" className="btn-ghost-light">Our Story</Link>
              <Link href="/products" className="btn-primary">
                View Products
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: flat numbered pillar list */}
          <div className="flex flex-col divide-y divide-white/8">
            {pillars.map((p) => (
              <div key={p.n} className="flex gap-6 py-8">
                <span className="font-mono text-[10px] tracking-widest text-[var(--accent)] shrink-0 mt-0.5 w-6">
                  {p.n}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                  <p className="text-[13px] font-light leading-relaxed text-white/40">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Director quote ── */}
        <div className="border-t border-white/8 pt-14">
          <span className="block w-8 h-[2px] bg-[var(--accent)] mb-8" />
          <p className="text-white/70 text-lg md:text-xl font-light leading-[1.8] max-w-3xl mb-10">
            &ldquo;A-1 Electricals has extensive application engineering experience for all of our products
            and can therefore ensure the product recommendations and the products supplied are
            entirely fit for purpose — and provide a lifetime trouble-free service.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{ background: "rgba(217,115,32,0.15)", border: "1px solid rgba(217,115,32,0.25)" }}
            >
              <span className="font-bold text-xs" style={{ color: "var(--accent)" }}>JV</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Janki Vachhani</p>
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mt-0.5">
                Director, A-1 Electricals · Featured in T&amp;D Magazine
              </p>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
