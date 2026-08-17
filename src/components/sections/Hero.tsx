import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="hero-dot-grid min-h-screen flex items-center relative py-32 pb-24 max-md:py-28 max-md:pb-16">
      <Container className="relative z-1">
        <p className="font-mono text-[0.75rem] font-medium tracking-[0.15em] uppercase text-accent mb-6 opacity-0 animate-fade-slide-up [animation-delay:0.2s]">
          {"// Hello, world"}
          <span className="inline-block w-2 h-3.5 bg-accent ml-1 animate-blink align-middle" />
        </p>
        <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-text-primary mb-6 opacity-0 animate-fade-slide-up [animation-delay:0.4s]">
          Senior Software Engineer
        </h1>
        <p className="font-display text-[clamp(1.2rem,3vw,2rem)] font-normal text-text-secondary mb-8 max-w-[600px] opacity-0 animate-fade-slide-up [animation-delay:0.6s]">
          I design reliable distributed systems and production platforms for healthcare, logistics and data-intensive products.
        </p>
        <p className="text-base text-text-secondary max-w-[680px] mb-8 opacity-0 animate-fade-slide-up [animation-delay:0.7s]">14+ years shipping production software across Chile, Russia, the Netherlands and Bolivia—from system decomposition and Kafka architectures to cloud infrastructure and customer-facing applications.</p>
        <div className="flex flex-wrap gap-4 opacity-0 animate-fade-slide-up [animation-delay:0.8s]">
        <a href="#projects" className="inline-flex items-center gap-3 font-mono text-[0.75rem] font-medium tracking-[0.1em] uppercase text-bg-primary bg-accent py-4 px-8 rounded-sm no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--color-accent-glow)]">
          View selected work
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
        <a href="/Carlos_Rojas_Senior_Software_Engineer_EN.pdf" download className="inline-flex items-center font-mono text-[0.75rem] font-medium tracking-[0.1em] uppercase text-text-primary border border-border py-4 px-8 rounded-sm no-underline transition-all duration-300 hover:border-accent hover:text-accent">Download CV</a>
        <a href="#contact" className="inline-flex items-center font-mono text-[0.75rem] font-medium tracking-[0.1em] uppercase text-text-secondary border border-border py-4 px-8 rounded-sm no-underline transition-all duration-300 hover:border-accent hover:text-text-primary">Contact me</a>
        </div>
      </Container>
      <div className="scroll-hint-line absolute bottom-12 left-8 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-text-muted [writing-mode:vertical-lr] flex items-center gap-4 opacity-0 animate-fade-in [animation-delay:1.5s] max-md:hidden">
        Scroll
      </div>
    </section>
  );
}
