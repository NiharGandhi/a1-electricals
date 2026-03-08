import { Container } from "@/components/ui/Container";
import Link from "next/link";

const contactItems = [
  {
    label: "Sales & Inquiries",
    lines: [
      { text: "+91 93741 20257", href: "tel:+919374120257" },
      { text: "+91 93748 20257", href: "tel:+919374820257" },
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.93 12 19.79 19.79 0 0 1 1.86 3.47 2 2 0 0 1 3.84 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    lines: [
      { text: "info@a1electricals.com", href: "mailto:info@a1electricals.com" },
      { text: "sales@a1electricals.com", href: "mailto:sales@a1electricals.com" },
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Factory & Office",
    lines: [
      { text: "G-1053, Lodhika GIDC Metoda" },
      { text: "Kalavad Road, Rajkot 360021" },
      { text: "Gujarat, India" },
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 bg-[var(--dark)]">
      <Container>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="eyebrow-light">Contact</span>
            <h2
              className="display mt-4 text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Get in
              <br />
              <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300 }}>
                Touch
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-white/45 text-sm leading-[1.8] md:text-right">
            Reach our engineering and sales team for product inquiries,
            technical specifications, or custom requirements.
          </p>
        </div>

        {/* Contact cards + CTA */}
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
          {contactItems.map((item) => (
            <div key={item.label} className="card-dark p-7">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 text-[var(--accent)]" style={{ background: "rgba(217,115,32,0.1)", border: "1px solid rgba(217,115,32,0.2)" }}>
                {item.icon}
              </div>
              <p
                className="text-white mb-3"
                style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600 }}
              >
                {item.label}
              </p>
              <div className="space-y-1">
                {item.lines.map((line) =>
                  'href' in line ? (
                    <a
                      key={line.text}
                      href={line.href}
                      className="block text-white/45 hover:text-[var(--accent)] transition-colors text-sm"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p key={line.text} className="text-white/45 text-sm leading-relaxed">
                      {line.text}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="flex flex-col justify-between p-7 rounded-xl md:col-span-3 lg:col-span-1"
            style={{ background: "var(--dark-surface)", border: "1px solid rgba(217,115,32,0.25)" }}
          >
            <div>
              <span className="block w-6 h-[2px] rounded-full mb-5" style={{ background: "var(--accent)" }} />
              <p
                className="text-white mb-3"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 600, lineHeight: 1.2 }}
              >
                Ready to place an order?
              </p>
              <p className="text-white/55 text-sm leading-[1.75]">
                Submit a detailed inquiry and our team will respond within one business day.
              </p>
            </div>
            <Link href="/inquiry" className="btn-primary mt-8 self-start">
              Submit Inquiry
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

      </Container>
    </section>
  );
}
