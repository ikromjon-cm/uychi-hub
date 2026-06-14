"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";

type Startup = {
  id: number;
  startup_name: string;
  sector: string;
  stage: string;
  status: string;
  founder_name: string;
  email: string;
  phone: string;
  team_size: number;
  funding_needed: string;
  description: string;
  tech_stack: string;
  website: string;
  country: string;
  created_at: string;
};

const STAGE_COLORS: Record<string, string> = {
  "Idea":     "text-muted border-border bg-card",
  "Pre-Seed": "text-amber-400 border-amber-400/20 bg-amber-500/8",
  "MVP":      "text-blue-400 border-blue-400/20 bg-blue-500/8",
  "Seed":     "text-violet-400 border-violet-400/20 bg-violet-500/8",
  "Series A": "text-emerald-400 border-emerald-400/20 bg-emerald-500/8",
};

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#4f46e5" fillOpacity="0.12" />
      <circle cx="32" cy="32" r="31" fill="none" stroke="#4f46e5" strokeWidth="1" strokeOpacity="0.25" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#818cf8"
        fontSize="22" fontWeight="700" fontFamily="system-ui, sans-serif">{initials}</text>
    </svg>
  );
}

export default function StartupDetailPage() {
  const params = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const id = params.id;
    if (!/^\d+$/.test(id)) { setMissing(true); setLoading(false); return; }

    fetch(`/api/startups/startup-applications/${id}/`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Startup) => setStartup(data))
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (missing) notFound();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative border-b border-border-subtle px-6 py-12">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="h-4 w-40 animate-pulse rounded-lg bg-card-hover" />
            <div className="h-10 w-1/2 animate-pulse rounded-lg bg-card-hover" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-card-hover" />
          </div>
        </section>
      </div>
    );
  }

  if (!startup) return null;

  const techTags = startup.tech_stack
    ? startup.tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const stageColor = STAGE_COLORS[startup.stage] || "text-muted border-border bg-card";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border-subtle bg-card px-6 py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/startups"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Startaplar ro&apos;yxatiga qaytish
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-400">
                  {startup.sector}
                </span>
                <span className={`rounded-full border px-3 py-0.5 text-[11px] font-bold ${stageColor}`}>
                  {startup.stage}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <Avatar name={startup.startup_name} />
                <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight tracking-tight text-foreground">
                  {startup.startup_name}
                </h1>
              </div>

              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                {startup.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-[13px] text-muted">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                  Asoschisi:&nbsp;<strong className="font-semibold text-foreground">{startup.founder_name}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                  Jamoa:&nbsp;<strong className="font-semibold text-foreground">{startup.team_size} kishi</strong>
                </span>
                {startup.country && (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 0 0 .284 2.253" /></svg>
                    {startup.country}
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 lg:w-52">
              <Link
                href="/apply/investor"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark"
              >
                Investitsiya qilish
              </Link>
              {startup.email && (
                <a
                  href={`mailto:${startup.email}?subject=Murojaat: ${encodeURIComponent(startup.startup_name)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-[13px] font-semibold text-foreground transition-all hover:bg-card-hover"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                  Murojaat qilish
                </a>
              )}
              {startup.website && (
                <a
                  href={startup.website.startsWith("http") ? startup.website : `https://${startup.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-[13px] font-semibold text-foreground transition-all hover:bg-card-hover"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 0 0 .284 2.253" /></svg>
                  Veb-sayt
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Main */}
          <div className="space-y-6 lg:col-span-2">

            {/* Description */}
            {startup.description && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">Haqida</h3>
                <p className="text-[14px] leading-relaxed text-foreground">{startup.description}</p>
              </div>
            )}

            {/* Tech Stack */}
            {techTags.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
                  Texnologiya Steki
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <span key={tag} className="rounded-lg border border-violet-500/20 bg-violet-500/8 px-3 py-1.5 font-mono text-[12px] font-medium text-violet-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-muted">Ma&apos;lumotlar</h3>
              <div className="space-y-3">
                {[
                  { label: "Sektori",      value: startup.sector },
                  { label: "Bosqich",       value: startup.stage },
                  { label: "Jamoa",         value: `${startup.team_size} kishi` },
                  { label: "Asoschisi",     value: startup.founder_name },
                  { label: "Moliya kerak",  value: startup.funding_needed || "—" },
                  { label: "Mamlakat",      value: startup.country || "O'zbekiston" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                    <span className="text-[13px] text-muted">{label}</span>
                    <span className="text-[13px] font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/8 to-cyan-500/5 p-6">
              <h3 className="text-[15px] font-bold text-foreground">Bu startapga qo&apos;shiling</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Sarmoya kiritish yoki hamkor bo&apos;lish uchun murojaat qiling.
              </p>
              <Link
                href="/apply/investor"
                className="mt-4 block w-full rounded-full bg-accent py-3 text-center text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark"
              >
                Investor Arizasi →
              </Link>
              <Link
                href="/#contact"
                className="mt-2 block w-full rounded-full border border-border py-3 text-center text-[13px] font-semibold text-muted transition-all hover:bg-card hover:text-foreground"
              >
                Bog&apos;lanish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
