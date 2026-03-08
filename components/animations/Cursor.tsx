"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("cursor-active");

    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.current = { ...pos.current };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth follow
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      gsap.set(ring, {
        x: pos.current.x,
        y: pos.current.y,
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(dot, {
        x: mouse.current.x,
        y: mouse.current.y,
        xPercent: -50,
        yPercent: -50,
      });
    };
    gsap.ticker.add(tick);

    // Hover effects
    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.3, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.8, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.15 });
    };

    const onEnterCta = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute("data-cursor") || "View";
      label.textContent = text;
      gsap.to(ring, { scale: 3, opacity: 0.15, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 });
    };

    const onLeaveCta = () => {
      onLeaveLink();
    };

    // Magnetic effect on buttons
    const onMagneticMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
    };

    const onMagneticLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    const attachListeners = () => {
      const links = document.querySelectorAll("a:not([data-cursor]), button:not([data-cursor])");
      const ctas = document.querySelectorAll("[data-cursor]");
      const magnetics = document.querySelectorAll("[data-magnetic]");

      links.forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });

      ctas.forEach((el) => {
        el.addEventListener("mouseenter", onEnterCta);
        el.addEventListener("mouseleave", onLeaveCta);
      });

      magnetics.forEach((el) => {
        el.addEventListener("mousemove", onMagneticMove as EventListener);
        el.addEventListener("mouseleave", onMagneticLeave as EventListener);
      });

      return () => {
        links.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterLink);
          el.removeEventListener("mouseleave", onLeaveLink);
        });
        ctas.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterCta);
          el.removeEventListener("mouseleave", onLeaveCta);
        });
        magnetics.forEach((el) => {
          el.removeEventListener("mousemove", onMagneticMove as EventListener);
          el.removeEventListener("mouseleave", onMagneticLeave as EventListener);
        });
      };
    };

    // Re-attach on DOM changes (for dynamic content)
    let cleanup = attachListeners();
    const observer = new MutationObserver(() => {
      cleanup();
      cleanup = attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(tick);
      cleanup();
      observer.disconnect();
      document.body.classList.remove("cursor-active");
    };
  }, [onMouseMove]);

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-[var(--accent)] opacity-80 mix-blend-difference hidden md:flex items-center justify-center"
        aria-hidden
      >
        <span
          ref={labelRef}
          className="text-[8px] font-medium text-[var(--accent)] uppercase tracking-widest opacity-0 scale-75 whitespace-nowrap"
        />
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--accent)] hidden md:block"
        aria-hidden
      />
    </>
  );
}
