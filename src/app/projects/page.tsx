import type { Metadata } from "next";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Carlos — from full-stack web apps to CLI developer tools.",
  openGraph: {
    title: "Projects — krlz.dev",
    description:
      "Explore projects by Carlos — from full-stack web apps to CLI developer tools.",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="pt-24">
      <ProjectsGrid projects={projects} />
    </div>
  );
}
