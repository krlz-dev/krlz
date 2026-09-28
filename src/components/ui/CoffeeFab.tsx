"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating coffee cup, pinned to the right edge.
 *
 * Rests half-tucked off the edge so it stays out of the way while reading,
 * and slides fully in when hovered or tapped. On touch devices there is no
 * hover, so the first tap opens it and the second one follows the link —
 * otherwise a peeking button would navigate on an accidental brush.
 *
 * Hides itself while the footer is on screen, since the footer carries its
 * own Buy Me a Coffee button.
 */
export default function CoffeeFab() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  // Hide while the footer is in view.
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

  // Tapping elsewhere tucks it back in.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const shown = scrolled && !footerVisible;

  const handleClick = (e: React.MouseEvent) => {
    // Touch devices get no hover, so the first tap only reveals the button.
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <a
      ref={ref}
      href="https://buymeacoffee.com/krlz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onClick={handleClick}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={[
        "fixed z-50 right-0 top-1/2 -mt-7",
        "flex items-center h-14 rounded-l-full",
        "bg-[#FFDD00] text-black no-underline select-none",
        "shadow-[0_4px_16px_rgba(0,0,0,0.28)]",
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
        open ? "pl-5 pr-5 gap-2.5" : "w-14 pl-3 pr-0 gap-0",
        // Resting state peeks out; opening slides it flush with the edge.
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
    </a>
  );
}
