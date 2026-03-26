import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-1px)] flex flex-col justify-center border-b border-[var(--border-strong)] bg-[var(--background)] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Ambient — matches PageHero / site hero */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[min(420px,80vw)] w-[min(420px,80vw)] rounded-full bg-[var(--accent)]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[min(360px,70vw)] w-[min(360px,70vw)] rounded-full bg-[var(--brand-blue)]/[0.06] blur-[100px]" />

      {/* Decorative grid hint — subtle, no extra JS */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 15%, transparent 70%)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-[2px] bg-[var(--accent)]" />
            <span className="eyebrow">Page not found</span>
          </div>

          <p
            className="text-[var(--foreground)] mb-2"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(4.5rem, 14vw, 10rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
            }}
          >
            <span className="text-[var(--foreground)]">4</span>
            <span className="text-[var(--accent)]">0</span>
            <span className="text-[var(--foreground)]">4</span>
          </p>

          <span className="gold-rule mt-8" />

          <h1 className="mt-8 text-[var(--foreground)] text-2xl md:text-3xl font-semibold tracking-tight">
            This connection isn&apos;t on our grid.
          </h1>
          <p className="mt-4 text-[var(--muted-light)] text-base md:text-lg leading-[1.75] max-w-xl">
            The page may have been moved, renamed, or never existed. Head back to explore our
            cable accessories and substation connectors — or get in touch with our team.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to home
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/products" className="btn-ghost">
              Browse products
            </Link>
          </div>

          <nav className="mt-14 pt-10 border-t border-[var(--border)]" aria-label="Popular pages">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] mb-4">
              Quick links
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
              {[
                { href: "/about", label: "About us" },
                { href: "/inquiry", label: "Inquiry" },
                { href: "/contact", label: "Contact" },
                { href: "/news", label: "News" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
