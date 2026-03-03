import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillTag from "@/components/ui/SkillTag";

const categories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Java", "Scala", "Python", "HTML / CSS", "Bash"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Angular", "Svelte", "Vue", "Polymer", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Spring Boot", "Node.js", "Express", "Akka", "Flask", "LangChain", "REST APIs"],
  },
  {
    title: "Data & Messaging",
    skills: ["PostgreSQL", "MySQL", "Redis", "Kafka", "RabbitMQ", "DynamoDB", "ElasticSearch"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "CI/CD", "Linux", "Git"],
  },
  {
    title: "Architecture & Testing",
    skills: ["Microservices", "MVC", "OOD", "Functional Patterns", "OAuth2 / OpenID", "Playwright", "Puppeteer"],
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
