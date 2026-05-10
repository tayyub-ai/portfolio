import data from '@/content/portfolio.json';

export type PersonalInfo = typeof data.personalInfo;
export type Metric = (typeof data.metrics)[number];
export type Experience = (typeof data.experience)[number];
export type Education = (typeof data.education)[number];
export type Publication = (typeof data.publications)[number];
export type Client = (typeof data.notableClients)[number];
export type Project = (typeof data.projects)[number];
export type TechItem = (typeof data.techStack)[number];

export const portfolio = data;

export function getFeaturedProjects(): Project[] {
  return data.projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return data.projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return data.projects.map((p) => p.slug);
}

export function getTechStackByCategory(): Record<string, TechItem[]> {
  return data.techStack.reduce<Record<string, TechItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}

export const SITE_URL = 'https://www.tayyubyaqoob.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
