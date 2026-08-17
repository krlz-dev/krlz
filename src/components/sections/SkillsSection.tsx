import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillTag from "@/components/ui/SkillTag";

const categories = [
  {
    title: "Leadership & architecture",
    skills: ["Engineering strategy", "Technical roadmaps", "Team mentoring", "Architecture reviews", "System decomposition", "Distributed systems", "Event-driven architecture"],
  },
  {
    title: "Platform engineering",
    skills: ["Java / Spring Boot", "Scala / Akka", "Kafka / Kafka Streams", "PostgreSQL / Redis", "AWS / CDK", "Docker / Kubernetes", "CI/CD"],
  },
  {
    title: "Product delivery",
    skills: ["TypeScript", "React / Next.js", "Angular", "Flutter", "Testing and quality", "Performance", "Observability"],
  },
  {
    title: "Core tools",
    skills: ["Python", "Node.js", "REST APIs", "Redis", "Linux", "Git", "OAuth2 / OpenID"],
  },

];

export default function SkillsSection() {
  return (
    <section className="py-24 max-md:py-16" id="skills">
      <Container>
        <ScrollReveal>
          <SectionLabel text="02 / Capabilities" />
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
