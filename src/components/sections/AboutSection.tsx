import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutSection() {
  return (
    <section className="py-24 max-md:py-16" id="about">
      <Container>
        <ScrollReveal>
          <SectionLabel text="01 / About" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="grid grid-cols-[auto_1fr] gap-14 items-center max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[900px]:justify-items-center max-[900px]:text-center">
            <div className="about-photo-glow relative">
              <img
                src="/assets/profile.png"
                alt="Carlos Rojas — Software Engineer"
                className="w-[220px] h-[220px] object-cover rounded-full border-2 border-border grayscale contrast-[1.05] transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_var(--color-accent-glow),0_20px_60px_rgba(0,0,0,0.4)] hover:grayscale-0 hover:contrast-100 max-[900px]:w-[180px] max-[900px]:h-[180px]"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.3] text-text-primary">
                Hey, I&apos;m <span className="text-accent">Carlos</span> — a software engineer
                with 14+ years specializing in{" "}
                <span className="text-accent">microservices architecture</span> and modern web
                technologies.
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-base text-text-secondary leading-[1.8]">
                  MSc. in Software Engineering from Innopolis University, Russia. I have deep experience
                  across the full software development lifecycle — from cloud-native backends and data
                  modeling to pixel-perfect frontends. I&apos;ve shipped healthcare platforms processing
                  millions of patient records, logistics and telemetry systems, and AI-powered applications.
                </p>
                <p className="text-base text-text-secondary leading-[1.8]">
                  Currently researching and building AI projects with LangChain and RAG architectures
                  for intelligent, scalable, data-driven systems. I thrive on solving complex problems
                  and leading technical initiatives in cross-functional teams.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border max-md:gap-4">
            {[
              { number: "14+", label: "Years Experience" },
              { number: "6", label: "Countries Worked" },
              { number: "∞", label: "Cups of Coffee" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-[2.5rem] font-bold text-accent leading-none max-md:text-[1.8rem]">
                  {stat.number}
                </div>
                <div className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-text-muted mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
