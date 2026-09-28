"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Floating coffee cup, pinned to the right edge.
 *
 * The cup is a handle you pull, not a link. Press it and it follows your
 * finger leftwards with rubber-band resistance; let go and *then* it scrolls
 * down to the footer, where the real Buy Me a Coffee button lives. Releasing
 * before the commit threshold springs it back — so the gesture is cancellable
 * and nothing happens until you lift.
 *
 * Hover devices also get the resting peek-and-expand on hover. Behaviour is
 * split by capability, not screen width: an iPad with a keyboard is wide and
 * has no hover, a touchscreen laptop has both.
 */
const PEEK_PX = 20; // how far it sits off the edge at rest
const COMMIT_PX = 26; // pull past this and releasing navigates
const MAX_PULL_PX = 40; // rubber band ceiling — keeps the cup anchored to the edge

export default function CoffeeFab() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [pull, setPull] = useState(0);
  const [pressed, setPressed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  // Capability check, kept in sync if a mouse is docked or removed.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Hide while the footer is in view — it carries its own button.
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

  // Reset once out of sight, ready for the next trip up.
  useEffect(() => {
    if (!shown) {
      setOpen(false);
      setPull(0);
      setPressed(false);
    }
  }, [shown]);

  const goToFooter = useCallback(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    footer.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "end",
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    startX.current = e.clientX;
    dragging.current = true;
    setPressed(true);
    setOpen(true);
    // Keep receiving moves even if the finger leaves the button.
    ref.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    const dx = startX.current - e.clientX; // leftwards is positive
    if (dx <= 0) {
      setPull(0);
      return;
    }
    // Rubber band: easy at first, increasingly stiff towards the ceiling.
    const eased = MAX_PULL_PX * (1 - Math.exp(-dx / MAX_PULL_PX));
    setPull(eased);
  };

  const endDrag = (commit: boolean) => {
    dragging.current = false;
    setPressed(false);
    setPull(0);
    if (commit) goToFooter();
    if (!canHover) setOpen(false);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    // A tap counts as a commit; a short pull that never reached the
    // threshold springs back and does nothing.
    endDrag(pull === 0 || pull >= COMMIT_PX);
  };

  const onPointerCancel = () => {
    if (dragging.current) endDrag(false);
  };

  // Keyboard path — pointer events never fire for Enter/Space.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToFooter();
    }
  };

  const hoverHandlers = canHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => !dragging.current && setOpen(false),
      }
    : {};

  const committed = pull >= COMMIT_PX;
  const restX = open ? 0 : PEEK_PX;
  const transform = shown
    ? `translateX(${restX - pull}px) scale(${pressed ? (committed ? 1.04 : 0.98) : 1})`
    : "translateX(110%)";

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Support this work — pull or press to reach the footer"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onKeyDown={onKeyDown}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...hoverHandlers}
      style={{
        transform,
        opacity: shown ? (open ? 1 : 0.9) : 0,
        // While the finger is down the cup must track it with no lag; the
        // spring back on release is what should be animated.
        transition: dragging.current
          ? "none"
          : "transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 300ms ease-out, padding 300ms ease-out",
        touchAction: "pan-y",
      }}
      className={[
        "fixed z-50 right-0 top-1/2 -mt-7",
        "flex items-center h-14 rounded-l-full cursor-grab active:cursor-grabbing",
        "bg-[#FFDD00] text-black border-0 select-none",
        committed
          ? "shadow-[0_6px_24px_rgba(0,0,0,0.34)]"
          : "shadow-[0_4px_16px_rgba(0,0,0,0.28)]",
        open ? "pl-5 pr-5 gap-2.5" : "w-14 pl-3 pr-0 gap-0",
        shown ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-2xl leading-none shrink-0">
        ☕
      </span>
      <span
        className={[
          "whitespace-nowrap font-medium leading-none overflow-hidden",
          "transition-all duration-300",
          open ? "max-w-[170px] opacity-100" : "max-w-0 opacity-0",
        ].join(" ")}
      >
        Buy me a coffee
      </span>
    </button>
  );
}
