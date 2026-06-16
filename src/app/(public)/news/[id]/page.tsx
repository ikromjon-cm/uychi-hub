"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

type HubNews = {
  id: number;
  title_en: string;
  title_uz: string;
  title_ru: string;
  body_en: string;
  body_uz: string;
  body_ru: string;
  image: string | null;
  images: string[];
  links: { title: string; url: string }[];
  created_at: string;
};

const T = {
  UZ: {
    back: "Yangiliklarga qaytish",
    tag: "Yangilik",
    allNews: "← Barcha yangiliklar",
    images: "Rasmlar",
    links: "Havolalar",
  },
  RU: {
    back: "Вернуться к новостям",
    tag: "Новость",
    allNews: "← Все новости",
    images: "Изображения",
    links: "Ссылки",
  },
  EN: {
    back: "Back to news",
    tag: "News",
    allNews: "← All news",
    images: "Images",
    links: "Links",
  },
} as const;

function formatDate(str: string | null): string {
  if (!str) return "";
  return str.slice(0, 10);
}

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const { lang } = useLang();
  const t = T[lang];
  const [article, setArticle] = useState<HubNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/hub/news/${params.id}/`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data: HubNews) => {
        if (data && data.id) setArticle(data);
        else setMissing(true);
      })
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  const l = lang.toLowerCase() as "en" | "uz" | "ru";
  const title = article ? article[`title_${l}`] || article.title_uz || article.title_en : "";
  const body = article ? article[`body_${l}`] || article.body_uz || article.body_en : "";

  if (missing) notFound();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative border-b border-border-subtle px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="h-4 w-32 animate-pulse rounded-lg bg-card-hover" />
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-card-hover" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-card-hover" />
            <div className="h-4 w-5/6 animate-pulse rounded-lg bg-card-hover" />
            <div className="h-32 w-full animate-pulse rounded-lg bg-card-hover" />
          </div>
        </section>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t.back}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              {t.tag}
            </span>
            <time className="text-[12px] text-muted">
              {formatDate(article.created_at)}
            </time>
          </div>

          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {title}
          </h1>

          {article.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.image} alt={title} className="mt-8 w-full rounded-2xl border border-border object-cover" />
          )}

          {body && (
            <div className="mt-8 text-[15px] leading-relaxed text-foreground space-y-4 whitespace-pre-line">
              {body}
            </div>
          )}

          {article.images?.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-muted">{t.images}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {article.images.map((url, i) => (
                  <img key={i} src={url} alt="" className="aspect-video w-full rounded-xl border border-border object-cover" />
                ))}
              </div>
            </div>
          )}

          {article.links?.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-muted">{t.links}</h3>
              <div className="space-y-2">
                {article.links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-[13px] text-foreground hover:border-accent/30 hover:text-accent transition-colors">
                    <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
                    <span className="flex-1">{link.title || link.url}</span>
                    <svg className="h-3.5 w-3.5 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-border-subtle flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:opacity-70 transition-opacity"
            >
              {t.allNews}
            </Link>
            <span className="text-[11px] text-muted">
              {formatDate(article.created_at)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
