import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project } from "./types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getProjectBySlug(slug: string): Project {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    stack: data.stack || [],
    url: data.url || "",
    date: data.date,
    featured: data.featured || false,
    content,
  };
}

export async function getProjectHtml(slug: string): Promise<string> {
  const project = getProjectBySlug(slug);
  const result = await remark().use(html).process(project.content);
  return result.toString();
}
