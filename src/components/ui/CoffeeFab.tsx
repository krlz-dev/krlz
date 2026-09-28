"use client";

import { useEffect, useState } from "react";

/**
 * Floating coffee cup, pinned bottom-right.
 *
 * Hides itself when the footer scrolls into view (the footer already has its
 * own Buy Me a Coffee button, so showing both is noise), and stays hidden
 * until the user scrolls back up. Also stays hidden at the very top of the
 * page so it doesn't compete with the hero.
 *
 * Respects prefers-reduced-motion: the transition is dropped, not the button.
 */
export default function CoffeeFab() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Hide while the footer is on screen.
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

  // Appear only after the user has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = visible && !footerVisible;

  return (
    <a
      href="https://buymeacoffee.com/krlz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      className={[
        "fixed z-50 right-6 bottom-6 max-md:right-4 max-md:bottom-4",
        "flex items-center gap-2 h-14 rounded-full",
        "bg-[#FFDD00] text-black no-underline",
        "shadow-[0_4px_16px_rgba(0,0,0,0.28)]",
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
        expanded ? "pl-5 pr-6" : "w-14 justify-center px-0",
        shown
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none",
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-2xl leading-none shrink-0">
        ☕
      </span>
      <span
        className={[
          "whitespace-nowrap font-medium leading-none",
          "motion-safe:transition-all motion-safe:duration-200",
          expanded ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0",
          "overflow-hidden",
        ].join(" ")}
      >
        Buy me a coffee
      </span>
    </a>
  );
}
