"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-1000 px-8 py-6 flex justify-between items-center transition-all duration-400 ${
          scrolled
            ? "bg-bg-primary/85 backdrop-blur-[20px] border-b border-border"
            : ""
        }`}
      >
        <Link
          href="/"
          className="font-mono text-[0.85rem] font-semibold text-text-primary no-underline tracking-tight"
        >
          krlz<span className="text-accent">.dev</span>
        </Link>

        <button
          className="md:hidden relative z-[1001] w-7 h-5 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-full h-0.5 bg-text-primary absolute left-0 transition-all duration-300 ${
              menuOpen ? "top-[9px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`block w-full h-0.5 bg-text-primary absolute left-0 top-[9px] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full h-0.5 bg-text-primary absolute left-0 transition-all duration-300 ${
              menuOpen ? "top-[9px] -rotate-45" : "top-[18px]"
            }`}
          />
        </button>

        <ul className="flex gap-10 list-none max-md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link-underline relative font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase text-text-secondary no-underline transition-colors duration-300 hover:text-text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul
        className={`md:hidden fixed inset-0 z-[999] bg-bg-primary/97 backdrop-blur-[20px] flex-col justify-center items-center gap-8 list-none transition-opacity duration-300 ${
          menuOpen
            ? "flex opacity-100 pointer-events-auto"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="nav-link-underline relative font-mono text-base font-medium tracking-[0.1em] uppercase text-text-secondary no-underline transition-colors duration-300 hover:text-text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
