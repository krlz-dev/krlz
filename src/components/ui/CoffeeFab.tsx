"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating coffee cup, pinned to the right edge.
 *
 * Behaviour is split by capability rather than screen width — an iPad with a
 * keyboard is wide and has no hover, a touchscreen laptop has both:
 *
 *   hover devices : rests half-tucked off the edge, slides flush on hover.
 *   touch devices : stays tucked until tapped. The first tap slides it in and
 *                   reveals the label, the second scrolls to the footer.
 *
 * Nothing moves on its own, and pressing it never links out: it smooth-scrolls
 * to the footer, where the real Buy Me a Coffee button lives, and the footer
 * observer then hides the cup.
 */
export default function CoffeeFab() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const ref = useRef<HTMLButtonElement>(null);

  // Capability check, kept in sync if the user docks or undocks a mouse.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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

  const shown = scrolled && !footerVisible;

  // Reset once it is out of sight, ready for the next trip up.
  useEffect(() => {
    if (!shown) setOpen(false);
  }, [shown]);

  // Touch: pressing anywhere else tucks it back in.
  useEffect(() => {
    if (canHover || !open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, canHover]);

  const handleClick = () => {
    // Touch devices get no hover, so the first tap only slides it in.
    if (!canHover && !open) {
      setOpen(true);
      return;
    }
    const footer = document.querySelector("footer");
    if (!footer) return;
    setOpen(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    footer.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "end",
    });
  };

  const hoverHandlers = canHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
    : {};

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Support this work — scroll to the footer"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onClick={handleClick}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...hoverHandlers}
      className={[
        "fixed z-50 right-0 top-1/2 -mt-7",
        "flex items-center h-14 rounded-l-full cursor-pointer",
        "bg-[#FFDD00] text-black border-0 select-none",
        "shadow-[0_4px_16px_rgba(0,0,0,0.28)]",
        "motion-safe:transition-all motion-safe:duration-[420ms] motion-safe:ease-out",
        open ? "pl-5 pr-5 gap-2.5" : "w-14 pl-3 pr-0 gap-0",
        shown
          ? open
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-90 translate-x-5 pointer-events-auto"
          : "opacity-0 translate-x-full pointer-events-none",
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-2xl leading-none shrink-0">
        ☕
      </span>
      <span
        className={[
          "whitespace-nowrap font-medium leading-none overflow-hidden",
          "motion-safe:transition-all motion-safe:duration-300",
          open ? "max-w-[170px] opacity-100" : "max-w-0 opacity-0",
        ].join(" ")}
      >
        Buy me a coffee
      </span>
    </button>
  );
}
