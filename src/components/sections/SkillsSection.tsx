import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillTag from "@/components/ui/SkillTag";

const categories = [
  {
    title: "Frontend",
    skills: ["TypeScript", "React", "Angular", "Next.js", "Tailwind CSS", "HTML / CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL", "Docker"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "AWS", "Linux", "CI/CD", "Figma", "Supabase"],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-24 max-md:py-16" id="skills">
      <Container>
        <ScrollReveal>
          <SectionLabel text="02 / Tech Stack" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 mt-8 max-md:grid-cols-1">
            {categories.map((cat) => (
              <div key={cat.title}>
                <h3 className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-muted mb-4 pb-3 border-b border-border">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill) => (
                    <SkillTag key={skill} name={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
