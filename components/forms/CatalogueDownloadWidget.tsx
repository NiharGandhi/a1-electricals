"use client";

import { useEffect, useState } from "react";
import { DatasheetForm } from "@/components/forms/DatasheetForm";

export function CatalogueDownloadWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[66] pointer-events-none transition-all duration-700">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            open
              ? "pointer-events-auto bg-black/65 opacity-100 backdrop-blur-[2px]"
              : "pointer-events-none bg-black/0 opacity-0 backdrop-blur-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`group pointer-events-auto absolute right-0 top-0 h-full w-full max-w-xl origin-right overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            open
              ? "scale-x-100 scale-y-100 border-l border-[var(--border)] bg-[var(--background-alt)] shadow-[-20px_0_60px_rgba(0,0,0,0.35)]"
              : "scale-x-[0.095] scale-y-[0.22] border border-r-0 border-[var(--accent)] bg-[var(--accent)]/95 shadow-xl"
          }`}
          onClick={(event) => {
            event.stopPropagation();
            if (!open) setOpen(true);
          }}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-label={open ? "Catalogue download form" : "Download catalogue"}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center origin-center [writing-mode:vertical-rl] [text-orientation:mixed] text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 ${
              open
                ? "opacity-0 scale-100"
                : "opacity-100 scale-x-[10.5] scale-y-[4.55]"
            }`}
          >
            Download Catalogue
          </span>

          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[var(--accent)]/80" />
            <div
              className={`flex items-center justify-between border-b border-[var(--border)] px-6 py-5 transition-all duration-500 ${
                open ? "translate-x-0 opacity-100 delay-150" : "translate-x-3 opacity-0 delay-0"
              }`}
            >
              <div>
                <p className="eyebrow mb-2">A-1 Electricals</p>
                <p className="display-md text-[var(--foreground)] text-lg">Download Catalogue</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border border-[var(--border)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label="Close catalogue modal"
              >
                Close
              </button>
            </div>
            <div
              className={`h-[calc(100%-86px)] overflow-y-auto p-6 sm:p-8 transition-all duration-500 ${
                open ? "translate-x-0 opacity-100 delay-200" : "translate-x-4 opacity-0 delay-0"
              }`}
            >
              <p className="mb-6 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Get catalogue PDFs delivered to your inbox.
              </p>
              <DatasheetForm embedded />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
