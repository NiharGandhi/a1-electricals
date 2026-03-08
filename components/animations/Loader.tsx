"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val).toString();
        }
      },
    })
      .to(
        ".loader-bar",
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        0
      )
      .to(".loader-counter", { opacity: 0, y: -30, duration: 0.4 }, "-=0.1")
      .to(".loader-brand", { opacity: 0, y: -20, duration: 0.3 }, "-=0.3")
      .to(
        ".loader-panel-top",
        { yPercent: -100, duration: 0.4, ease: "power4.inOut" },
        "-=0.1"
      )
      .to(
        ".loader-panel-bottom",
        { yPercent: 100, duration: 0.4, ease: "power4.inOut" },
        "<"
      );
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden
    >
      <div className="loader-panel-top absolute inset-x-0 top-0 h-1/2 bg-white" />
      <div className="loader-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-white" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="loader-brand font-[family-name:var(--font-display)] text-sm tracking-[0.4em] text-[var(--muted)] uppercase mb-6">
          A-1 Electricals
        </span>
        <div className="loader-counter font-[family-name:var(--font-display)] text-[clamp(4rem,15vw,10rem)] leading-none text-[var(--accent)] tabular-nums">
          <span ref={counterRef}>0</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden z-10">
        <div
          className="loader-bar h-full w-full origin-left bg-[var(--accent)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
