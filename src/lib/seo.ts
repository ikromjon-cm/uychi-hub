import type { Metadata } from "next";
import { SITE } from "./constants";

interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata(page?: PageSEO): Metadata {
  const title = page?.title ? `${page.title} — ${SITE.name}` : `${SITE.name} — Namangan viloyatidagi IT va Sun'iy Intellekt Markazi`;
  const description = page?.description ?? SITE.description;
  const keywords = [...SITE.keywords, ...(page?.keywords ?? [])];
  const ogImage = page?.ogImage ?? SITE.ogImage;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    metadataBase: new URL(SITE.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE.url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@uychi_hub",
    },
    robots: page?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: SITE.url,
    },
  };
}
