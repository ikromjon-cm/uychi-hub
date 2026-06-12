"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { MOCK_JOBS } from "@/lib/mock-data";

type Job = {
  id: number;
  title: string;
  department: string;
  employment_type: string;
  location: string;
  status: string;
  salary_range: string;
  description: string;
  requirements: string;
  applicants_count: number;
  created_at: string;
};

const ACCENTS = ["cyan", "violet", "emerald"] as const;
type AccentKey = typeof ACCENTS[number];
const A: Record<AccentKey, { border: string; badge: string; text: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400" },
};

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "text-accent border-accent/20 bg-accent/8",
  "Part-time": "text-violet-400 border-violet-400/20 bg-violet-500/8",
  "Internship": "text-emerald-400 border-emerald-400/20 bg-emerald-500/8",
  "Contract": "text-amber-400 border-amber-400/20 bg-amber-500/8",
};

const TYPE_LABELS: Record<string, string> = {
  "Full-time": "To'liq stavka",
  "Part-time": "Qisman stavka",
  "Internship": "Stajyorlik",
  "Contract": "Shartnoma",
};

const FILTER_TYPES = [
  { key: "all", label: "Barchasi" },
  { key: "Full-time", label: "To'liq stavka" },
  { key: "Internship", label: "Stajyorlik" },
  { key: "Part-time", label: "Qisman stavka" },
  { key: "Contract", label: "Shartnoma" },
];

export default function JobsPage() {
  const mockJobs: Job[] = MOCK_JOBS.map((j, i) => ({
    id: i + 1,
    title: j.title,
    department: j.department,
    employment_type: j.employment_type,
    location: j.location,
    status: j.status,
    salary_range: j.salary_range,
    description: j.description,
    requirements: j.requirements,
    applicants_count: j.applicants_count,
    created_at: j.created_at,
  }));
  const { data: allJobs, loading } = useApi<Job[]>("/careers/job-postings/", [], mockJobs);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const activeJobs = allJobs.filter(j => j.status === "active");

  const filtered = activeJobs.filter((j) => {
    const matchType = typeFilter === "all" || j.employment_type === typeFilter;
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(52,211,153,0.05)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Ish & Stajyorlik</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            IT Vakansiyalar &<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Stajyorlik Imkoniyatlari</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Uychi AI & IT Hub va Uychi tumani IT kompaniyalari taklif etayotgan ish o'rinlari va stajyorlik dasturlari.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Ochiq vakansiyalar", value: loading ? "—" : String(activeJobs.length), color: "text-emerald-400" },
              { label: "Bo'limlar", value: loading ? "—" : String(new Set(activeJobs.map(j => j.department)).size), color: "text-accent" },
              { label: "Ariza berganlar", value: loading ? "—" : String(activeJobs.reduce((s, j) => s + j.applicants_count, 0)) + "+", color: "text-violet-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card px-5 py-3 text-center">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Lavozim yoki bo'lim qidirish..." className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_TYPES.map((f) => (
              <button key={f.key} onClick={() => setTypeFilter(f.key)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${typeFilter === f.key ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400" : "border-border bg-card text-muted hover:text-foreground"}`}>{f.label}</button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">Vakansiya topilmadi</p>
            <button onClick={() => { setSearch(""); setTypeFilter("all"); }} className="mt-3 text-[13px] text-emerald-400 hover:underline">Filtrni tozalash</button>
          </div>
        ) : !loading && (
          <div className="space-y-4">
            {filtered.map((job, idx) => {
              const c = A[ACCENTS[idx % 3]];
              const typeColor = TYPE_COLORS[job.employment_type] || "text-muted border-border bg-card";
              return (
                <div key={job.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-6 ${c.border}`}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-base font-bold ${c.badge}`}>
                    {job.department.charAt(0)}
                  </div>
                  <div className="mt-4 flex-1 sm:mt-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-[16px] font-bold ${c.text}`}>{job.title}</h3>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${typeColor}`}>{TYPE_LABELS[job.employment_type] || job.employment_type}</span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted">{job.department} · {job.location}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.requirements.split(",").slice(0, 4).map((req, i) => (
                        <span key={i} className="rounded bg-card-hover px-2 py-0.5 font-mono text-[10px] font-medium text-muted">{req.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end">
                    <div className="text-right">
                      <p className={`text-[15px] font-bold ${c.text}`}>{job.salary_range}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-muted">{job.applicants_count} ariza</p>
                    </div>
                    <button className={`rounded-xl border px-5 py-2 text-[12px] font-bold transition-all ${c.badge} hover:opacity-80`}>
                      Ariza topshirish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-background to-card p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Rezyume Yuklab Qo&apos;ying</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Mos Vakansiya Kutib Turayotganlar Uchun</h3>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">Rezyumeyingizni yuklang — HR jamoamiz sizga mos vakansiya paydo bo&apos;lganda 24 soat ichida xabar beradi.</p>
          <a href="mailto:hr@uychi.uz" className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-3.5 text-[14px] font-bold text-emerald-400 hover:bg-emerald-500/15">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            hr@uychi.uz ga yuborish
          </a>
        </div>
      </div>
    </div>
  );
}
