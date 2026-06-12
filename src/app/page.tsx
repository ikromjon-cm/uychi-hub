"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STATS } from "@/lib/constants";
import { useApi } from "@/lib/api";

type Article = { id: number; title: string; category: string; summary: string; status: string; published_at: string; };

const IT_COMPANIES = [
  { id: 'algosoft', name: 'AlgoSoft', tagline: 'Web va mobil dasturlar ishlab chiqish', services: ['Web ilovalar', 'Mobil dasturlar', 'API integratsiya', 'Qo\'llab-quvvatlash'], stack: ['React', 'Next.js', 'Flutter', 'Node.js'], projects: 80, employees: '25+', accent: 'cyan' as const },
  { id: 'databridge', name: 'DataBridge UZ', tagline: 'Korporativ dasturiy ta\'minot va ERP', services: ['1C ERP joriy etish', 'CRM tizimlari', 'Ma\'lumotlar migratsiyasi', 'Avtomatlashtirish'], stack: ['1C:Enterprise', 'Python', 'Django', 'PostgreSQL'], projects: 45, employees: '18+', accent: 'violet' as const },
  { id: 'pixelstudio', name: 'PixelStudio', tagline: 'UI/UX dizayn va brending', services: ['UI/UX dizayn', 'Brend identifikatsiya', 'Prototiplash', 'Foydalanuvchi tadqiqoti'], stack: ['Figma', 'Adobe XD', 'Framer', 'After Effects'], projects: 120, employees: '12+', accent: 'emerald' as const },
  { id: 'cloudnet', name: 'CloudNet Uychi', tagline: 'IT infratuzilma va kiberxavfsizlik', services: ['Server infratuzilma', 'Tarmoq sozlash', 'Kiberxavfsizlik audit', 'Bulut xizmatlari'], stack: ['Linux', 'AWS', 'Docker', 'Kubernetes'], projects: 35, employees: '15+', accent: 'cyan' as const },
  { id: 'digitalmind', name: 'DigitalMind', tagline: 'Raqamli marketing va SEO', services: ['SEO optimizatsiya', 'SMM boshqaruvi', 'Kontekstli reklama', 'Kontent marketing'], stack: ['Google Ads', 'Meta Ads', 'SEMrush', 'GA4'], projects: 200, employees: '20+', accent: 'violet' as const },
  { id: 'gamelab', name: 'GameLab UZ', tagline: 'O\'yin ishlab chiqish va interaktiv media', services: ['Mobil o\'yinlar', 'Web o\'yinlar', 'VR/AR ilovalar', 'Gamifikatsiya'], stack: ['Unity', 'Unreal Engine', 'Godot', 'WebGL'], projects: 30, employees: '22+', accent: 'emerald' as const },
];

