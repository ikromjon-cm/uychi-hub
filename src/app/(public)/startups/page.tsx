"use client";

import { useState } from "react";
import Link from "next/link";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";

type HubStartup = {
  id: number;
  title: string;
  sector: string;
  problem_en: string;
  problem_uz: string;
  problem_ru: string;
  solution_en: string;
  solution_uz: string;
  solution_ru: string;
  image: string | null;
  tech_stack: string;
  developer_images: string[];
  links: { title: string; url: string }[];
};

const ACCENTS = ["emerald", "cyan", "violet"] as const;
type AccentKey = typeof ACCENTS[number];

const A: Record<AccentKey, { border: string; badge: string; text: string; dot: string; glow: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    dot: "bg-accent",    glow: "hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.15)]" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  dot: "bg-violet-400",  glow: "hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.15)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", dot: "bg-emerald-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]" },
};

function StartupAvatar({ name, idx }: { name: string; idx: number }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const colors = [
    { bg: "#4f46e5", text: "#818cf8" },
    { bg: "#7c3aed", text: "#a78bfa" },
    { bg: "#059669", text: "#34d399" },
  ];
  const c = colors[idx % 3];
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="shrink-0">
      <circle cx="22" cy="22" r="22" fill={c.bg} fillOpacity="0.12" />
      <circle cx="22" cy="22" r="21" fill="none" stroke={c.bg} strokeWidth="1" strokeOpacity="0.25" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill={c.text} fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">{initials}</text>
    </svg>
  );
}

const T = {
  UZ: { badge: "/ Startup Hub", title1: "Uychi Tumanining", title2: "Innovatsion Startaplari", subtitle: "Mahalliy muammolarga global yechimlar topayotgan Uychi IT Hubning rezident startaplari.", search: "Startap qidirish...", add: "Startapni qo'shish", all: "Barchasi", notFound: "Startap topilmadi", clear: "Filtrni tozalash", problem: "Muammo", solution: "Yechim", more: "Batafsil ko'rish →", totalStartups: "Jami startaplar", sectors: "Sektorlar" },
  RU: { badge: "/ Стартап Хаб", title1: "Инновационные", title2: "Стартапы Уйчи", subtitle: "Стартапы-резиденты Uychi IT Hub, находящие глобальные решения для локальных задач.", search: "Поиск стартапа...", add: "Добавить стартап", all: "Все", notFound: "Стартапы не найдены", clear: "Сбросить фильтр", problem: "Проблема", solution: "Решение", more: "Подробнее →", totalStartups: "Всего стартапов", sectors: "Секторы" },
  EN: { badge: "/ Startup Hub", title1: "Innovative Startups", title2: "of Uychi District", subtitle: "Resident startups of Uychi IT Hub finding global solutions to local problems.", search: "Search startup...", add: "Add startup", all: "All", notFound: "No startups found", clear: "Clear filter", problem: "Problem", solution: "Solution", more: "View details →", totalStartups: "Total startups", sectors: "Sectors" },
} as const;

const ALL = "__all__";

export default function StartupsPage() {
  const { lang } = useLang();
  const t = T[lang];
  const { data: all, loading } = useApi<HubStartup[]>("/hub/startups/", []);
  const [sector, setSector] = useState(ALL);
  const [search, setSearch] = useState("");

  const sectors = [ALL, ...Array.from(new Set(all.map(s => s.sector)))];

  const filtered = all.filter((s) => {
    const matchSector = sector === ALL || s.sector === sector;
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">{t.badge}</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.title1}<br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{t.title2}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            {t.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 sm:w-72">
              <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
            </div>
            <Link href="/apply/startup" className="inline-flex items-center gap-2 rounded-2xl border border-violet-400/30 bg-violet-500/8 px-6 py-3 text-[13px] font-semibold text-violet-400 hover:border-violet-400/50 hover:bg-violet-500/15">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              {t.add}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {sectors.map(s => (
            <button key={s} onClick={() => setSector(s)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${sector === s ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>{s === ALL ? t.all : s}</button>
          ))}
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-card" />)}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">{t.notFound}</p>
            <button onClick={() => { setSector(ALL); setSearch(""); }} className="mt-3 text-[13px] text-violet-400 hover:underline">{t.clear}</button>
          </div>
        ) : !loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((s, idx) => {
              const c = A[ACCENTS[idx % 3]];
              const techTags = s.tech_stack ? s.tech_stack.split(",").slice(0, 4) : [];
              const problem = s[`problem_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || s.problem_uz || s.problem_en;
              const solution = s[`solution_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || s.solution_uz || s.solution_en;
              return (
                <Link key={s.id} href={`/startups/${s.id}`} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${c.border} ${c.glow}`}>
                  <div className="flex items-start justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${c.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} /> {s.sector}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <StartupAvatar name={s.title} idx={idx} />
                    <h3 className="text-[16px] font-bold text-foreground group-hover:text-accent transition-colors">{s.title}</h3>
                  </div>
                  <div className="mt-3 space-y-2 text-[13px]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{t.problem}</span>
                      <p className="mt-0.5 text-muted">{problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{t.solution}</span>
                      <p className="mt-0.5 text-muted">{solution}</p>
                    </div>
                  </div>
                  {techTags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {techTags.map((t, i) => <span key={i} className="rounded bg-card-hover px-2 py-0.5 font-mono text-[10px] text-muted">{t.trim()}</span>)}
                    </div>
                  )}
                  {s.developer_images?.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {s.developer_images.map((url, i) => (
                        <img key={i} src={url} alt="" className="h-20 w-20 shrink-0 rounded-xl border border-border object-cover" />
                      ))}
                    </div>
                  )}
                  {s.links?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.links.slice(0, 3).map((link, i) => (
                        <span key={i} className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] text-muted">
                          {link.title || link.url}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className={`mt-3 flex items-center gap-1 text-[11px] font-semibold ${c.text}`}>
                    {t.more}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && (
          <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 text-center">
            {[
              { label: t.totalStartups, value: String(all.length) },
              { label: t.sectors, value: String(sectors.length - 1) },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-violet-400">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
