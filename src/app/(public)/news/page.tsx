"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";

type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  status: string;
  views: number;
  author_name: string;
  published_at: string | null;
  created_at: string;
};

const ACCENTS = ["cyan", "violet", "emerald"] as const;
type AccentKey = typeof ACCENTS[number];

const A: Record<AccentKey, { badge: string; dot: string; text: string; border: string }> = {
  cyan:    { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",    dot: "bg-cyan-400",    text: "text-cyan-400",    border: "border-cyan-500/20 hover:border-cyan-500/40" },
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
  const { data: allArticles, loading } = useApi<Article[]>("/news/articles/", []);
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
    <div className="min-h-screen bg-[#030303]">
      <section className="relative border-b border-white/4 px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">/ IT Yangiliklar Portali</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
            Uychi IT Ekotizimidan<br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">So&apos;nggi Yangiliklar</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Uychi tumani IT sohasidagi eng yangi voqealar, hamkorliklar, yutuqlar va texnologiya yangiliklari.
          </p>
          <div className="mt-8 flex max-w-md items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Yangiliklar qidirish..." className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-zinc-600" />
            {search && <button onClick={() => setSearch("")} className="text-zinc-600 hover:text-white"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap gap-2">
          {loading ? (
            <div className="h-8 w-48 animate-pulse rounded-full bg-white/5" />
          ) : categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all ${activeCategory === cat ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400" : "border-white/8 bg-white/3 text-zinc-500 hover:border-white/15 hover:text-zinc-300"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {!loading && featured && activeCategory === "Barchasi" && !search && (
          <article className="mb-10 overflow-hidden rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-[#0d1a1a] to-[#0a0a0a] transition-all hover:border-cyan-500/30">
            <div className="grid md:grid-cols-5">
              <div className="flex flex-col justify-between p-8 md:col-span-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">Trendda</span>
                    <span className="text-[11px] text-zinc-600">{formatDate(featured.published_at || featured.created_at)}</span>
                  </div>
                  <h2 className="mt-5 text-[clamp(1.3rem,3vw,2rem)] font-bold leading-snug text-white">{featured.title}</h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">{featured.excerpt}</p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/8 px-4 py-1.5 text-[11px] font-semibold text-cyan-400">{featured.category}</span>
                  <button className="flex items-center gap-1.5 text-[13px] font-semibold text-cyan-400 hover:opacity-70">
                    Batafsil o&apos;qish <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-cyan-500/8 to-transparent p-8 md:col-span-2">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/8">
                    <svg className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg>
                  </div>
                  <p className="mt-3 text-[12px] font-semibold text-cyan-400">Tanlangan Xabar</p>
                  <p className="mt-1 text-[11px] text-zinc-600">{formatDate(featured.published_at || featured.created_at)}</p>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-white/5 bg-[#0a0a0a]" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/2 py-20 text-center">
            <p className="text-[15px] font-semibold text-zinc-500">Yangilik topilmadi</p>
            <button onClick={() => { setSearch(""); setActiveCategory("Barchasi"); }} className="mt-3 text-[13px] text-cyan-400 hover:underline">Filtrni tozalash</button>
          </div>
        ) : !loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, idx) => {
              const c = A[getAccent(idx)];
              return (
                <article key={item.id} className={`group flex flex-col rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 ${c.border}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.badge}`}>{item.category}</span>
                    <time className="text-[11px] text-zinc-600">{formatDate(item.published_at || item.created_at)}</time>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug text-white">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-zinc-500">{item.excerpt}</p>
                  <div className={`mt-5 flex items-center gap-1.5 text-[12px] font-semibold ${c.text}`}>
                    Batafsil o&apos;qish <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-white/5 bg-white/2 p-6 text-center">
          {[
            { label: "Jami yangiliklar", value: loading ? "—" : String(published.length) },
            { label: "Kategoriyalar", value: loading ? "—" : String(categories.length - 1) },
            { label: "Oylik yangilanish", value: "10+" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-cyan-400 sm:text-2xl">{s.value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
