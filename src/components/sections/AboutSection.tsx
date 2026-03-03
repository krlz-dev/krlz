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
                alt="Carlos — Developer"
                className="w-[220px] h-[220px] object-cover rounded-full border-2 border-border grayscale contrast-[1.05] transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_var(--color-accent-glow),0_20px_60px_rgba(0,0,0,0.4)] hover:grayscale-0 hover:contrast-100 max-[900px]:w-[180px] max-[900px]:h-[180px]"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.3] text-text-primary">
                Hey, I&apos;m <span className="text-accent">Carlos</span> — a developer
                building for the web with a focus on{" "}
                <span className="text-accent">performance</span>, usability, and attention
                to detail.
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-base text-text-secondary leading-[1.8]">
                  I&apos;m a developer passionate about transforming ideas into reliable,
                  well-crafted software. I enjoy working across the full stack — from
                  pixel-perfect interfaces to robust backend systems.
                </p>
                <p className="text-base text-text-secondary leading-[1.8]">
                  I value clean architecture, thoughtful abstractions, and shipping software
                  that actually solves problems. Always learning, always iterating.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border max-md:gap-4">
            {[
              { number: "5+", label: "Years Experience" },
              { number: "20+", label: "Projects Shipped" },
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
