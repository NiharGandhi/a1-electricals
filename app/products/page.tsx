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

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === activeCategory);

  return (
    <>
      <PageHero
        title="Our Products"
        subtitle="Engineered cable accessories for power reliability across the entire value chain."
      />

      {/* Products Section with integrated filter */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--foreground)] tracking-wide">
                {activeCategory === "all"
                  ? "All Products"
                  : categories.find((c) => c.slug === activeCategory)?.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Compact category filter */}
            <div className="flex flex-wrap gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`cat-card shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  title={cat.title}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.slug ? "all" : cat.slug
                    )
                  }
                  className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.slug
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="product-card group rounded-2xl border border-[var(--border)] bg-white overflow-hidden transition-all duration-400 hover:border-[var(--accent)]/30 hover:shadow-[0_4px_30px_var(--accent-glow)] hover:-translate-y-1"
                data-cursor="View"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-white flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={250}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--accent)]">
                    {product.category}
                  </span>
                  <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-lg text-[var(--foreground)] tracking-wide group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Spec tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.specs?.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted)] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-[var(--accent)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>View details</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--background-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--foreground)] tracking-wide">
              Can&apos;t find what you need?
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg">
              We offer tailor-made solutions for switchgear, transformers, and
              electrical equipment. Contact our engineering team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--accent-dim)] hover:shadow-[0_4px_20px_var(--accent-glow)]"
                data-magnetic
              >
                Request Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
                data-magnetic
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
