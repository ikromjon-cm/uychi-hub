import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  return [
    { url: base,                     priority: 1.0,  changeFrequency: "weekly"  as const, lastModified: now },
    { url: `${base}/startups`,       priority: 0.9,  changeFrequency: "daily"   as const, lastModified: now },
    { url: `${base}/news`,           priority: 0.9,  changeFrequency: "daily"   as const, lastModified: now },
    { url: `${base}/education`,      priority: 0.85, changeFrequency: "weekly"  as const, lastModified: now },
    { url: `${base}/events`,         priority: 0.85, changeFrequency: "weekly"  as const, lastModified: now },
    { url: `${base}/jobs`,           priority: 0.85, changeFrequency: "weekly"  as const, lastModified: now },
    { url: `${base}/partners`,       priority: 0.8,  changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/investors`,      priority: 0.8,  changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/companies`,      priority: 0.8,  changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/ai-center`,      priority: 0.8,  changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/ai-features`,    priority: 0.75, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/apply/startup`,  priority: 0.85, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/apply/investor`, priority: 0.85, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/schedule`,       priority: 0.75, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/media`,          priority: 0.7,  changeFrequency: "monthly" as const, lastModified: now },
    { url: `${base}/library`,        priority: 0.7,  changeFrequency: "weekly"  as const, lastModified: now },
    { url: `${base}/privacy`,        priority: 0.3,  changeFrequency: "yearly"  as const, lastModified: now },
  ];
}
