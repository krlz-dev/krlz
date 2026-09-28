"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating coffee cup, pinned to the right edge.
 *
 * It does not link out. Pressing it scrolls to the footer, where the real
 * Buy Me a Coffee button lives — so the cup is an invitation, not the
 * transaction. The footer observer then tucks it away on arrival, which makes
 * the gesture feel like the button handed you off.
 *
 * Rests half-tucked off the edge so it stays out of the reading column and
 * slides flush on hover/focus. Honours prefers-reduced-motion for both the
 * transition and the scroll.
 */
export default function CoffeeFab() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  // Hide while the footer is in view — it has its own button.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Appear only once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pressing outside tucks it back in (touch devices have no mouseleave).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const shown = scrolled && !footerVisible;

  const goToFooter = () => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    footer.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "end",
    });
    setOpen(false);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Support this work — scroll to the footer"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onClick={goToFooter}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={[
        "fixed z-50 right-0 top-1/2 -mt-7",
        "flex items-center h-14 rounded-l-full cursor-pointer",
        "bg-[#FFDD00] text-black border-0 select-none",
        "shadow-[0_4px_16px_rgba(0,0,0,0.28)]",
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
        open ? "pl-5 pr-5 gap-2.5" : "w-14 pl-3 pr-0 gap-0",
        shown
          ? open
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-90 translate-x-5 pointer-events-auto"
          : "opacity-0 translate-x-16 pointer-events-none",
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-2xl leading-none shrink-0">
        ☕
      </span>
      <span
        className={[
          "whitespace-nowrap font-medium leading-none overflow-hidden",
          "motion-safe:transition-all motion-safe:duration-200",
          open ? "max-w-[170px] opacity-100" : "max-w-0 opacity-0",
        ].join(" ")}
      >
        Buy me a coffee
      </span>
    </button>
  );
}
