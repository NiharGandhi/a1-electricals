import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "@/components/products/ProductDetail";
import {
  products,
  categories,
  getProductBySlug,
  getProductsByCategory,
  getCategoryBySlug,
} from "@/lib/products";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://a1electricals.com";

export async function generateStaticParams() {
  return [
    ...categories.map((cat) => ({ slug: cat.slug })),
    ...products.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    const categoryProducts = getProductsByCategory(slug);
    return {
      title: `${category.title} | A-1 Electricals`,
      description: `${category.description} Browse ${categoryProducts.length} products from A-1 Electricals — ISO 9001:2015 certified manufacturer, Rajkot, India.`,
      alternates: { canonical: `/products/${slug}` },
      openGraph: {
        title: `${category.title} | A-1 Electricals`,
        description: category.description,
        images: [{ url: category.image }],
      },
    };
  }

  const product = getProductBySlug(slug);
  if (product) {
    const productCategory = getCategoryBySlug(product.categorySlug);
    return {
      title: `${product.title} | A-1 Electricals`,
      description: `${product.description} Standards: ${product.standards.join(", ")}. ISO 9001:2015 certified manufacturer from Rajkot, India.`,
      alternates: { canonical: `/products/${slug}` },
      openGraph: {
        title: `${product.title} | A-1 Electricals`,
        description: product.description,
        images: [{ url: product.image }],
      },
      keywords: [
        product.title,
        productCategory?.title ?? "",
        ...product.standards,
        "cable accessories manufacturer India",
        "A-1 Electricals",
      ].filter(Boolean),
    };
  }

  return {};
}

// JSON-LD rendered as a server component — content is internal static data only, not user input.
function JsonLd({ data }: { data: object }) {
  // eslint-disable-next-line react/no-danger
  return (
    <script
      type="application/ld+json"
      // Content is serialised from internal static product/category data — no user input involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ── Category page ────────────────────────────────────────────────────────────
  const category = getCategoryBySlug(slug);
  if (category) {
    const categoryProducts = getProductsByCategory(slug);

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/products` },
        { "@type": "ListItem", position: 3, name: category.title, item: `${baseUrl}/products/${slug}` },
      ],
    };

    return (
      <>
        <JsonLd data={breadcrumbSchema} />

        {/* Breadcrumb */}
        <div className="pt-24 md:pt-28 border-b border-[var(--border)]">
          <Container>
            <div className="py-3.5 flex items-center gap-2 text-xs text-[var(--muted)] font-mono">
              <Link href="/products" className="hover:text-[var(--accent)] transition-colors">Products</Link>
              <span className="opacity-30">/</span>
              <span className="text-[var(--foreground)]">{category.title}</span>
            </div>
          </Container>
        </div>

        {/* Category hero */}
        <section className="py-14 md:py-20 border-b border-[var(--border)]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow mb-3">{category.shortLabel}</p>
                <h1 className="display text-[var(--foreground)]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  {category.title}
                </h1>
                <p className="mt-5 text-[var(--muted)] text-base leading-relaxed max-w-2xl">
                  {category.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/inquiry" className="btn-primary">Request Quote</Link>
                  <Link href="/contact" className="btn-ghost">Technical Support</Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {[["ISO 9001:2015", "Quality System"], ["CE / RoHS", "Compliant"], ["IEC Tested", "Certified"]].map(([title, sub]) => (
                  <div key={title} className="border border-[var(--border)] px-4 py-3 text-center min-w-[90px]">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">{title}</p>
                    <p className="text-[10px] font-mono text-[var(--muted)] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Products grid */}
        <section className="py-14 md:py-20">
          <Container>
            <div className="pb-7 border-b border-[var(--border)] mb-8 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-2">Product Catalogue</p>
                <h2 className="display-md text-[var(--foreground)]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {categoryProducts.length} Product{categoryProducts.length !== 1 ? "s" : ""}
                </h2>
              </div>
              <Link href="/products" className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline flex items-center gap-1">
                All categories
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-0">
              {categoryProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group relative flex flex-col bg-white border border-[var(--border)] transition-colors duration-200 hover:bg-[var(--background-secondary)]"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 border-b border-[var(--border)] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={360}
                      height={270}
                      className="object-contain w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5 lg:p-6 bg-[var(--surface)]">
                    <h3 className="display-md text-[var(--foreground)] text-[0.95rem] sm:text-sm md:text-[0.95rem] lg:text-base group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-[12px] md:text-[13px] text-[var(--muted)] line-clamp-2 leading-relaxed flex-1">
                      {product.description}
                    </p>
                    {product.standards?.[0] && (
                      <p className="mt-3 text-[10px] font-mono text-[var(--muted)]">{product.standards[0]}</p>
                    )}
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
                  Need a Custom Solution?
                </h2>
                <p className="mt-4 text-white/45 text-base leading-relaxed font-light">
                  Our engineering team can help with product selection, specifications, and tailor-made solutions.
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

  // ── Product page ─────────────────────────────────────────────────────────────
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productCategory = getCategoryBySlug(product.categorySlug);
  const related = getProductsByCategory(product.categorySlug).filter((p) => p.slug !== product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: `${baseUrl}${product.image}`,
    brand: { "@type": "Brand", name: "A-1 Electricals" },
    manufacturer: { "@type": "Organization", name: "A-1 Electricals", url: baseUrl },
    category: product.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/products` },
      { "@type": "ListItem", position: 3, name: product.category, item: `${baseUrl}/products/${product.categorySlug}` },
      { "@type": "ListItem", position: 4, name: product.title, item: `${baseUrl}/products/${product.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductDetail product={product} category={productCategory ?? null} related={related} />
    </>
  );
}
