"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300";

export default function InquiryPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <>
      <PageHero
        title="Inquiry"
        subtitle="Send us your product or technical inquiry. We'll get back to you shortly."
      />
      <section className="py-20 md:py-28">
        <Container>
          <form
            className="max-w-2xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("sending");
              setTimeout(() => setStatus("sent"), 800);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                  Company / Name
                </span>
                <input
                  type="text"
                  name="company"
                  required
                  className={inputClass}
                  placeholder="Company or your name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Phone
              </span>
              <input
                type="tel"
                name="phone"
                className={inputClass}
                placeholder="+91 ..."
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Product / Subject
              </span>
              <input
                type="text"
                name="subject"
                className={inputClass}
                placeholder="e.g. Shear Bolt Lugs, Cable Cleats, EHV Connectors"
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                required
                className={`${inputClass} resize-y`}
                placeholder="Your inquiry details"
              />
            </label>
            <div className="mt-8 flex items-center gap-4">
              <Button type="submit" disabled={status === "sending"} data-magnetic>
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                  ? "Submitted"
                  : "Submit Inquiry"}
              </Button>
              {status === "sent" && (
                <span className="text-sm text-[var(--accent)]">
                  Thank you. We&apos;ll respond soon.
                </span>
              )}
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
