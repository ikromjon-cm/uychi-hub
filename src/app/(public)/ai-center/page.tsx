"use client";

import { useState } from "react";

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string; glow: string; bg: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    glow: "hover:shadow-[0_0_40px_-10px_rgba(6,247,227,0.25)]",    bg: "bg-accent/5" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  glow: "hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.25)]",  bg: "bg-violet-500/5" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.25)]", bg: "bg-emerald-500/5" },
};

const AI_TOOLS = [
  {
    id: "chat",
    icon: "💬",
    title: "AI Chat Yordamchi",
    desc: "Ko'p tilli AI yordamchi — investitsiya, ekotizim xizmatlari va qonunchilik haqida 24/7 javob beradi.",
    tags: ["Ko'p tilli", "Real vaqt", "Hujjatlar Q&A"],
    accent: "cyan" as AccentKey,
    status: "Faol",
  },
  {
    id: "advisor",
    icon: "🚀",
    title: "AI Startap Maslahatchisi",
    desc: "Minglab muvaffaqiyatli startaplar tajribasida o'qitilgan virtual mentor — mahsulot-bozor mosligidan miqyoslashtirish strategiyasiga qadar.",
    tags: ["PMF baholash", "Moliyalashtirish", "Jamoa qurish"],
    accent: "violet" as AccentKey,
    status: "Beta",
  },
  {
    id: "investment",
    icon: "📈",
    title: "AI Investitsiya Tahlili",
    desc: "Startaplarni tahlil qiluvchi, riskni baholovchi va investitsiya xatiralarini daqiqalar ichida tayyorlovchi intellektual tizim.",
    tags: ["Due Diligence", "Risk skoring", "Benchmarking"],
    accent: "emerald" as AccentKey,
    status: "Faol",
  },
  {
    id: "docs",
    icon: "📄",
    title: "AI Hujjat Generatori",
    desc: "NDA, MoU, investitsiya term-sheet va pitch deck larni O'zbek va xalqaro qonunchilikka muvofiq avtomatik yaratish.",
    tags: ["NDA & MoU", "Term sheet", "Pitch deck"],
    accent: "cyan" as AccentKey,
    status: "Faol",
  },
  {
    id: "translate",
    icon: "🌐",
    title: "AI Tarjima Markazi",
    desc: "40+ til bo'yicha kontekstga sezgir tarjima motori — yuridik, moliyaviy va texnik hujjatlar uchun maxsus sozlangan.",
    tags: ["40+ til", "Yuridik matn", "Real vaqt"],
    accent: "violet" as AccentKey,
    status: "Faol",
  },
  {
    id: "knowledge",
    icon: "🧠",
    title: "AI Bilim Bazasi",
    desc: "Qonuniy mexanizmlar, bozor hisobotlari va texnologiya tendentsiyalari bo'yicha muntazam yangilanib turadigan intellektual ombor.",
    tags: ["Qonunchilik bazasi", "Bozor razvedkasi", "Tendentsiyalar"],
    accent: "emerald" as AccentKey,
    status: "Beta",
  },
];

const RESEARCH_PROJECTS = [
  {
    title: "AgriTech AI Platform",
    desc: "Namangan viloyatidagi dehqonchilik uchun sun'iy intellekt asosidagi hosildorlikni bashorat qilish tizimi.",
    phase: "Sinov bosqichi",
    team: 8,
    accent: "emerald" as AccentKey,
  },
  {
    title: "Smart City Dashboard",
    desc: "Uychi tumanining kommunal xizmatlari va transport oqimlarini real vaqtda kuzatib boruvchi aqlli boshqaruv tizimi.",
    phase: "Ishlab chiqish",
    team: 12,
    accent: "cyan" as AccentKey,
  },
  {
    title: "NLP Uzbek Corpus",
    desc: "O'zbek tilida tabiiy til qayta ishlash uchun katta hajmli ma'lumotlar to'plami va til modellarini o'rgatish loyihasi.",
    phase: "Ma'lumot yig'ish",
    team: 6,
    accent: "violet" as AccentKey,
  },
  {
    title: "Medical AI Diagnostics",
    desc: "Namangan viloyati kasalxonalari bilan hamkorlikda tibbiy rasmlarni AI yordamida tashxis qilish prototip tizimi.",
    phase: "Konsepsiya",
    team: 5,
    accent: "cyan" as AccentKey,
  },
];

