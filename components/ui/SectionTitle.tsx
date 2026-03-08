import type { ReactNode } from "react";

interface SectionTitleProps {
  overline?: string;
  title: string;
  subtitle?: ReactNode;
  className?: string;
  align?: "center" | "left";
  /** Use light variant for dark backgrounds */
  light?: boolean;
}

export function SectionTitle({
  overline,
  title,
  subtitle,
  className = "",
  align = "center",
  light = false,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = light ? "text-white" : "text-[var(--foreground)]";
  const subtitleColor = light ? "text-white/60" : "text-[var(--muted)]";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {overline && (
        <span className="inline-block text-[var(--accent)] font-medium tracking-[0.25em] uppercase text-xs mb-4">
          {overline}
        </span>
      )}
      <h2 className={`font-(family-name:--font-display) text-4xl sm:text-5xl md:text-6xl tracking-wide ${titleColor} leading-tight`}>
        {title}
      </h2>
      <div
        className={`mt-4 h-[2px] w-16 bg-[var(--accent)] origin-left ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <div className={`mt-5 ${subtitleColor} text-lg leading-relaxed`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
