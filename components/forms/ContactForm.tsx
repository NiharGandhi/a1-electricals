"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send message.");
      }

      form.reset();
      setStatus("sent");
      setMessage("Thank you. We'll be in touch.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now. Please try again.",
      );
    }
  };

  return (
    <form className="max-w-xl" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="form-label">Name *</span>
          <input
            type="text"
            name="name"
            required
            className="form-input"
            placeholder="Your name"
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
      </div>
      <label className="mt-4 block">
        <span className="form-label">Subject</span>
        <input
          type="text"
          name="subject"
          className="form-input"
          placeholder="Brief subject of inquiry"
        />
      </label>
      <label className="mt-4 block">
        <span className="form-label">Message *</span>
        <textarea
          name="message"
          rows={5}
          required
          className="form-textarea"
          placeholder="Your message"
        />
      </label>
      {/* Honeypot field for bot detection */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
      />
      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"} data-magnetic>
          {status === "sending"
            ? "Sending..."
            : status === "sent"
            ? "Sent"
            : status === "error"
            ? "Try Again"
            : "Send Message"}
        </Button>
        {message && (
          <span
            className={
              status === "error"
                ? "text-sm text-red-500"
                : "text-sm text-[var(--accent)]"
            }
          >
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