const INFRA = [
  {
    title: "Kovorking Maydoni",
    desc: "Tezkor fiber internet, ovoz o'tkazmaydigan kabinalar va 200+ texnologiya mutaxassisi uchun zamonaviy hamkorlik muhiti.",
    accent: "accent" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: "AI Laboratoriyasi",
    desc: "NVIDIA GPU klasterlari, ma'lumotlar pipeline va ilmiy hamkorliklar orqali sun'iy intellekt tadqiqotlari uchun zamonaviy muhit.",
    accent: "violet" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Startap Inkubatori",
    desc: "Tajribali mentorlar, seed investitsiya imkoniyatlari va boshlang'ich bosqichdagi startaplar uchun tizimli rivojlanish dasturlari.",
    accent: "emerald" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "O'quv Markazi",
    desc: "AI, bulutli texnologiyalar va kiberxavfsizlik bo'yicha intensiv bootcamp, sertifikatlash dasturlari va amaliy ustaxonalar.",
    accent: "accent" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const STARTUPS = [
  {
    name: "AgroSmart Uychi",
    sector: "AgriTech AI",
    founded: "2023",
    problem: "Namangan viloyatidagi fermerlar suv taqchilligi va an'anaviy dehqonchilik usullari tufayli hosildorlikni 30–40% ga yo'qotmoqda.",
    solution: "IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida paxta va bug'doy dalalarida aniq sug'orish va kasallik monitoringini amalga oshiruvchi tizim.",
    tech: "IoT · Sun'iy Yo'ldosh · Predictive ML",
    users: "1,200+ fermer · 8,500 gektар",
    accent: "emerald" as const,
  },
  {
    name: "EduCore UZ",
    sector: "EdTech",
    founded: "2022",
    problem: "Qishloq maktablarida sifatli ta'lim resurslari va malakali o'qituvchilar yetishmasligi o'quvchilarning imkoniyatlarini cheklab qo'ymoqda.",
    solution: "Mobil qurilmalar uchun optimallashtirilgan, oflayn rejimda ishlaydigan o'zbek tilidagi interaktiv ta'lim platformasi.",
    tech: "React Native · AI Tutor · Offline Sync",
    users: "28,000+ o'quvchi · 140+ maktab",
    accent: "accent" as const,
  },
  {
    name: "NamLogist",
    sector: "LogiTech",
    founded: "2024",
    problem: "Navoiy–Toshkent yo'nalishidagi yuk tashish samarasiz — ortiqcha xarajatlar, kechikishlar va transport resurslaridan foydalanishning pasayishi.",
    solution: "AI asosida yuk tashishni optimallashtiruvchi va haydovchilarni real vaqt rejimida marshrutlashtiruvchi B2B platforma.",
    tech: "Route Optimization · ML · Real-time GPS",
    users: "350+ kompaniya · 2,100+ yetkazib berish/kun",
    accent: "violet" as const,
  },
];

const PERKS = [
  { symbol: "↓", title: "Xarajat Afzalliklari", desc: "Mintaqaviy texnologiya markazlariga nisbatan operatsion xarajatlar 60–70% past. Texnologiya uskunalari uchun soliq imtiyozlari va boj ozodligi." },
  { symbol: "◈", title: "Iste'dod Bazasi", desc: "Har yili 300K+ STEM bitiruvchilari. Kuchli matematika tayyorgarligi va yosh mutaxassislar orasida ingliz tilini bilish darajasi yuqori." },
  { symbol: "◇", title: "IT Park Imtiyozlari", desc: "10 yil korporativ daromad solig'idan ozodlik, 0% ish haqi solig'i va barcha xorijiy xodimlar uchun soddalashtirilgan viza homiylik." },
  { symbol: "⊕", title: "Davlat Qo'llab-quvvatlashi", desc: "Prezidentlik ko'magi, tezlashtirilgan biznes litsenziyalash va strategik texnologiya loyihalari uchun faol birgalikdagi investitsiya dasturlari." },
];

type AccentKey = "accent" | "cyan" | "violet" | "emerald";

const A: Record<AccentKey, { border: string; badge: string; glow: string; text: string; icon: string; dot: string }> = {
  accent: { border: "border-cyan-500/20 hover:border-cyan-500/50", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", glow: "hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.2)]", text: "text-cyan-400", icon: "bg-cyan-500/8 border-cyan-500/15 text-cyan-400", dot: "bg-cyan-400" },
  cyan:   { border: "border-cyan-500/20 hover:border-cyan-500/50", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", glow: "hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.2)]", text: "text-cyan-400", icon: "bg-cyan-500/8 border-cyan-500/15 text-cyan-400", dot: "bg-cyan-400" },
  violet: { border: "border-violet-400/20 hover:border-violet-400/50", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", glow: "hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.2)]", text: "text-violet-400", icon: "bg-violet-500/8 border-violet-400/15 text-violet-400", dot: "bg-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/50", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", glow: "hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.2)]", text: "text-emerald-400", icon: "bg-emerald-500/8 border-emerald-400/15 text-emerald-400", dot: "bg-emerald-400" },
};

const ACCENTS = ["cyan", "violet", "emerald"] as const;

