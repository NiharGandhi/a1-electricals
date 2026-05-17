import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { articles, getArticleBySlug } from "@/lib/articles";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://a1electricals.com";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | A-1 Electricals`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "A-1 Electricals" },
    publisher: { "@type": "Organization", name: "A-1 Electricals", url: baseUrl },
    url: `${baseUrl}/resources/${slug}`,
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${baseUrl}/resources` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${baseUrl}/resources/${slug}` },
    ],
  });

  return (
    <>
      {/* Serialised from internal static lib/articles.ts — no user input. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      {/* Breadcrumb */}
      <div className="pt-24 md:pt-28 border-b border-[var(--border)]">
        <Container>
          <div className="py-3.5 flex items-center gap-2 text-xs text-[var(--muted)] font-mono">
            <Link href="/resources" className="hover:text-[var(--accent)] transition-colors">Resources</Link>
            <span className="opacity-30">/</span>
            <span className="text-[var(--foreground)] truncate max-w-[240px]">{article.title}</span>
          </div>
        </Container>
      </div>

      {/* Article header */}
      <section className="py-14 md:py-20 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow text-[var(--accent)] block mb-4">{article.category}</span>
            <h1 className="display text-[var(--foreground)]" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              {article.title}
            </h1>
            <p className="mt-5 text-[var(--muted)] text-base leading-relaxed">{article.description}</p>
            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-[var(--muted)]">
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>A-1 Electricals Engineering Team</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.keywords.map((kw) => (
                <span key={kw} className="border border-[var(--border)] px-2 py-0.5 text-[10px] font-mono text-[var(--muted)]">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <ArticleBody content={article.content} />

      {/* Related articles */}
      <section className="py-14 border-t border-[var(--border)]">
        <Container>
          <p className="eyebrow mb-5">More Resources</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {articles
              .filter((a) => a.slug !== slug)
              .slice(0, 3)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/resources/${a.slug}`}
                  className="group relative flex flex-col bg-[var(--background)] hover:bg-[var(--surface)] transition-colors p-6"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="eyebrow text-[var(--accent)] block mb-2 text-[10px]">{a.category}</span>
                  <h3 className="display-md text-[var(--foreground)] text-sm group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--muted)] line-clamp-2 leading-relaxed flex-1">{a.description}</p>
                </Link>
              ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[var(--dark)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">
              <span className="block w-8 h-[2px] bg-[var(--accent)] mb-6" />
              <h2 className="display text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)" }}>
                Ready to Specify?
              </h2>
              <p className="mt-3 text-white/45 text-sm leading-relaxed font-light">
                Our engineering team can assist with product selection and project-specific requirements.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/products" className="btn-primary">Browse Products</Link>
              <Link href="/inquiry" className="btn-ghost-light">Submit Inquiry</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Renders article markdown content as structured React elements (no user input). */
function ArticleBody({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++}>{line.slice(3)}</h2>);
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++}>{line.slice(4)}</h3>);
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(<pre key={key++}><code>{codeLines.join("\n")}</code></pre>);
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [headRow, , ...bodyRows] = tableLines;
      const headers = headRow.split("|").slice(1, -1).map((c) => c.trim());
      const rows = bodyRows.map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
      elements.push(
        <table key={key++}>
          <thead><tr>{headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>)}</tbody>
        </table>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(<ul key={key++}>{items.map((item, ii) => <li key={ii}>{parseLine(item)}</li>)}</ul>);
      continue;
    }

    if (line.trim() === "") { i++; continue; }

    elements.push(<p key={key++}>{parseLine(line)}</p>);
    i++;
  }

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="max-w-3xl prose-article">{elements}</div>
      </Container>
    </section>
  );
}

/** Converts inline markdown (bold, code, links) to React nodes — operates on internal static content. */
function parseLine(text: string): React.ReactNode {
  const inlinePattern = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(inlinePattern)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) parts.push(<strong key={match.index}>{match[1]}</strong>);
    else if (match[2] !== undefined) parts.push(<code key={match.index}>{match[2]}</code>);
    else if (match[3] !== undefined) parts.push(<Link key={match.index} href={match[4]}>{match[3]}</Link>);
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}
