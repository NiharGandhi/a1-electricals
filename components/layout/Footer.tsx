import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { categories } from "@/lib/products";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/products", label: "All Products" },
  { href: "/news", label: "News & Events" },
  { href: "/distributors", label: "Distributors" },
  { href: "/inquiry", label: "Request a Quote" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--dark)] border-t border-white/[0.06]">
      <Container>
        <div className="pt-16 pb-10 grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.2fr_1.5fr]">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <Image src="/a1-logo.jpg" alt="A-1 Electricals" width={40} height={40} className="rounded" />
              <div>
                <p
                  className="text-white leading-tight"
                  style={{ fontFamily: "var(--font-primary)", fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.06em" }}
                >
                  A-1 ELECTRICALS
                </p>
                <p className="text-white/30 text-[9px] tracking-[0.18em] uppercase font-semibold">Power Cable Accessories</p>
              </div>
            </Link>
            <p className="text-white/35 text-sm leading-[1.85] max-w-xs mb-6">
              ISO 9001 certified manufacturer of power cable accessories for
              transmission, substations, renewable energy, and industrial
              infrastructure since 2006.
            </p>
            <div className="flex flex-wrap gap-2">
              {["ISO 9001", "CE", "RoHS", "IEC"].map((b) => (
                <span key={b} className="text-[10px] font-bold text-[var(--accent)]/60 border border-[var(--accent)]/15 rounded-md px-2.5 py-1 tracking-wider">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/25 mb-5">Products</p>
            <nav className="space-y-2.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="block text-sm text-white/45 hover:text-[var(--accent)] transition-colors duration-200 font-medium"
                >
                  {cat.shortLabel}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/25 mb-5">Company</p>
            <nav className="space-y-2.5">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-white/45 hover:text-[var(--accent)] transition-colors duration-200 font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/25 mb-5">Contact</p>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1 font-semibold">Phone</p>
                <a href="tel:+919374120257" className="block text-white/50 hover:text-[var(--accent)] transition-colors font-medium">+91 93741 20257</a>
                <a href="tel:+919374820257" className="block text-white/50 hover:text-[var(--accent)] transition-colors font-medium">+91 93748 20257</a>
              </div>
              <div>
                <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1 font-semibold">Email</p>
                <a href="mailto:info@a1electricals.com" className="block text-white/50 hover:text-[var(--accent)] transition-colors font-medium">info@a1electricals.com</a>
                <a href="mailto:sales@a1electricals.com" className="block text-white/50 hover:text-[var(--accent)] transition-colors font-medium">sales@a1electricals.com</a>
              </div>
              <div>
                <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1 font-semibold">Address</p>
                <p className="text-white/35 leading-[1.7] text-sm">
                  G-1053, Lodhika GIDC Metoda,<br />
                  Kalavad Road, Rajkot 360021,<br />
                  Gujarat, India
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/20 text-xs tracking-wide font-medium">
            © {new Date().getFullYear()} A-1 Electricals. All rights reserved.
          </p>
          <p className="text-white/15 text-xs font-medium tracking-widest uppercase">
            Connecting Power. Delivering Reliability.
          </p>
        </div>

      </Container>
    </footer>
  );
}
