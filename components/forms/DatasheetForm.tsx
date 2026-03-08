"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DatasheetForm() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const correct = answer.trim() === "4";

  return (
    <form
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        if (correct) setSubmitted(true);
      }}
    >
      <p className="text-[var(--foreground)] font-[family-name:var(--font-display)] text-lg tracking-wide mb-1">
        Datasheet Download
      </p>
      <p className="text-sm text-[var(--muted)] mb-5">
        Answer to verify and unlock the download.
      </p>
      <label className="block mb-5">
        <span className="mb-2 block text-xs text-[var(--muted)] uppercase tracking-wider font-medium">
          2 + 2 = ?
        </span>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
          placeholder="Your answer"
        />
      </label>
      <Button type="submit" disabled={submitted}>
        {submitted ? "Download Unlocked" : "Submit & Unlock"}
      </Button>
      {submitted && (
        <p className="mt-3 text-sm text-[var(--accent)]">
          You can now download the datasheet.
        </p>
      )}
    </form>
  );
}
