"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

const T = {
  UZ: {
    badge: "/ IT Kompaniyalar Katalogi",
    h1a: "Uychi IT Hubning", h1b: "Rezident Kompaniyalari",
    desc: "Uychi tumanidagi 900+ kichik korxona va IT Park rezident kompaniyalari — xizmatlar, texnologiyalar va bog'lanish ma'lumotlari.",
    search: "Kompaniya yoki xizmat qidirish...",
    empty: "Kompaniya topilmadi", clearFilter: "Filtrni tozalash",
    resident: "IT Park rezidenti", projects: "loyiha", contact: "Bog'lanish",
    ctaBadge: "/ IT Park Rezidenti Bo'ling", ctaTitle: "Kompaniyangizni Katalogga Qo'shing",
    ctaDesc: "IT Park rezidenti sifatida soliq imtiyozlari, infratuzilma va biznes rivojlanish xizmatlaridan foydalaning. Uychi tumanidagi 5 sanoat zonasida ofis ochish imkoniyati.",
    ctaApply: "Ariza topshirish", ctaItpark: "IT Park haqida",
    cats: { "Barchasi": "Barchasi", "Web & Mobile": "Web & Mobile", "AI & IoT": "AI & IoT", "ERP & CRM": "ERP & CRM", "Dizayn": "Dizayn", "Infratuzilma": "Infratuzilma", "Marketing": "Marketing", "O'yin": "O'yin" },
    stat1: "Katalogdagi kompaniyalar", stat2: "Jami loyihalar", stat3: "IT mutaxassislar", stat4: "Tuman korxonalari",
  },
  RU: {
    badge: "/ Каталог IT Компаний",
    h1a: "Резидентские Компании", h1b: "Uychi IT Hub",
    desc: "Более 900 малых предприятий и компаний-резидентов IT Park в Uychi — услуги, технологии и контактные данные.",
    search: "Поиск компании или услуги...",
    empty: "Компании не найдены", clearFilter: "Очистить фильтр",
    resident: "Резидент IT Park", projects: "проектов", contact: "Связаться",
    ctaBadge: "/ Стать Резидентом IT Park", ctaTitle: "Добавьте Компанию в Каталог",
    ctaDesc: "Как резидент IT Park, пользуйтесь налоговыми льготами, инфраструктурой и услугами по развитию бизнеса. Возможность открыть офис в 5 промышленных зонах района Uychi.",
    ctaApply: "Подать заявку", ctaItpark: "Об IT Park",
    cats: { "Barchasi": "Все", "Web & Mobile": "Web & Mobile", "AI & IoT": "AI & IoT", "ERP & CRM": "ERP & CRM", "Dizayn": "Дизайн", "Infratuzilma": "Инфраструктура", "Marketing": "Маркетинг", "O'yin": "Игры" },
    stat1: "Компаний в каталоге", stat2: "Всего проектов", stat3: "IT специалистов", stat4: "Предприятий района",
  },
  EN: {
    badge: "/ IT Companies Catalog",
    h1a: "Uychi IT Hub", h1b: "Resident Companies",
    desc: "900+ small businesses and IT Park resident companies in Uychi district — services, technologies, and contact info.",
    search: "Search company or service...",
    empty: "No companies found", clearFilter: "Clear filter",
    resident: "IT Park resident", projects: "projects", contact: "Contact",
    ctaBadge: "/ Become an IT Park Resident", ctaTitle: "Add Your Company to the Catalog",
    ctaDesc: "As an IT Park resident, enjoy tax incentives, infrastructure, and business development services. Open an office in one of 5 industrial zones in Uychi district.",
    ctaApply: "Apply now", ctaItpark: "About IT Park",
    cats: { "Barchasi": "All", "Web & Mobile": "Web & Mobile", "AI & IoT": "AI & IoT", "ERP & CRM": "ERP & CRM", "Dizayn": "Design", "Infratuzilma": "Infrastructure", "Marketing": "Marketing", "O'yin": "Gaming" },
    stat1: "Companies in catalog", stat2: "Total projects", stat3: "IT specialists", stat4: "District enterprises",
  },
};

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
  { id: 'namsoft', name: 'NamSoft', tagline: 'Korporativ web rivojlanishi va SaaS yechimlari', services: ['SaaS platformalar', 'B2B veb-ilovalar', 'Mikroservis arxitekturasi', 'Texnik konsalting'], stack: ['Vue.js', 'NestJS', 'TypeScript', 'MongoDB', 'RabbitMQ'], projects: 55, employees: '30+', accent: 'violet' },
  { id: 'textilesoft', name: 'TextileSoft', tagline: 'To\'qimachilik sanoati uchun raqamli yechimlar', services: ['Ishlab chiqarishni boshqarish', 'Sifat nazorati tizimlari', 'Eksport hujjatlash', 'Ombor menejmenti'], stack: ['Python', 'FastAPI', 'React', 'MySQL', 'Power BI'], projects: 28, employees: '14+', accent: 'cyan' },
  { id: 'smartagro', name: 'SmartAgro UZ', tagline: 'Qishloq xo\'jaligini raqamlashtirish va IoT', services: ['Dron monitoring', 'IoT sensori integratsiyasi', 'Hosil prognozi', 'Suv tizimlarini avtomatlashtirish'], stack: ['Python', 'TensorFlow', 'MQTT', 'InfluxDB', 'Grafana'], projects: 22, employees: '16+', accent: 'emerald' },
  { id: 'healthnet', name: 'HealthNet UZ', tagline: 'Tibbiyot muassasalari uchun axborot tizimlari', services: ['Elektron tibbiy karta', 'Navbat boshqaruvi', 'Laboratoriya LIMS', 'Telemedicine platform'], stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'HL7 FHIR'], projects: 18, employees: '20+', accent: 'violet' },
  { id: 'finflow', name: 'FinFlow', tagline: 'Moliyaviy texnologiyalar va to\'lov yechimlari', services: ['To\'lov integratsiyasi', 'Moliyaviy hisobot', 'Kredit skoringi', 'Mobile banking modul'], stack: ['Kotlin', 'Spring', 'React Native', 'Oracle', 'Kafka'], projects: 14, employees: '12+', accent: 'cyan' },
  { id: 'buildsmart', name: 'BuildSmart', tagline: 'Qurilish loyiha menejmenti va BIM yechimlari', services: ['BIM loyihalash', 'Qurilish monitoring', 'Smeta va tender', 'GIS integratsiya'], stack: ['Revit API', 'AutoCAD', 'React', 'Node.js', 'PostgreSQL'], projects: 40, employees: '18+', accent: 'emerald' },
  { id: 'voiceai', name: 'VoiceAI UZ', tagline: 'Sun\'iy intellekt va ovoz texnologiyalari', services: ['Chatbot yaratish', 'Ovozli asistentlar', 'O\'zbek NLP modellari', 'Sentiment tahlili'], stack: ['PyTorch', 'Hugging Face', 'FastAPI', 'Redis', 'Docker'], projects: 12, employees: '10+', accent: 'cyan' },
  { id: 'educore', name: 'EduCore UZ', tagline: 'Ta\'lim texnologiyalari va LMS platformalari', services: ['LMS yaratish', 'Video darslik hosting', 'Online imtihon tizimi', 'Maktab MIS'], stack: ['Next.js', 'Django', 'FFmpeg', 'MinIO', 'Redis'], projects: 25, employees: '16+', accent: 'violet' },
  { id: 'techsupport', name: 'TechSupport Pro', tagline: 'IT qo\'llab-quvvatlash va apparatni ta\'mirlash', services: ['IT autsorsing', 'Kompyuter diagnostika', 'Tarmoq montaj', 'Printer va MFU xizmati'], stack: ['Zabbix', 'GLPI', 'OPNsense', 'Proxmox', 'Ansible'], projects: 310, employees: '35+', accent: 'emerald' },
];

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string; glow: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    glow: "hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.15)]" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  glow: "hover:shadow-[0_0_25px_-5px_rgba(167,139,250,0.15)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", glow: "hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.15)]" },
};

