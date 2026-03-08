import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { categories } from "@/lib/products";

export function Products() {
  return (
    <section id="products" className="py-24 md:py-32 bg-[var(--background-alt)]">
      <Container>

        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--muted)]">
            Product Portfolio
          </p>
          <h2
            className="display text-[var(--foreground)]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Comprehensive
            <br />
            <span style={{ color: "var(--accent)" }}>Solutions.</span>
          </h2>
        </div>

        {/* Gap-px grid — peer_reject pattern */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px"
          style={{ background: "var(--border)" }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="flex flex-col transition-colors duration-200 bg-[var(--background)] hover:bg-[var(--surface)] group"
            >
              {/* Image area */}
              <div className="aspect-[4/3] flex items-center justify-center p-6 overflow-hidden bg-white group-hover:bg-[#F9F9F9] transition-colors duration-200">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={320}
                  height={240}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 16 16" fill="none"
                    className="text-[var(--muted)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-[var(--muted)] line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* Custom CTA cell */}
          <div
            className="flex flex-col items-center justify-center text-center p-8 gap-4 transition-colors duration-200"
            style={{ background: "var(--dark)" }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Custom
            </span>
            <p className="text-xs font-light leading-relaxed text-white/40">
              Tailor-made components for switchgear, transformers &amp; OEM equipment.
            </p>
            <Link href="/inquiry" className="btn-primary">
              Discuss Requirement
            </Link>
          </div>
        </div>

        {/* Bottom link */}
        <div className="mt-10 flex justify-start">
          <Link href="/products" className="btn-ghost">
            View Full Catalogue
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </Container>
    </section>
  );
}
