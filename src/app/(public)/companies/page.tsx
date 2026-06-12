"use client";

import { useState } from "react";

interface ServiceCompany {
  id: string; name: string; tagline: string; services: string[];
  stack: string[]; projects: number; employees: string; accent: "cyan" | "violet" | "emerald";
}

const IT_COMPANIES: ServiceCompany[] = [
  { id: 'algosoft', name: 'AlgoSoft', tagline: 'Web va mobil dasturlar ishlab chiqish', services: ['Web ilovalar', 'Mobil dasturlar (iOS/Android)', 'API integratsiya', 'Texnik qo\'llab-quvvatlash'], stack: ['React', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL'], projects: 80, employees: '25+', accent: 'cyan' },
  { id: 'databridge', name: 'DataBridge UZ', tagline: 'Korporativ dasturiy ta\'minot va ERP tizimlari', services: ['1C ERP joriy etish', 'CRM tizimlari', 'Ma\'lumotlar migratsiyasi', 'Biznes jarayonlarini avtomatlashtirish'], stack: ['1C:Enterprise', 'Python', 'Django', 'PostgreSQL', 'Redis'], projects: 45, employees: '18+', accent: 'violet' },
  { id: 'pixelstudio', name: 'PixelStudio', tagline: 'UI/UX dizayn va brending', services: ['UI/UX dizayn', 'Brend identifikatsiyasi', 'Prototiplash', 'Foydalanuvchi tadqiqoti'], stack: ['Figma', 'Adobe XD', 'Framer', 'After Effects'], projects: 120, employees: '12+', accent: 'emerald' },
  { id: 'cloudnet', name: 'CloudNet Uychi', tagline: 'IT infratuzilma va kiberxavfsizlik', services: ['Server infratuzilma', 'Tarmoq sozlash', 'Kiberxavfsizlik audit', 'Bulut xizmatlari'], stack: ['Linux', 'AWS', 'Docker', 'Kubernetes', 'Nginx'], projects: 35, employees: '15+', accent: 'cyan' },
  { id: 'digitalmind', name: 'DigitalMind', tagline: 'Raqamli marketing va SEO', services: ['SEO optimizatsiya', 'SMM boshqaruvi', 'Kontekstli reklama', 'Kontent marketing'], stack: ['Google Ads', 'Meta Ads', 'SEMrush', 'GA4', 'Ahrefs'], projects: 200, employees: '20+', accent: 'violet' },
  { id: 'gamelab', name: 'GameLab UZ', tagline: 'O\'yin ishlab chiqish va interaktiv media', services: ['Mobil o\'yinlar', 'Web o\'yinlar', 'VR/AR ilovalar', 'Gamifikatsiya'], stack: ['Unity', 'Unreal Engine', 'Godot', 'WebGL', 'Blender'], projects: 30, employees: '22+', accent: 'emerald' },
];

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string; glow: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    glow: "hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.15)]" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  glow: "hover:shadow-[0_0_25px_-5px_rgba(167,139,250,0.15)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", glow: "hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.15)]" },
};

const SERVICE_CATEGORIES = ["Barchasi", "Web & Mobile", "ERP & CRM", "Dizayn", "Infratuzilma", "Marketing", "O'yin"];

function matchCategory(services: string[], cat: string): boolean {
  if (cat === "Barchasi") return true;
  const map: Record<string, string[]> = {
    "Web & Mobile": ["Web", "Mobil", "iOS", "Android", "API"],
    "ERP & CRM": ["ERP", "CRM", "1C", "Biznes"],
    "Dizayn": ["Dizayn", "UI", "UX", "Brend"],
    "Infratuzilma": ["Server", "Tarmoq", "Kiberxavfsizlik", "Bulut", "Cloud"],
    "Marketing": ["SEO", "SMM", "Marketing", "Kontent", "Reklama"],
    "O'yin": ["O'yin", "VR", "AR", "Gamif"],
  };
  return (map[cat] || []).some((kw) => services.some((s) => s.includes(kw)));
}

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Barchasi");

  const filtered = IT_COMPANIES.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.tagline.toLowerCase().includes(search.toLowerCase());
    return matchSearch && matchCategory(c.services, category);
  });

  const totalProjects = IT_COMPANIES.reduce((s, c) => s + c.projects, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.05)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ IT Kompaniyalar Katalogi</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi IT Hubning<br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Rezident Kompaniyalari</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Uychi tumanidagi 900+ kichik korxona va IT Park rezident kompaniyalari — xizmatlar, texnologiyalar va bog'lanish ma'lumotlari.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Rezident kompaniyalar", value: "50+", color: "text-violet-400" },
              { label: "Jami loyihalar", value: `${totalProjects}+`, color: "text-accent" },
              { label: "IT mutaxassislar", value: "400+", color: "text-emerald-400" },
              { label: "Tuman korxonalari", value: "900+", color: "text-violet-400" },
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
        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Kompaniya yoki xizmat qidirish..." className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  category === cat
                    ? "border-violet-400/40 bg-violet-500/10 text-violet-400"
                    : "border-border bg-card text-muted hover:border-border hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Companies grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">Kompaniya topilmadi</p>
            <button onClick={() => { setSearch(""); setCategory("Barchasi"); }} className="mt-3 text-[13px] text-violet-400 hover:underline">Filtrni tozalash</button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((company) => {
              const c = A[company.accent as AccentKey];
              return (
                <div key={company.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border text-lg font-bold ${c.badge}`}>
                      {company.name.charAt(0)}
                    </div>
                    <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                      IT Park rezidenti
                    </span>
                  </div>

                  <h3 className={`mt-4 text-[16px] font-bold ${c.text}`}>{company.name}</h3>
                  <p className="mt-1 text-[12px] text-muted">{company.tagline}</p>

                  {/* Services */}
                  <ul className="mt-5 flex-1 space-y-2">
                    {company.services.map((srv) => (
                      <li key={srv} className="flex items-center gap-2 text-[12px] text-foreground">
                        <svg className={`h-3 w-3 shrink-0 ${c.text}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                        {srv}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {company.stack.map((tech) => (
                      <span key={tech} className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium ${c.badge}`}>{tech}</span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4 text-[12px]">
                    <div className="flex items-center gap-4 text-muted">
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                        {company.employees}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
                        {company.projects}+ loyiha
                      </span>
                    </div>
                    <button className={`rounded-lg border px-3 py-1 text-[11px] font-semibold transition-all ${c.badge} hover:opacity-80`}>
                      Bog'lanish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Join CTA */}
        <div className="mt-16 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-background to-card p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-400">/ IT Park Rezidenti Bo'ling</p>
              <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">Kompaniyangizni Katalogga Qo'shing</h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted">IT Park rezidenti sifatida soliq imtiyozlari, infratuzilma va biznes rivojlanish xizmatlaridan foydalaning. Uychi tumanidagi 5 sanoat zonasida ofis ochish imkoniyati.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button className="rounded-full border border-violet-400/30 bg-violet-500/10 px-6 py-3 text-[13px] font-bold text-violet-400 transition-all hover:bg-violet-500/20">
                Ariza topshirish
              </button>
              <a href="https://itpark.uz" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-6 py-3 text-center text-[13px] font-semibold text-muted transition-all hover:text-foreground">
                IT Park haqida
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
