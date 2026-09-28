import Link from "next/link";
import BuyMeACoffee from "@/components/ui/BuyMeACoffee";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 flex flex-col items-center gap-8">
        <div className="text-center max-w-[520px]">
          <p className="font-mono text-[0.7rem] text-text-muted tracking-[0.08em] uppercase mb-3">
            Open source
          </p>
          <p className="text-sm text-text-secondary leading-[1.7] mb-6">
            🛠 I build open source dev tools — MCP servers, architecture kits,
            small apps. 🆓 Free forever. If something saved you an afternoon, a
            coffee helps 💛
          </p>
          <BuyMeACoffee />
        </div>

        <div className="w-full flex justify-between items-center pt-8 border-t border-border">
          <p className="font-mono text-[0.7rem] text-text-muted tracking-[0.05em]">
            &copy; {new Date().getFullYear()} krlz
            <span className="text-accent">.dev</span> — Built with care.
          </p>
          <Link
            href="/"
            className="font-mono text-[0.7rem] text-text-muted no-underline tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent flex items-center gap-2"
          >
            Top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
