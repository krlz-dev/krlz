import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Carlos — a developer building for the web with a focus on performance, usability, and attention to detail.",
  openGraph: {
    title: "About — krlz.dev",
    description:
      "Learn about Carlos — a developer building for the web with a focus on performance, usability, and attention to detail.",
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
