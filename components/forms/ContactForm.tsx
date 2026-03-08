"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <form
      className="max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sending");
        setTimeout(() => setStatus("sent"), 800);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            className={inputClass}
            placeholder="Your name"
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
          Subject
        </span>
        <input
          type="text"
          name="subject"
          className={inputClass}
          placeholder="Subject"
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
          placeholder="Your message"
        />
      </label>
      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"} data-magnetic>
          {status === "sending"
            ? "Sending..."
            : status === "sent"
            ? "Sent"
            : "Send Message"}
        </Button>
        {status === "sent" && (
          <span className="text-sm text-[var(--accent)]">
            Thank you. We&apos;ll be in touch.
          </span>
        )}
      </div>
    </form>
  );
}
