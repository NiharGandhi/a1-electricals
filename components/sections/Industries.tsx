import { Container } from "@/components/ui/Container";
import Link from "next/link";

const industries = [
  {
    num: "01",
    title: "Power Transmission & Distribution",
    description: "LV, MV, and HV grid infrastructure with cable lugs, connectors, and substation accessories built for continuous uptime.",
    tags: ["Compression Lugs", "Shear Bolt Connectors"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "EHV Substations",
    description: "Precision-machined aluminium substation connectors rated up to 550 kV for AIS, GIS, busbar, and transformer applications.",
    tags: ["EHV Clamps", "T & L Connectors"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Renewable Energy",
    description: "CE & RoHS certified accessories for solar farms, wind turbines, and battery energy storage systems.",
    tags: ["Shear Bolt Lugs", "Cable Glands"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Railways & Metro",
    description: "Vibration-resistant cable accessories for overhead catenary, traction substations, and metro electrification projects.",
    tags: ["Substation Connectors", "Cable Cleats"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="M8 19l-2 3" />
        <path d="M16 19l2 3" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Oil, Gas & Petrochemical",
    description: "ATEX-rated brass cable glands and double compression fittings for hazardous area installations and offshore platforms.",
    tags: ["Brass Cable Glands", "Ex-rated Fittings"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Industrial & OEM",
    description: "Custom-engineered components for switchgear OEMs, transformer manufacturers, and panel builders.",
    tags: ["Laminated Busbars", "Flexible Braids"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export function Industries() {
  return (
    <section className="py-24 md:py-32 bg-[var(--dark)]">
      <Container>

        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
            Industries We Serve
          </p>
          <h2
            className="display text-white"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Built for Critical
            <br />
            <span style={{ color: "var(--accent)" }}>Infrastructure.</span>
          </h2>
        </div>

        {/* Gap-px grid — peer_reject pattern */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="flex flex-col gap-6 p-8 transition-colors duration-200 bg-[var(--dark)] hover:bg-[var(--dark-surface)]"
            >
              {/* Number + icon row */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-white/25">
                  {ind.num}
                </span>
                <span className="text-white/35">
                  {ind.icon}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {ind.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/40">
                  {ind.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                {ind.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded text-white/25"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href="/products" className="btn-primary">
            Explore Products
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/inquiry" className="btn-ghost-light">
            Discuss Your Project
          </Link>
        </div>

      </Container>
    </section>
  );
}
