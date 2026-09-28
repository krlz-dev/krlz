"use client";

import { useEffect, useRef } from "react";

const BMC_SRC = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";

/**
 * Official Buy Me a Coffee button.
 *
 * The upstream script injects a <div> right where it is parsed, so it cannot
 * simply be dropped into JSX. This mounts it into a container ref on the
 * client and cleans up on unmount (React 18 StrictMode runs effects twice in
 * dev, which would otherwise render two buttons).
 */
export default function BuyMeACoffee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    host.innerHTML = "";

    const script = document.createElement("script");
    script.src = BMC_SRC;
    script.async = true;
    script.setAttribute("data-name", "bmc-button");
    script.setAttribute("data-slug", "krlz");
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-emoji", "☕");
    script.setAttribute("data-font", "Cookie");
    script.setAttribute("data-text", "Buy me a coffee");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#000000");
    script.setAttribute("data-coffee-color", "#ffffff");

    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  return <div ref={ref} className="bmc-button-host" />;
}
