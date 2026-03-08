"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { categories, products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === activeCategory);

  return (
    <>
      <PageHero
        title="Our Products"
        subtitle="Engineered cable accessories for power reliability across the entire value chain."
      />

      <section className="py-14 md:py-20">
        <Container>

          {/* Header + filter */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-7 border-b border-[var(--border)]">
            <div>
              <p className="eyebrow mb-2">Product Catalogue</p>
              <h2 className="display-md text-[var(--foreground)]" style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)" }}>
                {activeCategory === "all"
                  ? "All Products"
                  : categories.find((c) => c.slug === activeCategory)?.title}
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)] font-mono">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[{ slug: "all", shortLabel: "All" }, ...categories].map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug === "all" ? "all" : (activeCategory === cat.slug ? "all" : cat.slug))}
                  className={`px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase border transition-all duration-150 ${
                    (cat.slug === "all" && activeCategory === "all") || activeCategory === cat.slug
                      ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                      : "bg-transparent text-[var(--muted)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid - improved newspaper layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[var(--border)] divide-y divide-[var(--border)] sm:divide-y-0">
            {filtered.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className={`
                  group relative flex flex-col bg-white transition-colors duration-200 hover:bg-[var(--background-secondary)]
                  ${index % 2 === 0 ? 'sm:border-r sm:border-[var(--border)]' : ''} 
                  ${index % 3 !== 2 ? 'lg:border-r lg:border-[var(--border)]' : ''}
                  ${index < 3 ? '' : 'border-t border-[var(--border)]'}
                  ${index >= filtered.length - (filtered.length % 3 || 3) ? '' : ''}
                `}
                data-cursor="View"
              >
                {/* Left accent bar on hover */}
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Image */}
                <div className="aspect-[4/3] bg-white flex items-center justify-center p-8 border-b border-[var(--border)] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={360}
                    height={270}
                    className="object-contain w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 bg-[var(--surface)]">
                  <span className="eyebrow text-[var(--accent)] mb-2 block">{product.category}</span>
                  <h3 className="display-md text-[var(--foreground)] text-base group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {product.specs?.length ? (
                    <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                      {product.specs.slice(0, 2).map((spec) => (
                        <span key={spec} className="border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted)] font-mono">
                          {spec}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-[var(--muted)] font-mono">{product.standards?.[0] ?? ""}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      View
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[var(--dark)] border-t border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">
              <span className="block w-8 h-[2px] bg-[var(--accent)] mb-6" />
              <h2 className="display text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Can&rsquo;t find what you need?
              </h2>
              <p className="mt-4 text-white/45 text-base leading-relaxed font-light">
                We manufacture tailor-made solutions for switchgear, transformers, and electrical equipment. Contact our engineering team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/inquiry" className="btn-primary">Request Quote</Link>
              <Link href="/contact" className="btn-ghost-light">Contact Us</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}