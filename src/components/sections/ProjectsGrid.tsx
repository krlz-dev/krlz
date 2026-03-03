import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/types";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 max-md:py-16" id="projects">
      <Container>
        <ScrollReveal>
          <SectionLabel text="03 / Projects" />
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug}>
              <ProjectCard
                number={String(i + 1).padStart(2, "0")}
                title={project.title}
                description={project.description}
                stack={project.stack}
                href={`/projects/${project.slug}`}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
