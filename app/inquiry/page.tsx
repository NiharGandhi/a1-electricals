"use client";

import { FormEvent, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function InquiryPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("company") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(), // honeypot
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send inquiry.");
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your inquiry right now. Please try again.",
      );
    }
  };

  return (
    <>
      <PageHero
        title="Submit Inquiry"
        subtitle="Send your product or technical inquiry. Our engineering team responds within one business day."
      />

      <section className="py-14 md:py-20 border-b border-[var(--border)]">
        <Container>
          <div className="grid gap-0 lg:grid-cols-[1fr_1.8fr] lg:divide-x divide-[var(--border)]">

            {/* Left sidebar */}
            <div className="pb-10 lg:pb-0 lg:pr-10 flex flex-col gap-0">
              <p className="eyebrow mb-5">How it works</p>

              {[
                { n: "01", title: "Submit inquiry", body: "Describe what you need — product, quantity, voltage grade, and application." },
                { n: "02", title: "Engineering review", body: "Our team reviews specs and selects the right product or proposes a custom solution." },
                { n: "03", title: "Quote & datasheet", body: "You receive a detailed quote with pricing, lead time, and full documentation." },
              ].map((s, i) => (
                <div key={s.n} className={`py-6 ${i < 2 ? "border-b border-[var(--border)]" : ""}`}>
                  <span className="font-mono text-[10px] tracking-widest text-[var(--accent)] block mb-2">{s.n}</span>
                  <p className="text-sm font-semibold text-[var(--foreground)] mb-1">{s.title}</p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{s.body}</p>
                </div>
              ))}

              <div className="pt-6 border-t border-[var(--border)]">
                <p className="eyebrow-muted mb-3">Direct Contact</p>
                <a href="mailto:sales@a1electricals.com" className="block text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                  sales@a1electricals.com
                </a>
                <a href="tel:+919374120257" className="block text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors mt-1">
                  +91 93741 20257
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="pt-10 lg:pt-0 lg:pl-10">
              <p className="eyebrow mb-1">Inquiry Form</p>
              <h2 className="display-md text-[var(--foreground)] mb-1" style={{ fontSize: "clamp(1.4rem,2.5vw,1.8rem)" }}>
                Inquiry Details
              </h2>
              <div className="mt-5 w-full h-px bg-[var(--border)] mb-7" />

              <form
                onSubmit={handleSubmit}
              >
                {/* Contact information */}
                <div className="mb-8">
                  <p className="form-section-heading">Contact Information</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="form-label">Company / Name *</span>
                      <input
                        type="text"
                        name="company"
                        required
                        className="form-input"
                        placeholder="Your company or name"
                      />
                    </label>
                    <label className="block">
                      <span className="form-label">Email *</span>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="your@email.com"
                      />
                    </label>
                    <label className="block">
                      <span className="form-label">Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="+91 ..."
                      />
                    </label>
                  </div>
                </div>

                {/* Product requirements */}
                <div className="mb-8">
                  <p className="form-section-heading">Product &amp; Requirements</p>
                  <div className="grid gap-4">
                    <label className="block">
                      <span className="form-label">Product / Subject</span>
                      <input
                        type="text"
                        name="subject"
                        className="form-input"
                        placeholder="e.g. Shear Bolt Lugs, Cable Cleats, EHV Connectors"
                      />
                    </label>
                    <label className="block">
                      <span className="form-label">Message *</span>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className="form-textarea"
                        placeholder="Include: voltage grade, cable size, quantity, application details, and relevant standards."
                      />
                    </label>
                  </div>
                </div>

                {/* Honeypot field for bot detection */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
                />

                <div className="flex items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className="btn-primary"
                  >
                    {status === "sending"
                      ? "Sending…"
                      : status === "sent"
                        ? "Submitted ✓"
                        : status === "error"
                          ? "Try Again"
                          : "Submit Inquiry"}
                  </button>
                  {status === "sent" && (
                    <span className="text-sm text-[var(--accent)] font-medium">
                      Thank you — we&rsquo;ll respond soon.
                    </span>
                  )}
                  {status === "error" && errorMessage && (
                    <span className="text-sm text-red-500 font-medium">{errorMessage}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
