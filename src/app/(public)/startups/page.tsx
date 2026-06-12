"use client";

import { useState } from "react";
import Link from "next/link";
import { useApi } from "@/lib/api";
import { MOCK_STARTUPS } from "@/lib/mock-data";

type Startup = {
  id: number;
  startup_name: string;
  sector: string;
  stage: string;
  status: string;
  founder_name: string;
  team_size: number | string;
  funding_needed: string;
  description: string;
  tech_stack: string;
};

const ACCENTS = ["emerald", "cyan", "violet"] as const;
type AccentKey = typeof ACCENTS[number];

const A: Record<AccentKey, { border: string; badge: string; text: string; dot: string; glow: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    dot: "bg-accent",    glow: "hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.15)]" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  dot: "bg-violet-400",  glow: "hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.15)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", dot: "bg-emerald-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]" },
};

const STAGE_COLORS: Record<string, string> = {
  "Idea": "text-muted border-border bg-card",
  "Pre-Seed": "text-amber-400 border-amber-400/20 bg-amber-500/8",
  "MVP": "text-blue-400 border-blue-400/20 bg-blue-500/8",
  "Seed": "text-violet-400 border-violet-400/20 bg-violet-500/8",
  "Series A": "text-emerald-400 border-emerald-400/20 bg-emerald-500/8",
};

const STAGES = ["Barchasi", "Idea", "Pre-Seed", "MVP", "Seed", "Series A"];

export default function StartupsPage() {
  const mockStartups: Startup[] = MOCK_STARTUPS.map((s, i) => ({
    id: i + 1,
    startup_name: s.name,
    sector: s.sector,
    stage: s.stage,
    status: "approved",
    founder_name: s.founder,
    team_size: s.teamSize,
    funding_needed: s.fundingNeeded,
    description: s.desc,
    tech_stack: s.techStack,
  }));
  const { data: all, loading } = useApi<Startup[]>("/startups/startup-applications/", [], mockStartups);
  const [stage, setStage] = useState("Barchasi");
  const [sector, setSector] = useState("Barchasi");
  const [search, setSearch] = useState("");

  const visible = all.filter(s => ["approved", "review"].includes(s.status));
  const sectors = ["Barchasi", ...Array.from(new Set(visible.map(s => s.sector)))];

  const filtered = visible.filter((s) => {
    const matchStage = stage === "Barchasi" || s.stage === stage;
    const matchSector = sector === "Barchasi" || s.sector === sector;
    const matchSearch = !search || s.startup_name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchStage && matchSector && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Startup Hub</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi Tumanining<br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Innovatsion Startaplari</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Mahalliy muammolarga global yechimlar topayotgan Uychi IT Hubning rezident startaplari.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 sm:w-72">
              <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Startap qidirish..." className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
            </div>
            <Link href="/apply/startup" className="inline-flex items-center gap-2 rounded-2xl border border-violet-400/30 bg-violet-500/8 px-6 py-3 text-[13px] font-semibold text-violet-400 hover:border-violet-400/50 hover:bg-violet-500/15">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Startapni qo&apos;shish
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {STAGES.map(s => (
            <button key={s} onClick={() => setStage(s)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${stage === s ? "border-violet-400/40 bg-violet-500/10 text-violet-400" : "border-border bg-card text-muted hover:text-foreground"}`}>{s}</button>
          ))}
          {sectors.map(s => (
            <button key={s} onClick={() => setSector(s)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${sector === s ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>{s}</button>
          ))}
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-card" />)}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">Startap topilmadi</p>
            <button onClick={() => { setStage("Barchasi"); setSector("Barchasi"); setSearch(""); }} className="mt-3 text-[13px] text-violet-400 hover:underline">Filtrni tozalash</button>
          </div>
        ) : !loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((s, idx) => {
              const c = A[ACCENTS[idx % 3]];
              const techTags = s.tech_stack ? s.tech_stack.split(",").slice(0, 4) : [];
              return (
                <div key={s.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className="flex items-start justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${c.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} /> {s.sector}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${STAGE_COLORS[s.stage] || "text-muted border-border"}`}>{s.stage}</span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold text-foreground">{s.startup_name}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {techTags.map((t, i) => <span key={i} className="rounded bg-card-hover px-2 py-0.5 font-mono text-[10px] text-muted">{t.trim()}</span>)}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border-subtle pt-4 text-[12px]">
                    <div><span className="text-muted">Asoschisi</span><p className="font-medium text-foreground">{s.founder_name}</p></div>
                    <div><span className="text-muted">Jamoa</span><p className="font-medium text-foreground">{s.team_size} kishi</p></div>
                    <div><span className="text-muted">Moliya</span><p className={`font-bold ${c.text}`}>{s.funding_needed || "—"}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && (
          <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-6 text-center">
            {[
              { label: "Jami startaplar", value: String(visible.length) },
              { label: "Sektorlar", value: String(sectors.length - 1) },
              { label: "Bosqichlar", value: String(STAGES.length - 1) },
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
