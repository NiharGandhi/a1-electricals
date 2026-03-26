"use client";

import { useMemo, useState } from "react";
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
          <p className="eyebrow mb-4">Error</p>
          <h1 className="display text-[var(--foreground)]" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Product Not Found</h1>
          <p className="mt-4 text-[var(--muted)]">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button href="/products" className="mt-6">Back to Products</Button>
        </Container>
      </section>
    );
  }

  const category = getCategoryBySlug(product.categorySlug);
  const related = getProductsByCategory(product.categorySlug).filter(p => p.slug !== product.slug);
  const specificationSections = product.specificationTables?.length
    ? product.specificationTables.map((entry) => ({
        title: entry.title,
        tabLabel: entry.tabLabel ?? entry.title,
        image: entry.image ?? product.image,
        drawingImage: entry.drawingImage,
        drawingImages: entry.drawingImages ?? (entry.drawingImage ? [entry.drawingImage] : []),
        table: entry.table,
      }))
    : product.specificationTable
      ? [{
          title: "Specifications Table",
          tabLabel: "Specifications",
          image: product.image,
          drawingImage: product.showDrawingWithSpecification ? product.image : undefined,
          drawingImages: product.specificationDrawingImages
            ?? (product.showDrawingWithSpecification ? [product.image] : []),
          table: product.specificationTable,
        }]
      : [];
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const activeSpecSection = useMemo(
    () => specificationSections[Math.min(activeSpecIndex, Math.max(specificationSections.length - 1, 0))],
    [activeSpecIndex, specificationSections]
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 md:pt-28 border-b border-[var(--border)]">
        <Container>
          <div className="py-3.5 flex items-center gap-2 text-xs text-[var(--muted)] font-mono">
            <Link href="/products" className="hover:text-[var(--accent)] transition-colors">Products</Link>
            <span className="opacity-30">/</span>
            <Link href={`/products?category=${product.categorySlug}`} className="hover:text-[var(--accent)] transition-colors">
              {category?.title}
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-[var(--foreground)]">{product.title}</span>
          </div>
        </Container>
      </div>

      {/* Product hero */}
      <section className="py-14 md:py-20 border-b border-[var(--border)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-start">

            {/* Image */}
            <div className="lg:sticky lg:top-28">
              <div className="border border-[var(--border)] bg-[var(--background-secondary)] aspect-square flex items-center justify-center p-12 overflow-hidden">
                <Image
                  src={activeSpecSection?.image ?? product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full"
                />
              </div>
              {product.standards?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.standards.map((std) => (
                    <span key={std} className="border border-[var(--border)] px-3 py-1.5 text-[10px] font-mono font-medium text-[var(--muted)] uppercase tracking-wider">
                      {std}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="eyebrow mb-3">{category?.title}</p>
                <h1 className="display text-[var(--foreground)]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  {product.title}
                </h1>
                {specificationSections.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {specificationSections.map((section, sectionIndex) => {
                      const isActive = sectionIndex === activeSpecIndex;
                      return (
                        <button
                          key={`hero-${section.tabLabel}-${sectionIndex}`}
                          type="button"
                          onClick={() => setActiveSpecIndex(sectionIndex)}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors ${
                            isActive
                              ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                              : "bg-white text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          }`}
                        >
                          {section.tabLabel}
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="mt-4 w-full h-px bg-[var(--border)]" />
                <p className="mt-5 text-[var(--muted)] text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key specs */}
              {product.specs?.length ? (
                <div>
                  <p className="eyebrow-muted mb-3">Specifications</p>
                  <div className="border border-[var(--border)]">
                    {product.specs.slice(0, 4).map((spec, i) => (
                      <div key={i} className={`flex items-start gap-4 px-4 py-3 ${i < Math.min(product.specs!.length, 4) - 1 ? "border-b border-[var(--border)]" : ""}`}>
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span className="text-sm text-[var(--muted-light)]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/inquiry" className="btn-primary">Request Quote</Link>
                <Link href="/contact" className="btn-ghost">Technical Support</Link>
              </div>

              {/* Compliance */}
              <div className="border-t border-[var(--border)] pt-5 grid grid-cols-3 gap-4">
                {[["ISO 9001:2015", "Quality System"], ["CE / RoHS", "Compliant"], ["IEC Tested", "Certified"]].map(([title, sub]) => (
                  <div key={title}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">{title}</p>
                    <p className="text-[10px] font-mono text-[var(--muted)] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features + Specs + Applications */}
      <section className="py-14 md:py-20 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <Container>
          <div className="grid gap-0 lg:grid-cols-2 lg:divide-x divide-[var(--border)]">

            {/* Features */}
            <div className="lg:pr-10 pb-10 lg:pb-0">
              <p className="eyebrow mb-5">Key Features</p>
              <div>
                {product.features.map((feat, i) => (
                  <div key={i} className={`flex items-start gap-4 py-4 ${i < product.features.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm text-[var(--muted-light)] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs + Applications */}
            <div className="lg:pl-10 pt-10 lg:pt-0 flex flex-col gap-10">
              {product.specs && (
                <div>
                  <p className="eyebrow mb-4">Technical Specifications</p>
                  <div className="border border-[var(--border)]">
                    {product.specs.map((spec, i) => (
                      <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < product.specs!.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span className="text-sm text-[var(--muted)]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {product.applications && (
                <div>
                  <p className="eyebrow mb-4">Applications</p>
                  <div className="border border-[var(--border)]">
                    {product.applications.map((app, i) => (
                      <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < product.applications!.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span className="text-sm text-[var(--muted)]">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specification table */}
          {activeSpecSection && (
            <div className="mt-14 space-y-4">
              {specificationSections.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {specificationSections.map((section, sectionIndex) => {
                    const isActive = sectionIndex === activeSpecIndex;
                    return (
                      <button
                        key={`${section.tabLabel}-${sectionIndex}`}
                        type="button"
                        onClick={() => setActiveSpecIndex(sectionIndex)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] border transition-colors ${
                          isActive
                            ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                            : "bg-white text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        }`}
                      >
                        {section.tabLabel}
                      </button>
                    );
                  })}
                </div>
              )}
              <div
                className={
                  product.showDrawingWithSpecification && activeSpecSection.drawingImages.length > 0
                    ? "grid gap-8 grid-cols-1 min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(260px,38%)] lg:items-start lg:gap-6"
                    : "min-w-0"
                }
              >
                {/* min-w-0 lets this column shrink so wide tables scroll inside overflow-x-auto instead of pushing drawings off-screen */}
                <div className="min-w-0 max-w-full border border-[var(--border)]">
                  <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
                    <p className="eyebrow">{activeSpecSection.title}</p>
                  </div>
                  <div className="overflow-x-auto overscroll-x-contain">
                    <table className="w-full min-w-[640px] text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                          {activeSpecSection.table.columns.map((col) => (
                            <th
                              key={col.key}
                              className="text-left py-3 px-5 text-[11px] font-bold text-[var(--foreground)] whitespace-nowrap tracking-wide"
                            >
                              {col.label}
                              {col.unit && (
                                <span className="text-[var(--muted)] font-semibold ml-1">({col.unit})</span>
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeSpecSection.table.rows.map((row, i) => (
                          <tr key={i} className={`${i < activeSpecSection.table.rows.length - 1 ? "border-b border-[var(--border)]" : ""} hover:bg-[var(--surface)] transition-colors`}>
                            {activeSpecSection.table.columns.map((col) => {
                              const wrap =
                                col.key === "pnInsp" ||
                                col.key === "pnNoInsp" ||
                                col.key === "stud";
                              return (
                                <td
                                  key={col.key}
                                  className={`py-3 px-5 text-[var(--muted)] text-xs ${
                                    wrap
                                      ? "whitespace-normal break-words min-w-[10rem] max-w-[20rem] font-sans"
                                      : "font-mono whitespace-nowrap"
                                  }`}
                                >
                                  {row[col.key] ?? "—"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {activeSpecSection.table.notes?.length ? (
                    <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--background-secondary)]">
                      <p className="eyebrow mb-2">Notes</p>
                      <div className="space-y-1">
                        {activeSpecSection.table.notes.map((note, idx) => (
                          <p key={idx} className="text-xs text-[var(--muted)] font-mono">
                            {note}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                {product.showDrawingWithSpecification && activeSpecSection.drawingImages.length > 0 && (
                  <div className="min-w-0 w-full border border-[var(--border)] bg-white p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                    <p className="eyebrow mb-3">
                      Technical drawing{activeSpecSection.drawingImages.length > 1 ? "s" : ""}
                    </p>
                    <div
                      className={`grid gap-4 ${
                        activeSpecSection.drawingImages.length > 1
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {activeSpecSection.drawingImages.map((img: string, idx: number) => (
                        <div
                          key={`${img}-${idx}`}
                          className="relative aspect-[4/3] w-full min-h-[180px] bg-[var(--background-secondary)]"
                        >
                          <Image
                            src={img}
                            alt={`${product.title} ${activeSpecSection.tabLabel} drawing ${idx + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 38vw"
                            className="object-contain p-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-14 md:py-20 border-b border-[var(--border)]">
          <Container>
            <div className="flex items-end justify-between pb-7 border-b border-[var(--border)] mb-0">
              <div>
                <p className="eyebrow mb-1">More Products</p>
                <h2 className="display-md text-[var(--foreground)]" style={{ fontSize: "clamp(1.5rem,2.5vw,1.8rem)" }}>Related Products</h2>
              </div>
              <Link href={`/products?category=${product.categorySlug}`} className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline flex items-center gap-1">
                View all
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] border border-[var(--border)] border-t-0">
              {related.slice(0, 3).map((rp) => (
                <Link key={rp.slug} href={`/products/${rp.slug}`} className="group relative flex flex-col bg-white hover:bg-[var(--background-secondary)] transition-colors duration-200">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-8 border-b border-[var(--border)] overflow-hidden">
                    <Image src={rp.image} alt={rp.title} width={300} height={225} className="object-contain w-full h-full group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="eyebrow text-[var(--accent)] block mb-1">{rp.category}</span>
                    <h3 className="display-md text-[var(--foreground)] text-sm group-hover:text-[var(--accent)] transition-colors">{rp.title}</h3>
                    <p className="mt-1.5 text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">{rp.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[var(--dark)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="block w-8 h-[2px] bg-[var(--accent)] mb-6" />
              <h2 className="display text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)" }}>Need Technical Support?</h2>
              <p className="mt-3 text-white/45 text-sm leading-relaxed font-light max-w-md">
                Our engineering team can help with product selection, specifications, and custom solutions.
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
