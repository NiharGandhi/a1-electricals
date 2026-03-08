"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

const inputClass =
  "w-full border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/40 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-0 transition-all duration-200 text-sm";

const labelClass = "block text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)] mb-1.5";

export default function InquiryPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

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
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus("sending");
                  setTimeout(() => setStatus("sent"), 800);
                }}
              >
                {/* Contact information */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] pb-3 border-b border-[var(--border)] mb-5">
                    Contact Information
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>Company / Name *</span>
                      <input type="text" name="company" required className={inputClass} placeholder="Your company or name" />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Email *</span>
                      <input type="email" name="email" required className={inputClass} placeholder="your@email.com" />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Phone</span>
                      <input type="tel" name="phone" className={inputClass} placeholder="+91 ..." />
                    </label>
                  </div>
                </div>

                {/* Product requirements */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] pb-3 border-b border-[var(--border)] mb-5">
                    Product &amp; Requirements
                  </p>
                  <div className="grid gap-4">
                    <label className="block">
                      <span className={labelClass}>Product / Subject</span>
                      <input
                        type="text"
                        name="subject"
                        className={inputClass}
                        placeholder="e.g. Shear Bolt Lugs, Cable Cleats, EHV Connectors"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Message *</span>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className={`${inputClass} resize-y`}
                        placeholder="Include: voltage grade, cable size, quantity, application details, and relevant standards."
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className="btn-primary"
                  >
                    {status === "sending" ? "Sending…" : status === "sent" ? "Submitted ✓" : "Submit Inquiry"}
                  </button>
                  {status === "sent" && (
                    <span className="text-sm text-[var(--accent)] font-medium">
                      Thank you — we&rsquo;ll respond soon.
                    </span>
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
