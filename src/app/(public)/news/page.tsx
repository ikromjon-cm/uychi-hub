"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { NEWS as MOCK_NEWS } from "@/lib/mock-data";

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
  const mockArticles: Article[] = MOCK_NEWS.map((n, i) => ({
    id: i + 1, title: n.title, category: n.category,
    excerpt: n.excerpt, content: n.excerpt, slug: n.id, status: "published",
    views: 0, author_name: "Uychi IT Hub", published_at: n.date,
    created_at: n.date,
  }));
  const { data: allArticles, loading } = useApi<Article[]>("/news/articles/", [], mockArticles);
  const [selected, setSelected] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [search, setSearch] = useState("");

  const published = allArticles.filter(a => a.status === "published");
  const categories = ["Barchasi", ...Array.from(new Set(published.map(a => a.category)))];

  const filtered = published.filter((n) => {
    const matchCat = activeCategory === "Barchasi" || n.category === activeCategory;
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = published[0];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">/ IT Yangiliklar Portali</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi IT Ekotizimidan<br />
            <span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">So&apos;nggi Yangiliklar</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Uychi tumani IT sohasidagi eng yangi voqealar, hamkorliklar, yutuqlar va texnologiya yangiliklari — 1935-yilda tashkil etilgan tumandan global IT markazigacha.
          </p>
          <div className="mt-8 flex max-w-md items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Yangiliklar qidirish..." className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
            {search && <button onClick={() => setSearch("")} className="text-muted hover:text-foreground"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap gap-2">
          {loading ? (
            <div className="h-8 w-48 animate-pulse rounded-full bg-card-hover" />
          ) : categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all ${activeCategory === cat ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:border-border hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {!loading && featured && activeCategory === "Barchasi" && !search && (
          <article className="mb-10 overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-background to-card transition-all hover:border-accent/30">
            <div className="grid md:grid-cols-5">
              <div className="flex flex-col justify-between p-8 md:col-span-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">Trendda</span>
                    <span className="text-[11px] text-muted">{formatDate(featured.published_at || featured.created_at)}</span>
                  </div>
                  <h2 className="mt-5 text-[clamp(1.3rem,3vw,2rem)] font-bold leading-snug text-foreground">{featured.title}</h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-muted">{featured.excerpt}</p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <span className="rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-[11px] font-semibold text-accent">{featured.category}</span>
                  <button onClick={() => setSelected(featured)} className="flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:opacity-70">Batafsil o&apos;qish ...</button>
                </div>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-cyan-500/8 to-transparent p-8 md:col-span-2">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/20 bg-accent/8">
                    <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg>
                  </div>
                  <p className="mt-3 text-[12px] font-semibold text-accent">Tanlangan Xabar</p>
                  <p className="mt-1 text-[11px] text-muted">{formatDate(featured.published_at || featured.created_at)}</p>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
            <p className="text-[15px] font-semibold text-muted">Yangilik topilmadi</p>
            <button onClick={() => { setSearch(""); setActiveCategory("Barchasi"); }} className="mt-3 text-[13px] text-accent hover:underline">Filtrni tozalash</button>
          </div>
        ) : !loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, idx) => {
              const c = A[getAccent(idx)];
              return (
                <div key={item.id} onClick={() => setSelected(item)} role="button" className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${c.border}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.badge}`}>{item.category}</span>
                    <time className="text-[11px] text-muted">{formatDate(item.published_at || item.created_at)}</time>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{item.excerpt}</p>
                  <div className={`mt-5 flex items-center gap-1.5 text-[12px] font-semibold ${c.text}`}>
                    Batafsil o&apos;qish <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-6 text-center">
          {[
            { label: "Jami yangiliklar", value: loading ? "—" : String(published.length) },
            { label: "Kategoriyalar", value: loading ? "—" : String(categories.length - 1) },
            { label: "Oylik yangilanish", value: "10+" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-accent sm:text-2xl">{s.value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">{selected.category}</span>
              <span className="text-[12px] text-muted">{selected.author_name && `${selected.author_name} · `}{formatDate(selected.published_at || selected.created_at)}</span>
              <span className="text-[12px] text-muted">{selected.views} ko&apos;rish</span>
            </div>
            <h2 className="text-[clamp(1.3rem,3vw,1.8rem)] font-bold leading-snug text-foreground">{selected.title}</h2>
            {selected.excerpt && <p className="mt-4 text-[14px] leading-relaxed text-muted italic border-l-2 border-accent/30 pl-4">{selected.excerpt}</p>}
            {selected.content && <div className="mt-6 text-[14px] leading-relaxed text-foreground whitespace-pre-line">{selected.content}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
