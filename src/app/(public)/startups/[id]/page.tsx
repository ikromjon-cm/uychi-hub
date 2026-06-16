"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
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

const T = {
  UZ: {
    back: "Startaplar ro'yxatiga qaytish",
    problem: "Muammo",
    solution: "Yechim",
    techStack: "Texnologiya Steki",
    info: "Ma'lumotlar",
    sector: "Sektori",
    images: "Dasturchilar",
    links: "Havolalar",
    joinTitle: "Bu startapga qo'shiling",
    joinDesc: "Sarmoya kiritish yoki hamkor bo'lish uchun murojaat qiling.",
    investorBtn: "Investor Arizasi →",
    contactBtn: "Bog'lanish",
  },
  RU: {
    back: "Вернуться к списку стартапов",
    problem: "Проблема",
    solution: "Решение",
    techStack: "Технологический стек",
    info: "Информация",
    sector: "Сектор",
    images: "Разработчики",
    links: "Ссылки",
    joinTitle: "Присоединяйтесь к стартапу",
    joinDesc: "Свяжитесь с нами для инвестирования или партнёрства.",
    investorBtn: "Заявка инвестора →",
    contactBtn: "Связаться",
  },
  EN: {
    back: "Back to startups list",
    problem: "Problem",
    solution: "Solution",
    techStack: "Tech Stack",
    info: "Details",
    sector: "Sector",
    images: "Developers",
    links: "Links",
    joinTitle: "Join this startup",
    joinDesc: "Contact us to invest or become a partner.",
    investorBtn: "Investor Application →",
    contactBtn: "Get in touch",
  },
} as const;

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#4f46e5" fillOpacity="0.12" />
      <circle cx="32" cy="32" r="31" fill="none" stroke="#4f46e5" strokeWidth="1" strokeOpacity="0.25" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#818cf8" fontSize="22" fontWeight="700" fontFamily="system-ui, sans-serif">{initials}</text>
    </svg>
  );
}

export default function StartupDetailPage() {
  const { lang } = useLang();
  const t = T[lang];
  const params = useParams<{ id: string }>();
  const [startup, setStartup] = useState<HubStartup | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const id = params.id;
    if (!/^\d+$/.test(id)) { setMissing(true); setLoading(false); return; }
    fetch(`/api/hub/startups/${id}/`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: HubStartup) => setStartup(data))
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

  const l = lang.toLowerCase() as "en" | "uz" | "ru";
  const problem = startup[`problem_${l}`] || startup.problem_en;
  const solution = startup[`solution_${l}`] || startup.solution_en;
  const techTags = startup.tech_stack ? startup.tech_stack.split(",").map((tag) => tag.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle bg-card px-6 py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/startups" className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-foreground">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t.back}
          </Link>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-400">
                  {startup.sector}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Avatar name={startup.title} />
                <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight tracking-tight text-foreground">
                  {startup.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">{t.problem}</h3>
              <p className="text-[14px] leading-relaxed text-foreground">{problem}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">{t.solution}</h3>
              <p className="text-[14px] leading-relaxed text-foreground">{solution}</p>
            </div>
            {techTags.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
                  {t.techStack}
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
            {startup.developer_images?.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                  {t.images}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {startup.developer_images.map((url, i) => (
                    <img key={i} src={url} alt="" className="aspect-square w-full rounded-xl border border-border object-cover" />
                  ))}
                </div>
              </div>
            )}
            {startup.links?.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
                  {t.links}
                </h3>
                <div className="space-y-2">
                  {startup.links.map((link, i) => (
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
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-muted">{t.info}</h3>
              <div className="space-y-3">
                {[
                  { label: t.sector, value: startup.sector },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                    <span className="text-[13px] text-muted">{label}</span>
                    <span className="text-[13px] font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/8 to-cyan-500/5 p-6">
              <h3 className="text-[15px] font-bold text-foreground">{t.joinTitle}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{t.joinDesc}</p>
              <Link href="/apply/investor" className="mt-4 block w-full rounded-full bg-accent py-3 text-center text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark">
                {t.investorBtn}
              </Link>
              <Link href="/#contact" className="mt-2 block w-full rounded-full border border-border py-3 text-center text-[13px] font-semibold text-muted transition-all hover:bg-card hover:text-foreground">
                {t.contactBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