const IMPACT_STATS = [
  { value: "1,200+", label: "AI so'rovlar/kun", color: "text-accent" },
  { value: "8", label: "AI vositalar", color: "text-violet-400" },
  { value: "4", label: "Tadqiqot loyihalari", color: "text-emerald-400" },
  { value: "98%", label: "Foydalanuvchi mamnunligi", color: "text-accent" },
];

export default function AiCenterPage() {
  const [activeTab, setActiveTab] = useState<"tools" | "research">("tools");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,247,227,0.06)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_30%,rgba(167,139,250,0.05)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">/ AI & Innovatsiya Markazi</p>
              <h1 className="mt-3 text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight tracking-tight text-foreground">
                Sun&apos;iy Intellekt
                <br />
                <span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Kelajak Bugun Boshlanadi
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                Uychi AI Markazi — Namangan-Uchqo'rg'on yo'lidagi Uychi tumanida AI tadqiqot va ishlab chiqish markazi. Korporativ AI vositalari, startap akseleratsiyasi va ilmiy tadqiqotlar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-[13px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.5)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  Demoni Ko&apos;rish
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-[13px] font-semibold text-muted transition-all hover:border-border hover:text-foreground">
                  Tadqiqot Guruhi
                </button>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 lg:w-80">
              {IMPACT_STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="mt-1 text-[11px] font-medium text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[88px] z-30 border-b border-border-subtle bg-background/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1">
            {(["tools", "research"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-4 text-[13px] font-semibold transition-colors ${activeTab === tab ? "text-accent" : "text-muted hover:text-foreground"}`}
              >
                {tab === "tools" ? "AI Vositalar" : "Tadqiqot Loyihalari"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {activeTab === "tools" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">AI Vositalar Arsenali</h2>
              <p className="mt-2 text-[14px] text-muted">Uychi IT Hub rezidentlari uchun bepul taqdim etiladigan AI vositalar to&apos;plami.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {AI_TOOLS.map((tool) => {
                const c = A[tool.accent];
                return (
                  <div key={tool.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 ${c.border} ${c.glow}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-xl">
                        {tool.icon}
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${c.badge}`}>
                        {tool.status}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[15px] font-bold text-foreground">{tool.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{tool.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="rounded bg-card-hover px-2 py-0.5 font-mono text-[10px] font-medium text-muted">{tag}</span>
                      ))}
                    </div>
                    <button className={`mt-5 w-full rounded-xl border py-2.5 text-[12px] font-bold transition-all ${c.badge} hover:opacity-80`}>
                      Boshlash →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "research" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">Faol Tadqiqot Loyihalari</h2>
              <p className="mt-2 text-[14px] text-muted">Uychi AI Markazida amalga oshirilayotgan ilmiy va amaliy tadqiqotlar.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {RESEARCH_PROJECTS.map((proj) => {
                const c = A[proj.accent];
                return (
                  <div key={proj.title} className={`group rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 ${c.border} ${c.glow}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[17px] font-bold text-foreground">{proj.title}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted">{proj.desc}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${c.badge}`}>
                          {proj.phase}
                        </span>
                        <span className="text-[12px] text-muted">
                          {proj.team} mutaxassis
                        </span>
                      </div>
                      <button className={`text-[12px] font-semibold ${c.text} hover:underline`}>
                        Batafsil →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to join research */}
            <div className="mt-10 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-background to-card p-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Tadqiqot Guruhi</p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">Tadqiqotchilarga Qo&apos;shiling</h3>
              <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">
                AI tadqiqot guruhimizga qo&apos;shilish uchun ariza qoldiring — universitet o&apos;qituvchilari, doktorantlar va mustaqil tadqiqotchilar xush kelibsiz.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-8 py-3.5 text-[14px] font-bold text-violet-400 transition-all hover:bg-violet-500/15">
                Ariza Topshirish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-border-subtle px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            AI Imkoniyatlarini Birgalikda Ochaylik
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Kompaniyangiz yoki startapingiz uchun maxsus AI yechimi ishlab chiqishga tayyor jamoamiz bilan bog&apos;laning.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="rounded-full bg-accent px-8 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.5)]">
              Bepul Konsultatsiya
            </button>
            <button className="rounded-full border border-border px-8 py-3.5 text-[14px] font-semibold text-muted transition-all hover:border-border hover:text-foreground">
              Texnik Hujjatlar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
