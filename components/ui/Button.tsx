"use client";

import { type ReactNode, forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-cursor"?: string;
  "data-magnetic"?: boolean | string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--gold)] text-white border border-[var(--gold)] hover:bg-[var(--gold-dim)] hover:border-[var(--gold-dim)] hover:shadow-[0_4px_20px_var(--gold-glow)]",
  outline:
    "bg-transparent text-[var(--gold)] border border-[var(--gold)] hover:bg-[var(--gold)] hover:text-white hover:shadow-[0_4px_20px_var(--gold-glow)]",
  ghost:
    "bg-transparent text-[var(--foreground)] border border-[var(--border-strong)] hover:border-[var(--gold)] hover:text-[var(--gold)]",
};

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function Button(
    { children, href, variant = "primary", className = "", onClick, type = "button", disabled = false, ...rest },
    ref
  ) {
    const base =
      "inline-flex items-center justify-center gap-1.5 rounded-full px-[1.375rem] py-[0.625rem] text-[0.6875rem] font-bold tracking-[0.12em] uppercase transition-all duration-200 hover:-translate-y-px active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const styles = `${base} ${variantStyles[variant]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={styles} ref={ref as React.Ref<HTMLAnchorElement>} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <button type={type} className={styles} onClick={onClick} disabled={disabled} ref={ref as React.Ref<HTMLButtonElement>} {...rest}>
        {children}
      </button>
    );
  }
);
