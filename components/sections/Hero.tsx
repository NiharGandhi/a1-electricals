import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroGrid } from "@/components/animations/HeroGrid";

const stats = [
  { value: "2006", label: "Year Founded" },
  { value: "500+", label: "Product Variants" },
  { value: "550 kV", label: "Max Voltage Rating" },
  { value: "ISO 9001", label: "Certified" },
];

const badges = ["CE Certified", "RoHS", "IEC 61238-1", "FIEO Member", "TÜV Certified"];

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[var(--background)] flex flex-col overflow-hidden">

      {/* ── Background grid animation ─────────────────── */}
      <HeroGrid />

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative flex-1 flex items-center">
        <Container className="pt-28 pb-10 lg:pt-32 lg:pb-16">
          <div className="max-w-5xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-8 h-[2px] bg-[var(--accent)]" />
              <span className="eyebrow">
                Est. 2006 — Rajkot, Gujarat, India
              </span>
            </div>

            {/* Headline */}
            <h1
              className="display text-[var(--foreground)]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)" }}
            >
              Power Cable
              <br />
              <span style={{ color: "var(--accent)" }}>Accessories.</span>
              <br />
              Built to Standard.
            </h1>

            {/* Divider */}
            <div className="mt-10 mb-8 w-full h-px bg-[var(--border)]" />

            {/* Bottom row: description + CTAs */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[var(--muted)] text-base leading-[1.8] max-w-md font-light">
                ISO 9001 certified manufacturer of cable lugs, connectors,
                substation clamps, glands, and busbars for transmission,
                renewable energy, and industrial infrastructure.
              </p>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href="/products" className="btn-primary">
                  Explore Products
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/inquiry" className="btn-ghost">
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Compliance badges */}
            <div className="mt-10 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--muted)] border border-[var(--border)] rounded-md px-3 py-1.5"
                >
                  {b}
                </span>
              ))}
            </div>

          </div>
        </Container>
      </div>

      {/* ── Stats bar ────────────────────────────────────── */}
      <div className="border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-7 px-4 ${i < stats.length - 1 ? "border-r border-[var(--border)]" : ""}`}
              >
                <span
                  className="block text-[var(--foreground)] leading-none"
                  style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </span>
                <span className="block mt-2 text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--muted)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

    </section>
  );
}
