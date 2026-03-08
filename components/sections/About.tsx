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
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
              About the Company
            </p>
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
              <Link href="/about" className="btn-ghost-light">
                Our Story
              </Link>
              <Link href="/products" className="btn-primary">
                View Products
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: numbered pillars */}
          <div className="flex flex-col gap-0">
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className="flex gap-8 py-10"
                style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
              >
                <span className="font-mono text-[10px] tracking-widest shrink-0 mt-1 text-white/25">
                  {p.n}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-white/45">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Director quote ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-10 md:p-14"
          style={{ background: "var(--dark-surface)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Large decorative quote mark */}
          <span
            className="absolute top-6 right-10 select-none pointer-events-none leading-none text-white/[0.04]"
            style={{ fontSize: "12rem", fontFamily: "Georgia, serif", lineHeight: 1 }}
            aria-hidden="true"
          >
            "
          </span>

          {/* Accent rule */}
          <span className="block w-8 h-[3px] rounded-full mb-8" style={{ background: "var(--accent)" }} />

          <p className="text-white/75 text-lg md:text-xl font-light leading-[1.8] max-w-3xl mb-10">
            "A-1 Electricals has extensive application engineering experience for all of our products
            and can therefore ensure the product recommendations and the products supplied are
            entirely fit for purpose — and provide a lifetime trouble-free service."
          </p>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(217,115,32,0.15)", border: "1px solid rgba(217,115,32,0.25)" }}>
              <span className="text-[var(--accent)] font-bold text-sm">JV</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Janki Vachhani</p>
              <p className="text-white/35 text-[10px] font-mono uppercase tracking-widest mt-0.5">Director, A-1 Electricals · Featured in T&amp;D Magazine</p>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
