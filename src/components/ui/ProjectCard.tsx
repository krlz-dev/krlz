import Link from "next/link";

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  external?: boolean;
}

export default function ProjectCard({
  number,
  title,
  description,
  stack,
  href,
  external = false,
}: ProjectCardProps) {
  const inner = (
    <>
      <div className="project-card-accent absolute inset-0 overflow-hidden rounded-[14px]" />
      <div className="font-mono text-[0.65rem] font-semibold text-accent tracking-[0.1em] mb-5">
        {number}
      </div>
      <h3 className="font-display text-[1.4rem] font-bold text-text-primary mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-[0.9rem] text-text-secondary leading-[1.7] mb-6">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.65rem] font-medium py-1 px-3 bg-bg-elevated rounded-full text-text-muted tracking-[0.05em]"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.08em] uppercase text-accent mt-6 transition-all duration-300 group-hover:gap-3">
        View project
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
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>
    </>
  );

  const className =
    "group block relative bg-bg-surface border border-border rounded-md p-8 transition-all duration-400 overflow-hidden no-underline hover:border-border-hover hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
