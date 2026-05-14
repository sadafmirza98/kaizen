import type { MetadataRoute } from "next";
import { tools, playbookTopics } from "@/lib/tools-data";

const BASE_URL = "https://kaizen.tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ai`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/playbook`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}${tool.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: tool.featured ? 0.9 : 0.8,
  }));

  // Playbook pages
  const playbookPages: MetadataRoute.Sitemap = playbookTopics.map((topic) => ({
    url: `${BASE_URL}/playbook/${topic.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...playbookPages];
}
