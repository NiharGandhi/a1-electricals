"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const frosted = !isHome || scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        frosted
          ? "bg-[var(--dark)]/95 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* Light bg (transparent header): PNG with multiply removes white bg */}
            {/* Dark bg (frosted header): PNG would show white box, use filter invert trick */}
            <Image
              src="/a1-icon.png"
              alt="A-1 Electricals"
              width={36}
              height={36}
              className="object-contain shrink-0"
              style={{ mixBlendMode: frosted ? undefined : "multiply" }}
              priority
            />
            <div className="hidden sm:block">
              <p
                className={`leading-tight transition-colors duration-500 ${frosted ? "text-white" : "text-[var(--foreground)]"}`}
                style={{ fontFamily: "var(--font-primary)", fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.06em" }}
              >
                A-1 ELECTRICALS
              </p>
              <p className={`text-[9px] tracking-[0.2em] uppercase font-semibold transition-colors duration-500 ${frosted ? "text-white/30" : "text-[var(--muted)]"}`}>
                Power Cable Accessories
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.filter((l) => l.href !== "/inquiry").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-[0.8125rem] font-semibold rounded-md transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[var(--accent)]"
                    : frosted
                    ? "text-white/50 hover:text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/inquiry"
              className="hidden sm:block btn-primary"
            >
              Get a Quote
            </Link>

            <button
              type="button"
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] w-5 bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          open ? "max-h-[500px] border-t border-white/[0.06]" : "max-h-0"
        } bg-[var(--dark)]/98 backdrop-blur-xl`}
      >
        <div className="px-5 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between py-3.5 border-b border-white/[0.06] text-sm font-semibold transition-colors ${
                pathname === link.href ? "text-[var(--accent)]" : "text-white/55 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-30">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
