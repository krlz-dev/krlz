import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ContactSection from "@/components/sections/ContactSection";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </>
  );
}
