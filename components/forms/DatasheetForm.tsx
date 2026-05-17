"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type DownloadResponse = {
  error?: string;
};

export function DatasheetForm({ embedded = false }: { embedded?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [formStartedAt] = useState(() => Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      formStartedAt,
    };

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/catalogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as DownloadResponse;
      if (!response.ok) {
        throw new Error(result.error ?? "Unable to process request.");
      }

      form.reset();
      setStatus("sent");
      setMessage("Catalogue links sent to your email.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to process your request right now. Please try again.",
      );
    }
  };

  return (
    <form
      className={
        embedded
          ? "bg-transparent p-0 max-w-none"
          : "border border-[var(--border)] bg-[var(--surface)] p-7 max-w-md"
      }
      onSubmit={handleSubmit}
    >
      {!embedded ? <span className="block h-[2px] w-8 bg-[var(--accent)] mb-4" /> : null}
      <p className="text-[var(--foreground)] font-[family-name:var(--font-display)] text-lg tracking-wide mb-1 uppercase">
        Catalogue Download
      </p>
      <p className="text-sm text-[var(--muted)] mb-5">
        Enter name and email. We will send the catalogue to your inbox.
      </p>
      <label className="block mb-4">
        <span className="form-label">Name *</span>
        <input
          type="text"
          name="name"
          required
          className="form-input"
          placeholder="Your name"
        />
      </label>
      <label className="block mb-5">
        <span className="form-label">Work Email *</span>
        <input
          type="email"
          name="email"
          required
          className="form-input"
          placeholder="you@company.com"
        />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
      />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Catalogue"}
      </Button>
      {message && (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-500" : "text-[var(--accent)]"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
