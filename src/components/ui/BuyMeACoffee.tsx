/**
 * Buy Me a Coffee button.
 *
 * The official BMC widget script uses document.writeln(), which only works
 * while the document is still parsing. Injecting it after hydration (from a
 * useEffect, as any React app must) makes the call a silent no-op, so the
 * button never appears.
 *
 * This renders the same button as a plain anchor: no third-party script, no
 * external request on page load, and it works with SSG.
 */
export default function BuyMeACoffee() {
  return (
    <a
      href="https://buymeacoffee.com/krlz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      className="inline-flex items-center gap-2.5 py-3 px-6 rounded-lg border border-black/80 bg-[#FFDD00] text-black no-underline transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        ☕
      </span>
      <span className="text-[1.05rem] font-medium leading-none tracking-[0.01em]">
        Buy me a coffee
      </span>
    </a>
  );
}
