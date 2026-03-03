import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Carlos Rojas — MSc. Software Engineer with 14+ years of experience in full-stack development, microservices architecture, and AI applications.",
  openGraph: {
    title: "About — krlz.dev",
    description:
      "Carlos Rojas — MSc. Software Engineer with 14+ years of experience in full-stack development, microservices architecture, and AI applications.",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutSection />
      <SkillsSection />
    </div>
  );
}