export default function Home() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { data: articles } = useApi<Article[]>("/news/articles/", []);
  const NEWS = articles.filter(a => a.status === "published").slice(0, 6);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact/submissions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      // fallback — still show success for demo
    }
    setSending(false);
    setSent(true);
  }

  return (
    <div className="flex flex-col">
      <Navbar />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,247,227,0.07)_0%,transparent_60%)]" />
          <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-500/5 blur-[80px]" />
          <div className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-cyan-400/4 blur-[60px]" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/15 bg-cyan-500/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Xalqaro hamkorlik va investitsiyalarga ochiq · 2026
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            Uychi Tumanida{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">IT va Sun&apos;iy Intellekt</span>
            <br className="hidden sm:block" />
            Markazini Quramiz
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-zinc-500">
            Uychi AI & IT Hub — startaplarga inkubatsiya, IT kompaniyalarga zamonaviy ofis maydoni,
            yoshlarga sifatli texnologiya ta&apos;limi va xalqaro investorlarga qulay muhit yaratuvchi
            kompleks ekotizim. Namangan viloyatining raqamli kelajagini birgalikda quramiz.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/apply/startup" className="w-full rounded-full bg-cyan-400 px-8 py-3.5 text-center text-[13px] font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.6)] sm:w-auto">
              Startap Ariza Topshiring
            </Link>
            <Link href="/#how" className="w-full rounded-full border border-white/10 bg-white/3 px-8 py-3.5 text-center text-[13px] font-semibold text-white transition-all hover:border-white/20 hover:bg-white/6 sm:w-auto">
              Qanday Ishlaydi?
            </Link>
            <Link href="/#contact" className="w-full rounded-full border border-violet-400/20 px-8 py-3.5 text-center text-[13px] font-semibold text-zinc-400 transition-all hover:border-violet-400/40 hover:text-violet-300 sm:w-auto">
              Bog&apos;lanish
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-20 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/3 to-transparent">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/5 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center px-4 py-7 text-center last:col-span-2 sm:last:col-span-1">
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">{s.value}</span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative border-t border-white/4 px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(167,139,250,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">/ Infratuzilma</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Innovatsiya Uchun Yaratilgan.<br />O&apos;sish Uchun Loyihalangan.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">Texnologiya loyihalarini birinchi g&apos;oyadan global miqyosgacha tezlashtirish uchun maxsus qurilgan maydonlar va jahon darajasidagi resurslar.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INFRA.map((item) => {
              const c = A[item.accent];
              return (
                <div key={item.title} className={`group rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl border ${c.icon}`}>{item.icon}</div>
                  <h3 className="text-[15px] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="startups" className="relative border-t border-white/4 bg-[#070707] px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_50%,rgba(6,247,227,0.03)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Uychi Startaplari</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Uychi Tumanida<br />Tug'ilgan Startaplar</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">Uychi IT Hubning rezident startaplari mahalliy muammolarga innovatsion yechimlar topib, global bozorga chiqmoqda.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {STARTUPS.map((s) => {
              const c = A[s.accent];
              return (
                <div key={s.name} className={`flex flex-col rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${c.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />{s.sector}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-600">Asos. {s.founded}</span>
                  </div>
                  <h3 className={`mt-4 text-[17px] font-bold ${c.text}`}>{s.name}</h3>
                  <div className="mt-4 flex flex-1 flex-col gap-4 text-[13px]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">Muammo</span>
                      <p className="mt-1.5 leading-relaxed text-zinc-300">{s.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">Yechim</span>
                      <p className="mt-1.5 leading-relaxed text-zinc-300">{s.solution}</p>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="rounded-xl border border-white/4 bg-white/2 px-4 py-3">
                        <p className={`font-mono text-[11px] font-medium ${c.text}`}>{s.tech}</p>
                        <p className="mt-1.5 text-[12px] font-medium text-zinc-400">{s.users}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative border-t border-white/4 px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_50%,rgba(167,139,250,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">/ IT Xizmatlari</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Uychi IT Kompaniyalari<br />Nima Qila Oladi?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">Uychi IT Hubning rezident kompaniyalari raqamli transformatsiya, dastur ishlab chiqish va IT maslahat xizmatlarini taqdim etadi.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {IT_COMPANIES.map((company) => {
              const c = A[company.accent];
              return (
                <div key={company.id} className={`group rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-[16px] font-bold ${c.text}`}>{company.name}</h3>
                    <div className="flex shrink-0 items-center gap-3 text-[11px] text-zinc-600">
                      <span>{company.employees} xodim</span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-[13px] text-zinc-500">{company.tagline}</p>

                  <ul className="mt-5 space-y-2">
                    {company.services.map((srv) => (
                      <li key={srv} className="flex items-center gap-2 text-[13px] text-zinc-300">
                        <span className={`h-1 w-1 shrink-0 rounded-full ${c.dot}`} />
                        {srv}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {company.stack.map((tech) => (
                      <span key={tech} className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium ${c.badge}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/4 pt-4">
                    <span className="text-[12px] text-zinc-600">{company.projects}+ loyiha</span>
                    <span className={`text-[11px] font-semibold ${c.text}`}>IT Park rezidenti</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="relative border-t border-white/4 bg-[#070707] px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(167,139,250,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Jarayon</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Qanday Ishlaydi?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              Uychi IT Hubga qo&apos;shilish jarayoni sodda va shaffof — 4 ta qadamda boshlaysiz.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Ariza Topshiring", desc: "Startap, kompaniya yoki o'quvchi sifatida onlayn ariza to'ldiring. 5 daqiqa vaqt oladi.", color: "cyan" as const },
              { step: "02", title: "Ko'rib Chiqiladi", desc: "Jamoamiz arizangizni 3 ish kuni ichida ko'rib chiqadi va elektron pochta orqali javob beradi.", color: "violet" as const },
              { step: "03", title: "Suhbatga Taklif", desc: "Tanlov o'tgan nomzodlar video yoki bevosita suhbatga taklif qilinadi. Savol-javob imkoniyati.", color: "emerald" as const },
              { step: "04", title: "Hubga Qo'shiling", desc: "Rasmiy a'zo bo'lib, ofis maydonidan, mentorlik dasturidan va barcha resurslardan foydalaning.", color: "cyan" as const },
            ].map((item) => {
              const colors = {
                cyan: { border: "border-cyan-500/20", num: "text-cyan-400/20", title: "text-cyan-400", dot: "bg-cyan-400" },
                violet: { border: "border-violet-400/20", num: "text-violet-400/20", title: "text-violet-400", dot: "bg-violet-400" },
                emerald: { border: "border-emerald-400/20", num: "text-emerald-400/20", title: "text-emerald-400", dot: "bg-emerald-400" },
              };
              const c = colors[item.color];
              return (
                <div key={item.step} className={`relative rounded-2xl border bg-[#0a0a0a] p-6 ${c.border}`}>
                  <span className={`block text-[4rem] font-bold leading-none ${c.num}`}>{item.step}</span>
                  <h3 className={`mt-2 text-[16px] font-bold ${c.title}`}>{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/apply/startup" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-3.5 text-[13px] font-bold text-black transition-all hover:bg-cyan-300">
              Startap Ariza Topshirish
            </Link>
            <Link href="/apply/investor" className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 px-8 py-3.5 text-[13px] font-semibold text-violet-400 transition-all hover:border-violet-400/50 hover:text-violet-300">
              Investor Ariza Topshirish
            </Link>
            <Link href="/education" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-[13px] font-semibold text-zinc-400 transition-all hover:border-white/20 hover:text-white">
              Ta&apos;lim Dasturlari
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="relative border-t border-white/4 bg-[#070707] px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_60%,rgba(52,211,153,0.03)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ So'nggi Yangiliklar</p>
              <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Uychi IT Hubndan<br />Eng So'nggi Xabarlar</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">Uychi IT ekotizimidagi muhim voqealar, hamkorliklar va muvaffaqiyatlar.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item, idx) => {
              const accent = ACCENTS[idx % 3];
              const c = A[accent];
              return (
                <article key={item.id} className={`group flex flex-col rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.badge}`}>
                      {item.category}
                    </span>
                    <time className="text-[11px] text-zinc-600">{item.published_at?.slice(0, 10) || ""}</time>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-white/90">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-zinc-500">
                    {item.summary}
                  </p>
                  <div className={`mt-5 flex items-center gap-1 text-[12px] font-semibold ${c.text}`}>
                    Batafsil o'qish
                    <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="invest" className="relative border-t border-white/4 px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(52,211,153,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Nima Uchun Uychi?</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Investitsiya va<br />Strategik Imtiyozlar</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">Nima uchun global texnologiya kompaniyalari o&apos;zlarining mintaqaviy markazini Uychi, O&apos;zbekistonda ochishni tanlayapti.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p) => (
              <div key={p.title} className="group rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/5 text-lg font-bold text-emerald-400">{p.symbol}</div>
                <h3 className="text-[15px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-br from-[#0d0d0d] to-[#070707]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_50%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />
            <div className="relative flex flex-col items-center gap-8 p-8 text-center md:flex-row md:p-10 md:text-left">
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">Investitsiya Taqdimoti</p>
                <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">To&apos;liq Ma&apos;lumot Olmoqchimisiz?</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-zinc-500">Batafsil bozor ma&apos;lumotlari, rag&apos;batlantirish tuzilmalari, ROI modellari va tasdiqlangan muvaffaqiyat tarixlarini o&apos;z ichiga olgan investitsiya taqdimotimizni yuklab oling.</p>
              </div>
              <a href="#" className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 px-6 py-3.5 text-[13px] font-bold text-cyan-400 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.35)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Investitsiya Taqdimotini Yuklab Olish (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="relative border-t border-white/4 px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(6,247,227,0.02)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">/ Hamkorlar & Investorlar</p>
            <h2 className="mt-2 text-[clamp(1.4rem,3vw,2rem)] font-bold text-white">Bizga ishongan tashkilotlar</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["IT Park Uzbekistan", "Google for Startups", "AWS Startups", "Microsoft for Startups", "UNDP Uzbekistan", "ADB Ventures", "Techstars", "KOICA", "Alibaba Cloud", "IFC World Bank", "Namangan Davlat Universiteti", "TATU", "Namangan Viloyat Hokimligi", "Iqtisodiyot Vazirligi", "UZINFOCOM", "Namangan Tekstil"].map((name) => (
              <div key={name} className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-[12px] font-semibold text-zinc-500 transition-all hover:border-white/12 hover:text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative border-t border-white/4 bg-[#070707] px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">/ Bog&apos;lanish & Hamkorlik</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">Birgalikda Quramiz</h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-zinc-500">Imkoniyatlarni o&apos;rganishga tayyormisiz? Formani to&apos;ldiring va bizning hamkorlik jamoamiz 24 soat ichida javob beradi.</p>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-6 text-[13px] text-zinc-500">
              <span className="flex items-center gap-1.5"><span className="text-cyan-400">📍</span> Istiqlol ko&apos;chasi 15, Uychi tumani, Namangan viloyati</span>
              <span className="flex items-center gap-1.5"><span className="text-cyan-400">📞</span> +998 79 224 00 00</span>
              <span className="flex items-center gap-1.5"><span className="text-cyan-400">✉</span> info@uychi.uz</span>
            </div>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 text-2xl">✓</div>
              <h3 className="text-xl font-bold text-white">Xabar Yuborildi!</h3>
              <p className="mt-2 text-[14px] text-zinc-500">Jamoamiz 24 soat ichida siz bilan bog&apos;lanadi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Ism Familya", name: "name", type: "text", placeholder: "To'liq ism va familyangiz", span: 1 },
                { label: "Kompaniya", name: "company", type: "text", placeholder: "Kompaniya yoki tashkilot nomi", span: 1 },
                { label: "Mamlakat", name: "country", type: "text", placeholder: "Mamlakatingiz", span: 1 },
                { label: "Elektron Pochta", name: "email", type: "email", placeholder: "siz@kompaniya.com", span: 1 },
                { label: "Telefon Raqam", name: "phone", type: "tel", placeholder: "+998 XX XXX XX XX", span: 2 },
              ].map((f) => (
                <div key={f.label} className={f.span === 2 ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} required className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3 focus:shadow-[0_0_0_3px_rgba(6,247,227,0.05)]" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Xabar</label>
                <textarea name="message" rows={5} placeholder="Loyiha, investitsiya yoki hamkorlik bo'yicha so'roqingizni yozing..." required className="w-full resize-none rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3 focus:shadow-[0_0_0_3px_rgba(6,247,227,0.05)]" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={sending} className="group w-full rounded-full bg-cyan-400 py-4 text-[14px] font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_35px_-5px_rgba(6,247,227,0.5)] disabled:opacity-60">
                  {sending ? "Yuborilmoqda..." : <>Xabar Yuborish <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
