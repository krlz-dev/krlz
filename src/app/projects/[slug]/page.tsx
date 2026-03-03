import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getProjectBySlug, getProjectSlugs, getProjectHtml } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — krlz.dev`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const contentHtml = await getProjectHtml(slug);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.description,
    datePublished: project.date,
    dateModified: project.date,
    url: `https://krlz.dev/projects/${slug}`,
    author: {
      "@type": "Person",
      "@id": "https://krlz.dev/#person",
      name: "Carlos Rojas",
      url: "https://krlz.dev",
    },
    keywords: project.stack.join(", "),
  };

  return (
    <div className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Container className="max-w-[800px]">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-text-muted no-underline mb-12 transition-colors duration-300 hover:text-accent"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to projects
        </Link>

        <div className="font-mono text-[0.65rem] font-semibold text-accent tracking-[0.1em] mb-4">
          {project.date}
        </div>

        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-tight text-text-primary mb-6">
          {project.title}
        </h1>

        <p className="text-lg text-text-secondary leading-[1.7] mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.65rem] font-medium py-1 px-3 bg-bg-elevated rounded-full text-text-muted tracking-[0.05em]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[0.75rem] font-medium tracking-[0.08em] uppercase text-accent mb-12 no-underline transition-all duration-300 hover:gap-3"
          >
            View on GitHub
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
          </a>
        )}

        {contentHtml && (
          <div className="border-t border-border pt-12">
            <div
              className="prose prose-invert prose-project max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
