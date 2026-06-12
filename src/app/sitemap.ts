import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/ai-features`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/schedule`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${base}/apply/investor`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${base}/apply/startup`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/media`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/resources`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${base}/api-docs`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: now,
  }));
}
