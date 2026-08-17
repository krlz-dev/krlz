import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ContactSection from "@/components/sections/ContactSection";
import Container from "@/components/ui/Container";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const selectedProjectSlugs = [
    "tracktec-logistics",
    "dvza-healthcare-platform",
    "kit-a",
    "zoo-minder",
    "econstitucional",
  ];
  const projects = getAllProjects()
    .filter((project) => selectedProjectSlugs.includes(project.slug))
    .sort(
      (a, b) =>
        selectedProjectSlugs.indexOf(a.slug) - selectedProjectSlugs.indexOf(b.slug),
    );

  return (
    <main>
      <Hero />
      <article>
        <AboutSection />
        <section className="py-24 max-md:py-16" id="ownership">
          <Container>
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-accent mb-6">Technical ownership</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight max-w-[760px]">Clarity, context and durable technical decisions.</h2>
            <p className="text-base text-text-secondary leading-[1.8] max-w-[760px] mt-6">I work through clarity, context and technical ownership. I help teams understand the problem, contribute to durable architectural decisions and deliver incrementally without losing sight of reliability. I am comfortable moving between system design, implementation, code reviews, incident analysis and mentoring.</p>
            <p className="text-base text-text-secondary leading-[1.8] max-w-[760px] mt-5"><strong className="text-text-primary">Currently:</strong> building logistics and telemetry products at Tracktec, exploring AI-assisted development and retrieval-augmented systems, and developing independent products and architecture tools.</p>
          </Container>
        </section>
        <SkillsSection />
        <ProjectsGrid projects={projects} />
      </article>
      <ContactSection />
    </main>
  );
}
