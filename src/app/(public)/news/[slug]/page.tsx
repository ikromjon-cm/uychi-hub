"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
  views: number;
  author_name: string;
  published_at: string | null;
  created_at: string;
};

function formatDate(str: string | null): string {
  if (!str) return "";
  return str.slice(0, 10);
}

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/news/articles/?slug=${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        const list: Article[] = data.results ?? data;
        const found = list[0] ?? null;
        if (found) setArticle(found);
        else setMissing(true);
      })
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

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
            Yangiliklarga qaytish
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              {article.category}
            </span>
            <time className="text-[12px] text-muted">
              {formatDate(article.published_at || article.created_at)}
            </time>
            {article.author_name && (
              <span className="text-[12px] text-muted">{article.author_name}</span>
            )}
            {article.views > 0 && (
              <span className="text-[12px] text-muted">{article.views} ko&apos;rish</span>
            )}
          </div>

          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-6 text-[15px] leading-relaxed text-muted border-l-2 border-accent/30 pl-4 italic">
              {article.excerpt}
            </p>
          )}

          {article.content && (
            <div className="mt-8 text-[15px] leading-relaxed text-foreground space-y-4 whitespace-pre-line">
              {article.content}
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-border-subtle flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:opacity-70 transition-opacity"
            >
              ← Barcha yangiliklar
            </Link>
            <span className="text-[11px] text-muted">
              {formatDate(article.published_at || article.created_at)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