const SERVICE_CATEGORIES = ["Barchasi", "Web & Mobile", "AI & IoT", "ERP & CRM", "Dizayn", "Infratuzilma", "Marketing", "O'yin"];

function matchCategory(services: string[], cat: string): boolean {
  if (cat === "Barchasi") return true;
  const map: Record<string, string[]> = {
    "Web & Mobile": ["web", "mobil", "ios", "android", "api", "saas", "b2b", "lms", "mobile"],
    "AI & IoT": ["chatbot", "nlp", "ai", "ml", "dron", "iot", "sensor", "telemedicine", "kredit", "sentiment"],
    "ERP & CRM": ["erp", "crm", "1c", "biznes", "ombor", "hujjat", "smeta", "bim", "to'lov", "moliyaviy"],
    "Dizayn": ["dizayn", "ui", "ux", "brend"],
    "Infratuzilma": ["server", "tarmoq", "kiberxavfsizlik", "bulut", "cloud", "autsorsing", "diagnostika"],
    "Marketing": ["seo", "smm", "marketing", "kontent", "reklama"],
    "O'yin": ["o'yin", "vr", "ar", "gamif"],
  };
  const keywords = map[cat] || [];
  return keywords.some((kw) => services.some((s) => s.toLowerCase().includes(kw)));
}

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Barchasi");
  const { lang } = useLang();
  const t = T[lang];

  const filtered = IT_COMPANIES.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.tagline.toLowerCase().includes(search.toLowerCase());
    return matchSearch && matchCategory(c.services, category);
  });

  const totalProjects = IT_COMPANIES.reduce((s, c) => s + c.projects, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">{t.badge}</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.h1a}<br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{t.h1b}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{t.desc}</p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: t.stat1, value: `${IT_COMPANIES.length}`, color: "text-violet-400" },
              { label: t.stat2, value: `${totalProjects}+`, color: "text-accent" },
              { label: t.stat3, value: "400+", color: "text-emerald-400" },
              { label: t.stat4, value: "900+", color: "text-violet-400" },
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
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  category === cat
                    ? "border-violet-400/40 bg-violet-500/10 text-violet-400"
                    : "border-border bg-card text-muted hover:border-violet-400/30 hover:text-foreground"
                }`}
              >
                {t.cats[cat as keyof typeof t.cats] ?? cat}
              </button>
            ))}
          </div>
        </div>

        {/* Companies grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">{t.empty}</p>
            <button onClick={() => { setSearch(""); setCategory("Barchasi"); }} className="mt-3 text-[13px] text-violet-400 hover:underline">{t.clearFilter}</button>
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
                      {t.resident}
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
                        {company.projects}+ {t.projects}
                      </span>
                    </div>
                    <a href={`mailto:info@uychi.uz?subject=Bog'lanish: ${encodeURIComponent(company.name)}`} className={`rounded-lg border px-3 py-1 text-[11px] font-semibold transition-all ${c.badge} hover:opacity-80`}>
                      {t.contact}
                    </a>
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-400">{t.ctaBadge}</p>
              <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">{t.ctaTitle}</h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted">{t.ctaDesc}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="/apply/startup" className="rounded-full border border-violet-400/30 bg-violet-500/10 px-6 py-3 text-[13px] font-bold text-violet-400 transition-all hover:bg-violet-500/20">
                {t.ctaApply}
              </a>
              <a href="https://itpark.uz" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-6 py-3 text-center text-[13px] font-semibold text-muted transition-all hover:text-foreground">
                {t.ctaItpark}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
