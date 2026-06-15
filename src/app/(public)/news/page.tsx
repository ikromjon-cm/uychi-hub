"use client";

import { useState } from "react";
import Link from "next/link";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { CardArt } from "@/components/ui/CardArt";

type NewsItem = {
  id: number;
  title_en: string;
  title_uz: string;
  title_ru: string;
  body_en: string;
  body_uz: string;
  body_ru: string;
  image: string | null;
  created_at: string;
};

const ACCENTS = ["cyan", "violet", "emerald"] as const;
type AccentKey = typeof ACCENTS[number];

const A: Record<AccentKey, { badge: string; dot: string; text: string; border: string }> = {
  cyan:    { badge: "bg-accent/10 text-accent border-accent/20",    dot: "bg-accent",    text: "text-accent",    border: "border-accent/20 hover:border-accent/40" },
  violet:  { badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", dot: "bg-violet-400",  text: "text-violet-400",  border: "border-violet-400/20 hover:border-violet-400/40" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", dot: "bg-emerald-400", text: "text-emerald-400", border: "border-emerald-400/20 hover:border-emerald-400/40" },
};

function getAccent(index: number): AccentKey {
  return ACCENTS[index % 3];
}

function formatDate(str: string | null): string {
  if (!str) return "";
  return str.slice(0, 10);
}

export default function NewsPage() {
  const { lang } = useLang();
  const { data: allArticles, loading } = useApi<NewsItem[]>("/hub/news/", []);
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [search, setSearch] = useState("");

  const filtered = allArticles.filter((n) => {
    const title = n[`title_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || n.title_en;
    const body = n[`body_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || n.body_en;
    const matchCat = activeCategory === "Barchasi";
    const matchSearch = !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      body.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">/ IT Yangiliklar Portali</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi IT Ekotizimidan<br />
            <span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">So'nggi Yangiliklar</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Uychi districtidagi IT park, startaplar, ta&apos;lim dasturlari va texnologik tadbirlar haqida eng so&apos;nggi ma&apos;lumotlar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 sm:w-72">
              <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Yangilik qidirish..." className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 animate-pulse rounded-2xl border border-border bg-card" />)}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">Yangilik topilmadi</p>
            <button onClick={() => setSearch("")} className="mt-3 text-[13px] text-accent hover:underline">Filtrni tozalash</button>
          </div>
        ) : !loading && (
          <>
            {featured && (
              <Link href={`/news/${featured.id}`} className="mb-10 block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1">
                <div className="grid md:grid-cols-2">
                  <div className="p-8">
                    <span className={`badge ${A[getAccent(0)].badge}`}>Yangilik</span>
                    <h2 className="mt-3 text-2xl font-bold text-foreground leading-tight">
                      {featured[`title_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || featured.title_en}
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">
                      {featured[`body_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || featured.body_en}
                    </p>
                    <p className="mt-4 text-[12px] text-muted-foreground">{formatDate(featured.created_at)}</p>
                  </div>
                  <div className="relative min-h-[200px] order-first md:order-last">
                    {featured.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <CardArt seed={featured.id} label={featured[`title_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || featured.title_en} className="absolute inset-0" />
                    )}
                  </div>
                </div>
              </Link>
            )}

            {filtered.length > 1 && (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Boshqa yangiliklar</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.slice(1).map((item, idx) => {
                    const c = A[getAccent(idx + 1)];
                    return (
                      <Link key={item.id} href={`/news/${item.id}`} className={`group flex flex-col rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${c.border}`}>
                        <span className={`inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[10px] font-bold ${c.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} /> Yangilik
                        </span>
                        <h3 className={`mt-3 text-[15px] font-bold leading-snug text-foreground group-hover:${c.text} transition-colors`}>
                          {item[`title_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || item.title_en}
                        </h3>
                        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted line-clamp-3">
                          {item[`body_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || item.body_en}
                        </p>
                        <p className="mt-3 text-[11px] text-muted-foreground">{formatDate(item.created_at)}</p>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
