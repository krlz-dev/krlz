"use client";

import { useEffect, useState } from "react";

/**
 * Floating coffee cup, pinned to the right edge.
 *
 * Deliberately plain: a round cup that is always fully visible once the hero
 * is behind us, and scrolls down to the footer when pressed. The footer
 * carries the real Buy Me a Coffee button, so this is an invitation, not the
 * transaction — and it disappears on arrival so the two never compete.
 */
export default function CoffeeFab() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  };

  return (
    <button
      type="button"
      onClick={goToFooter}
      aria-label="Support this work — scroll to the footer"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      title="Buy me a coffee"
      className={[
        "fixed z-50 right-4 top-1/2 max-md:right-3",
        "-mt-6 max-md:-mt-[21px]",
        "grid place-items-center size-12 max-md:size-[42px] rounded-full",
        "bg-[#FFDD00] text-black border-0 cursor-pointer select-none",
        "shadow-[0_2px_10px_rgba(0,0,0,0.25)]",
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
        "hover:scale-110 active:scale-95",
        shown
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none",
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-xl max-md:text-lg leading-none">
        ☕
      </span>
    </button>
  );
}
