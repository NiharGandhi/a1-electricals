"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { categories, products } from "@/lib/products";

type SearchItemType = "Page" | "Category" | "Product";

interface SearchItem {
  href: string;
  title: string;
  description: string;
  type: SearchItemType;
  keywords: string;
  imageSrc?: string;
}

interface IndexedSearchItem extends SearchItem {
  searchText: string;
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function scoreFuzzyMatch(query: string, item: IndexedSearchItem): number {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 0;

  const queryParts = normalizedQuery.split(/\s+/).filter(Boolean);
  const title = normalizeSearchText(item.title);
  const description = normalizeSearchText(item.description);
  const keywords = normalizeSearchText(item.keywords);
  const searchText = item.searchText;

  let score = 0;

  for (const part of queryParts) {
    let partScore = 0;

    if (title === part) partScore = Math.max(partScore, 120);
    if (title.startsWith(part)) partScore = Math.max(partScore, 100);
    if (title.includes(part)) partScore = Math.max(partScore, 80);
    if (keywords.includes(part)) partScore = Math.max(partScore, 55);
    if (description.includes(part)) partScore = Math.max(partScore, 35);
    if (searchText.includes(part)) partScore = Math.max(partScore, 25);

    let cursor = 0;
    let matchedChars = 0;

    for (const char of part) {
      const foundAt = searchText.indexOf(char, cursor);
      if (foundAt === -1) break;
      matchedChars += 1;
      cursor = foundAt + 1;
    }

    const coverage = matchedChars / part.length;
    if (coverage >= 0.75) {
      partScore = Math.max(partScore, Math.round(coverage * 45));
    }

    if (partScore === 0) return 0;
    score += partScore;
  }

  if (searchText.includes(normalizedQuery)) score += 40;
  if (title.includes(normalizedQuery)) score += 60;
  if (queryParts.length > 1 && title.startsWith(queryParts[0])) score += 20;

  if (item.type === "Product") score += 6;
  if (item.type === "Category") score += 3;

  return score;
}

const pageItems: SearchItem[] = [
  {
    href: "/",
    title: "Home",
    description: "Overview of A-1 Electricals and key product solutions.",
    type: "Page",
    keywords: "home overview landing",
  },
  {
    href: "/about",
    title: "About A-1 Electricals",
    description: "Company profile, certifications, and engineering strengths.",
    type: "Page",
    keywords: "about company iso quality certifications",
  },
  {
    href: "/products",
    title: "Our Products",
    description: "Browse all cable accessory categories and products.",
    type: "Page",
    keywords: "products catalog categories accessories",
  },
  {
    href: "/distributors",
    title: "Distributors",
    description: "Distribution partnership opportunities and benefits.",
    type: "Page",
    keywords: "distributor partnership network",
  },
  {
    href: "/news",
    title: "News & Events",
    description: "Latest company updates, announcements, and events.",
    type: "Page",
    keywords: "news events updates",
  },
  {
    href: "/inquiry",
    title: "Submit Inquiry",
    description: "Send product requirements and request a quotation.",
    type: "Page",
    keywords: "inquiry quote rfq form",
  },
  {
    href: "/contact",
    title: "Contact Us",
    description: "Get in touch with sales and technical support teams.",
    type: "Page",
    keywords: "contact support phone email address",
  },
];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || target.isContentEditable;
}

export function SiteSearchModal() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [shortcutHint, setShortcutHint] = useState<"Cmd K" | "Ctrl K">("Ctrl K");
  useEffect(() => {
    const isApple =
      navigator.platform.toLowerCase().includes("mac") ||
      navigator.userAgent.toLowerCase().includes("mac os") ||
      navigator.userAgent.toLowerCase().includes("iphone") ||
      navigator.userAgent.toLowerCase().includes("ipad");
    if (isApple) setShortcutHint("Cmd K");
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const searchItems = useMemo<IndexedSearchItem[]>(() => {
    const categoryItems: SearchItem[] = categories.map((category) => ({
      href: `/products/${category.slug}`,
      title: category.title,
      description: category.description,
      type: "Category",
      keywords: `${category.shortLabel} ${category.slug}`,
      imageSrc: category.image,
    }));

    const productItems: SearchItem[] = products.map((product) => ({
      href: `/products/${product.slug}`,
      title: product.title,
      description: product.description,
      type: "Product",
      keywords: `${product.category} ${product.categorySlug} ${product.standards.join(" ")} ${(product.specs ?? []).join(" ")}`,
      imageSrc: product.image,
    }));

    return [...pageItems, ...categoryItems, ...productItems].map((item) => ({
      ...item,
      searchText: normalizeSearchText(`${item.title} ${item.description} ${item.keywords}`),
    }));
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return searchItems.slice(0, 10);

    return searchItems
      .map((item) => ({ item, score: scoreFuzzyMatch(normalizedQuery, item) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .map((entry) => entry.item)
      .slice(0, 12);
  }, [normalizedQuery, searchItems]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) setActiveIndex(0);
          return next;
        });
        return;
      }

      if (event.key === "/" && !isTypingTarget(event.target)) {
        event.preventDefault();
        setOpen(true);
        setActiveIndex(0);
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onOpenSearch = () => {
      setActiveIndex(0);
      setOpen(true);
    };
    window.addEventListener("open-site-search", onOpenSearch);
    return () => window.removeEventListener("open-site-search", onOpenSearch);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onNavigate = (href: string) => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    router.push(href);
  };

  return (
    <div key={pathname}>
      <button
        type="button"
        onClick={() => {
          setActiveIndex(0);
          setOpen(true);
        }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] shadow-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        aria-label="Open search"
      >
        <span>Search</span>
        <span className="hidden sm:inline font-mono text-[12px] font-bold tracking-wide text-[var(--muted)]">
          {shortcutHint}
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px] px-4 py-12 sm:py-20" onClick={() => setOpen(false)}>
          <div
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Search website"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-[var(--border)] p-4 sm:p-5">
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setActiveIndex(0);
                  setQuery(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (!results.length) return;

                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((prev) => (prev + 1) % results.length);
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
                  }

                  if (event.key === "Enter") {
                    event.preventDefault();
                    onNavigate(results[activeIndex]?.href ?? results[0].href);
                  }
                }}
                placeholder="Search pages, categories, and products..."
                className="w-full bg-transparent text-sm sm:text-base text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
              {results.length ? (
                <ul className="space-y-1">
                  {results.map((item, index) => (
                    <li key={`${item.type}-${item.href}`}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.href)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                          activeIndex === index
                            ? "border-[var(--border)] bg-[var(--background-secondary)]"
                            : "border-transparent hover:border-[var(--border)] hover:bg-[var(--background-secondary)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            {item.imageSrc ? (
                              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-white">
                                <Image
                                  src={item.imageSrc}
                                  alt={item.title}
                                  width={88}
                                  height={88}
                                  className="h-full w-full object-contain p-1"
                                />
                              </div>
                            ) : null}

                            <div>
                              <p className="text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                              <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">{item.description}</p>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                            {item.type}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm font-medium text-[var(--foreground)]">No results found</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">Try product names, categories, or page names.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3 text-[10px] text-[var(--muted)]">
              <span>Use arrows to navigate, Enter to open</span>
              <Link href="/products" className="hover:text-[var(--accent)] transition-colors" onClick={() => setOpen(false)}>
                Browse full catalogue
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
