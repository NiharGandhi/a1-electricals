import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { DatasheetForm } from "@/components/forms/DatasheetForm";

export const metadata = {
  title: "Contact Us | A-1 Electricals",
  description:
    "Contact A-1 Electricals — phone, email, and address in Rajkot, Gujarat, India. Reach our sales and technical engineering team.",
  openGraph: {
    title: "Contact A-1 Electricals | Power Cable Accessories Manufacturer",
    description: "Get in touch with our sales and engineering team in Rajkot, Gujarat.",
    images: [{ url: "/landing.png", width: 1200, height: 630, alt: "A-1 Electricals" }],
  },
};

const contactItems = [
  {
    label: "Address",
    lines: [
      "G-1053, Lodhika GIDC Metoda",
      "Kalavad Road, Metoda",
      "Rajkot 360021, Gujarat, India",
    ],
    links: null,
  },
  {
    label: "Phone",
    lines: null,
    links: [
      { href: "tel:+919374120257", text: "+91 93741 20257" },
      { href: "tel:+919374820257", text: "+91 93748 20257" },
    ],
  },
  {
    label: "Email",
    lines: null,
    links: [
      { href: "mailto:info@a1electricals.com", text: "info@a1electricals.com" },
      { href: "mailto:sales@a1electricals.com", text: "sales@a1electricals.com" },
      { href: "mailto:nehal@a1electricals.com", text: "nehal@a1electricals.com (Technical)" },
    ],
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 – 18:00 IST" },
  { day: "Saturday", time: "9:00 – 14:00 IST" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach out for general inquiry, technical support, or sales."
      />

      <section className="py-14 md:py-20 border-b border-[var(--border)]">
        <Container>
          <div className="grid gap-0 lg:grid-cols-[1fr_1.4fr] lg:divide-x divide-[var(--border)]">

            {/* Left: contact info */}
            <div className="pb-10 lg:pb-0 lg:pr-12 flex flex-col gap-0">
              <p className="eyebrow mb-5">Direct Contact</p>

              {contactItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`py-6 ${i < contactItems.length - 1 ? "border-b border-[var(--border)]" : ""}`}
                >
                  <p className="eyebrow-muted mb-3">{item.label}</p>
                  {item.lines && (
                    <address className="not-italic text-sm text-[var(--muted-light)] leading-relaxed">
                      {item.lines.map((l, j) => (
                        <span key={j} className="block">{l}</span>
                      ))}
                    </address>
                  )}
                  {item.links && (
                    <div className="flex flex-col gap-1">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: form */}
            <div className="pt-10 lg:pt-0 lg:pl-12">
              <p className="eyebrow mb-2">Send a Message</p>
              <h2 className="display-md text-[var(--foreground)] mb-1" style={{ fontSize: "clamp(1.4rem,2.5vw,1.8rem)" }}>
                We respond within 1 business day
              </h2>
              <div className="mt-5 w-full h-px bg-[var(--border)] mb-7" />
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Datasheet */}
      <section className="py-14 md:py-20 bg-[var(--dark)]">
        <Container>
          <div className="grid gap-0 lg:grid-cols-2 lg:divide-x divide-white/8">
            <div className="pb-10 lg:pb-0 lg:pr-12">
              <span className="block w-8 h-[2px] bg-[var(--accent)] mb-6" />
              <h2 className="display text-white mb-3" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
                Datasheet Download
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-7 font-light max-w-sm">
                Submit the form to unlock the full Datasheet and Approvals download — available as PDF for all product ranges.
              </p>
              <div className="flex flex-col gap-2">
                {["Product Datasheets (PDF)", "Approval Certificates", "Technical Specifications", "Installation Guides"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-white/8 last:border-0">
                    <span className="text-[var(--accent)] text-xs font-bold">→</span>
                    <span className="text-sm text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-10 lg:pt-0 lg:pl-12">
              <DatasheetForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
