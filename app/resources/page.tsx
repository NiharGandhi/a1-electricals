import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Technical Resources | A-1 Electricals",
  description:
    "Technical guides, selection guides, and engineering resources for cable accessories — cable lugs, cleats, connectors, glands, and more. From A-1 Electricals, ISO 9001:2015 certified manufacturer.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Technical Resources | A-1 Electricals",
    description:
      "Technical guides and selection resources for power cable accessories from A-1 Electricals.",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Technical Resources"
        subtitle="Engineering guides, selection tools, and technical references for power cable accessories."
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="pb-7 border-b border-[var(--border)] mb-10">
            <p className="eyebrow mb-2">Knowledge Base</p>
            <h2 className="display-md text-[var(--foreground)]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              {articles.length} Article{articles.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <div className="grid gap-px" style={{ background: "var(--border)" }}>
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="group relative flex flex-col sm:flex-row sm:items-start gap-6 bg-[var(--background)] hover:bg-[var(--surface)] transition-colors duration-200 p-6 md:p-8"
              >
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="flex-1 min-w-0">
                  <span className="eyebrow text-[var(--accent)] block mb-2 text-[10px]">{article.category}</span>
                  <h3 className="display-md text-[var(--foreground)] text-base md:text-lg group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.keywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="border border-[var(--border)] px-2 py-0.5 text-[10px] font-mono text-[var(--muted)]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  <time dateTime={article.publishedAt} className="font-mono text-[var(--muted)] normal-case font-normal tracking-normal text-[11px]">
                    {new Date(article.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                Have a Technical Question?
              </h2>
              <p className="mt-4 text-white/45 text-base leading-relaxed font-light">
                Our engineering team is available to assist with product selection and project specifications.
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
