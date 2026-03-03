interface ContactLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}

export default function ContactLink({
  href,
  label,
  icon,
  external = false,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      className="font-mono text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-secondary no-underline py-3.5 px-7 border border-border rounded-sm transition-all duration-300 inline-flex items-center gap-2.5 hover:border-accent hover:text-accent hover:bg-accent-dim hover:-translate-y-0.5"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      {label}
    </a>
  );
}
