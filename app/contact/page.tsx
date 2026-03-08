import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { DatasheetForm } from "@/components/forms/DatasheetForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata = {
  title: "Contact Us | A-1 Electricals",
  description:
    "Get in touch with A-1 Electricals. Phone, email, and address in Rajkot, Gujarat.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach out for general inquiry, technical support, or sales."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 md:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20 lg:items-start">
            <ScrollReveal className="min-w-0">
              <div className="space-y-8 lg:pr-4">
                <div>
                  <p className="text-[var(--accent)] font-medium text-xs uppercase tracking-[0.2em] mb-3">
                    Address
                  </p>
                  <address className="not-italic">
                    <p className="text-[var(--muted-light)] leading-relaxed">
                      G-1053, Lodhika GIDC Metoda, Kalavad Road, Metoda, Rajkot
                      360021, Gujarat, India
                    </p>
                  </address>
                </div>
                <div>
                  <p className="text-[var(--accent)] font-medium text-xs uppercase tracking-[0.2em] mb-3">
                    Phone
                  </p>
                  <a
                    href="tel:+919374120257"
                    className="block text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    +91 93741 20257
                  </a>
                  <a
                    href="tel:+919374820257"
                    className="block text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    +91 93748 20257
                  </a>
                </div>
                <div>
                  <p className="text-[var(--accent)] font-medium text-xs uppercase tracking-[0.2em] mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:info@a1electricals.com"
                    className="block text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    info@a1electricals.com
                  </a>
                  <a
                    href="mailto:sales@a1electricals.com"
                    className="block text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    sales@a1electricals.com
                  </a>
                  <a
                    href="mailto:nehal@a1electricals.com"
                    className="block text-[var(--foreground)] hover:text-[var(--accent)] transition-colors text-sm text-[var(--muted)]"
                  >
                    nehal@a1electricals.com (Technical)
                  </a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="min-w-0">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--foreground)] tracking-wide mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <Container>
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--foreground)] tracking-wide mb-2">
              Datasheet Download
            </h2>
            <p className="text-[var(--muted)] mb-6">
              Submit the form to unlock the Datasheet and Approvals download.
            </p>
            <DatasheetForm />
          </div>
        </Container>
      </section>
    </>
  );
}
