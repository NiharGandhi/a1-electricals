"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  getProductBySlug,
  getProductsByCategory,
  getCategoryBySlug,
} from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="pt-32 pb-20">
        <Container>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--foreground)]">
            Product Not Found
          </h1>
          <p className="mt-4 text-[var(--muted)]">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button href="/products" className="mt-6">
            Back to Products
          </Button>
        </Container>
      </section>
    );
  }

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = getProductsByCategory(product.categorySlug).filter(
    (p) => p.slug !== product.slug
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 md:pt-28 border-b border-[var(--border)]">
        <Container>
          <div className="py-4 flex items-center gap-2 text-sm text-[var(--muted)]">
            <Link href="/products" className="hover:text-[var(--accent)] transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="hover:text-[var(--accent)] transition-colors"
            >
              {category?.title}
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">{product.title}</span>
          </div>
        </Container>
      </div>

      {/* Product Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image */}
            <div className="product-img-wrap aspect-[4/3] flex items-center justify-center p-8">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={375}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Info */}
            <div>
              <span className="inline-block rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-4">
                {category?.title}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-[var(--foreground)] tracking-wider leading-tight">
                {product.title}
              </h1>
              <p className="mt-5 text-[var(--muted)] text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Standards badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.standards.map((std) => (
                  <span
                    key={std}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]"
                  >
                    {std}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/inquiry" data-magnetic>
                  Request Quote
                </Button>
                <Button href="/contact" variant="outline" data-magnetic>
                  Technical Support
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features & Specs */}
      <section className="py-16 md:py-24 bg-[var(--background-secondary)]">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Features */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--foreground)] tracking-wide mb-8">
                Key Features
              </h2>
              <ul className="space-y-4">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="feature-item flex items-start gap-4 py-3 border-b border-[var(--border)]"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-[var(--muted-light)] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs & Applications */}
            <div className="space-y-10">
              {product.specs && (
                <div className="spec-card rounded-2xl border border-[var(--border)] bg-white p-7">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] tracking-wide mb-4">
                  Technical Specifications
                </h3>
                <ul className="space-y-3">
                  {product.specs?.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-3 text-[var(--muted)] text-sm"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
              )}

              {product.applications && (
              <div className="spec-card rounded-2xl border border-[var(--border)] bg-white p-7">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] tracking-wide mb-4">
                  Applications
                </h3>
                <ul className="space-y-3">
                  {product.applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-start gap-3 text-[var(--muted)] text-sm"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </div>

          {/* Catalog specification table (full width) */}
          {product.specificationTable && (
            <div className="spec-card mt-16 rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8 overflow-x-auto">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] tracking-wide mb-6">
                Specifications
              </h3>
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--border)]">
                    {product.specificationTable.columns.map((col) => (
                      <th
                        key={col.key}
                        className="text-left py-3 px-4 font-medium text-[var(--foreground)] whitespace-nowrap"
                      >
                        {col.label}
                        {col.unit && (
                          <span className="text-[var(--muted)] font-normal ml-0.5">
                            ({col.unit})
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.specificationTable.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)]/50 transition-colors"
                    >
                      {product.specificationTable!.columns.map((col) => (
                        <td
                          key={col.key}
                          className="py-3 px-4 text-[var(--muted)]"
                        >
                          {row[col.key] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--foreground)] tracking-wide mb-10">
              Related Products
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  className="related-card group rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all duration-400 hover:border-[var(--accent)]/30 hover:shadow-[0_4px_30px_var(--accent-glow)] hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] bg-[var(--background-secondary)] flex items-center justify-center p-6 overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      width={300}
                      height={200}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors tracking-wide">
                      {rp.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                      {rp.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--background-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--foreground)] tracking-wide">
              Need Technical Support?
            </h2>
            <p className="mt-4 text-[var(--muted)] text-lg">
              Our engineering team can help with product selection, specifications,
              and custom solutions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/inquiry" data-magnetic>
                Submit Inquiry
              </Button>
              <Button href="/contact" variant="outline" data-magnetic>
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
