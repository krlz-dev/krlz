"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating coffee cup, pinned to the right edge.
 *
 * Two behaviours, picked by capability rather than screen width — an iPad with
 * a keyboard is wide and has no hover, a touchscreen laptop has both:
 *
 *   hover devices : rests half-tucked off the edge, slides flush on hover.
 *   touch devices : slides in from the right on its own, shows the label for a
 *                   moment, then tucks itself back to a peeking cup.
 *
 * Pressing it does not link out. It smooth-scrolls to the footer, where the
 * real Buy Me a Coffee button lives, and the footer observer then hides the
 * cup — the gesture reads as a hand-off instead of an interruption.
 */
const PEEK_DELAY_MS = 2600;

export default function CoffeeFab() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const ref = useRef<HTMLButtonElement>(null);

  // Capability check, kept in sync if the user docks/undocks a mouse.
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

  // Touch: slide in expanded, then settle into the peeking state.
  useEffect(() => {
    if (canHover) return;
    if (!shown) {
      setOpen(false);
      return;
    }
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), PEEK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [shown, canHover]);

  // Hover devices: reset once it is out of sight.
  useEffect(() => {
    if (canHover && !shown) setOpen(false);
  }, [shown, canHover]);

  const goToFooter = () => {
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
      onClick={goToFooter}
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
