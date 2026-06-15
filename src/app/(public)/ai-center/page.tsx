"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string; glow: string; bg: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    glow: "hover:shadow-[0_0_40px_-10px_rgba(6,247,227,0.25)]",    bg: "bg-accent/5" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  glow: "hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.25)]",  bg: "bg-violet-500/5" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.25)]", bg: "bg-emerald-500/5" },
};

const AI_TOOLS = {
  UZ: [
    { id: "chat",        icon: "💬", title: "AI Chat Yordamchi",        desc: "Ko'p tilli AI yordamchi — investitsiya, ekotizim xizmatlari va qonunchilik haqida 24/7 javob beradi.",                                          tags: ["Ko'p tilli", "Real vaqt", "Hujjatlar Q&A"],  accent: "cyan" as AccentKey,    status: "Faol" },
    { id: "advisor",     icon: "🚀", title: "AI Startap Maslahatchisi",  desc: "Minglab muvaffaqiyatli startaplar tajribasida o'qitilgan virtual mentor — mahsulot-bozor mosligidan miqyoslashtirish strategiyasiga qadar.", tags: ["PMF baholash", "Moliyalashtirish", "Jamoa"],  accent: "violet" as AccentKey,  status: "Beta" },
    { id: "investment",  icon: "📊", title: "AI Investitsiya Tahlili",   desc: "Startaplarni tahlil qiluvchi, riskni baholovchi va investitsiya xatiralarini daqiqalar ichida tayyorlovchi intellektual tizim.",              tags: ["Risk baholash", "Moliyaviy model", "ROI"],   accent: "emerald" as AccentKey, status: "Faol" },
    { id: "documents",  icon: "📄", title: "AI Hujjat Generatori",      desc: "NDA, MoU, investitsiya term-sheet va pitch deck larni O'zbek va xalqaro qonunchilikka muvofiq avtomatik yaratish.",                            tags: ["NDA", "Term-sheet", "Pitch Deck"],           accent: "cyan" as AccentKey,    status: "Faol" },
    { id: "translation", icon: "🌐", title: "AI Tarjima Markazi",        desc: "40+ til bo'yicha kontekstga sezgir tarjima motori — yuridik, moliyaviy va texnik hujjatlar uchun maxsus sozlangan.",                            tags: ["40+ til", "Yuridik", "Texnik"],              accent: "violet" as AccentKey,  status: "Faol" },
    { id: "knowledge",   icon: "🧠", title: "AI Bilim Bazasi",           desc: "Qonuniy mexanizmlar, bozor hisobotlari va texnologiya tendentsiyalari bo'yicha muntazam yangilanib turadigan intellektual ombor.",              tags: ["Qonunchilik", "Bozor razvedkasi", "Trend"], accent: "emerald" as AccentKey, status: "Beta" },
  ],
  RU: [
    { id: "chat",        icon: "💬", title: "ИИ Чат-ассистент",          desc: "Многоязычный ИИ-помощник — отвечает 24/7 на вопросы об инвестициях, услугах экосистемы и законодательстве.",                                  tags: ["Многоязычный", "Реальное время", "Docs Q&A"], accent: "cyan" as AccentKey,    status: "Активен" },
    { id: "advisor",     icon: "🚀", title: "ИИ Советник по Стартапам",  desc: "Виртуальный ментор, обученный на тысячах успешных стартапов — от PMF до стратегии масштабирования.",                                          tags: ["Оценка PMF", "Финансирование", "Команда"],  accent: "violet" as AccentKey,  status: "Бета" },
    { id: "investment",  icon: "📊", title: "ИИ Анализ Инвестиций",      desc: "Интеллектуальная система для анализа стартапов, оценки рисков и подготовки инвестиционных меморандумов за минуты.",                          tags: ["Оценка рисков", "Фин. модель", "ROI"],      accent: "emerald" as AccentKey, status: "Активен" },
    { id: "documents",  icon: "📄", title: "ИИ Генератор Документов",    desc: "Автоматическое создание NDA, MoU, term-sheet и pitch deck в соответствии с узбекским и международным законодательством.",                    tags: ["NDA", "Term-sheet", "Pitch Deck"],           accent: "cyan" as AccentKey,    status: "Активен" },
    { id: "translation", icon: "🌐", title: "ИИ Центр Переводов",        desc: "Контекстно-чувствительный переводчик на 40+ языков, специально настроенный для юридических, финансовых и технических документов.",             tags: ["40+ языков", "Юридический", "Технический"], accent: "violet" as AccentKey,  status: "Активен" },
    { id: "knowledge",   icon: "🧠", title: "ИИ База Знаний",            desc: "Регулярно обновляемое интеллектуальное хранилище о правовых механизмах, рыночных отчётах и технологических трендах.",                          tags: ["Законодательство", "Рынок", "Тренды"],       accent: "emerald" as AccentKey, status: "Бета" },
  ],
  EN: [
    { id: "chat",        icon: "💬", title: "AI Chat Assistant",         desc: "Multilingual AI assistant providing instant, accurate answers about investment opportunities, ecosystem services, and regulations — 24/7.",        tags: ["Multilingual", "Real-time", "Docs Q&A"],    accent: "cyan" as AccentKey,    status: "Active" },
    { id: "advisor",     icon: "🚀", title: "AI Startup Advisor",        desc: "Virtual mentor trained on thousands of successful startups — from product-market fit to scaling strategy.",                                       tags: ["PMF Assessment", "Funding", "Team Building"], accent: "violet" as AccentKey, status: "Beta" },
    { id: "investment",  icon: "📊", title: "AI Investment Analysis",    desc: "Intelligent system for analyzing startups, assessing risk, and preparing investment memos in minutes.",                                           tags: ["Risk Scoring", "Financial Model", "ROI"],   accent: "emerald" as AccentKey, status: "Active" },
    { id: "documents",  icon: "📄", title: "AI Document Generator",     desc: "Automated creation of NDAs, MoUs, investment term sheets, and pitch decks compliant with Uzbek and international law.",                          tags: ["NDA", "Term-sheet", "Pitch Deck"],           accent: "cyan" as AccentKey,    status: "Active" },
    { id: "translation", icon: "🌐", title: "AI Translation Center",     desc: "Context-aware translation engine for 40+ languages, specially tuned for legal, financial, and technical documents.",                              tags: ["40+ Languages", "Legal", "Technical"],      accent: "violet" as AccentKey,  status: "Active" },
    { id: "knowledge",   icon: "🧠", title: "AI Knowledge Base",        desc: "Continuously updated intelligent repository covering legal frameworks, market reports, and technology trends.",                                    tags: ["Legal", "Market Intel", "Trends"],           accent: "emerald" as AccentKey, status: "Beta" },
  ],
};

const RESEARCH_PROJECTS = {
  UZ: [
    { title: "AgriTech AI Platformasi",      desc: "Namangan viloyatidagi dehqonchilik uchun sun'iy intellekt asosidagi hosildorlikni bashorat qilish tizimi.",         phase: "Sinov bosqichi",  team: 8,  accent: "emerald" as AccentKey },
    { title: "Aqlli Shahar Boshqaruvi",      desc: "Uychi tumanining kommunal xizmatlari va transport oqimlarini real vaqtda kuzatib boruvchi aqlli boshqaruv tizimi.", phase: "Ishlab chiqish",  team: 12, accent: "cyan" as AccentKey    },
    { title: "O'zbek NLP Korpusi",           desc: "O'zbek tilida tabiiy til qayta ishlash uchun katta hajmli ma'lumotlar to'plami va til modellarini o'rgatish.",      phase: "Ma'lumot yig'ish", team: 6, accent: "violet" as AccentKey  },
    { title: "Tibbiy AI Diagnostika",        desc: "Namangan viloyati kasalxonalari bilan hamkorlikda tibbiy rasmlarni AI yordamida tashxis qilish prototip tizimi.",   phase: "Konsepsiya",      team: 5,  accent: "cyan" as AccentKey    },
  ],
  RU: [
    { title: "AgriTech ИИ Платформа",       desc: "Система прогнозирования урожайности на основе ИИ для сельского хозяйства Наманганской области.",                    phase: "Тестирование",    team: 8,  accent: "emerald" as AccentKey },
    { title: "Умное Управление Городом",    desc: "Интеллектуальная система мониторинга коммунальных услуг и транспортных потоков в режиме реального времени.",         phase: "Разработка",      team: 12, accent: "cyan" as AccentKey    },
    { title: "Узбекский NLP Корпус",        desc: "Крупный датасет для обработки естественного языка и обучения языковых моделей на узбекском языке.",                  phase: "Сбор данных",     team: 6,  accent: "violet" as AccentKey  },
    { title: "Медицинская ИИ Диагностика",  desc: "Прототип системы диагностики медицинских изображений с ИИ в партнёрстве с больницами Наманганской области.",        phase: "Концепция",       team: 5,  accent: "cyan" as AccentKey    },
  ],
  EN: [
    { title: "AgriTech AI Platform",        desc: "AI-powered crop yield prediction system for farming in Namangan region.",                                             phase: "Testing",         team: 8,  accent: "emerald" as AccentKey },
    { title: "Smart City Dashboard",        desc: "Real-time monitoring system for municipal services and traffic flows in Uychi district.",                             phase: "Development",     team: 12, accent: "cyan" as AccentKey    },
    { title: "Uzbek NLP Corpus",            desc: "Large-scale dataset for natural language processing and language model training in Uzbek.",                           phase: "Data Collection", team: 6,  accent: "violet" as AccentKey  },
    { title: "Medical AI Diagnostics",      desc: "Prototype AI medical imaging diagnostic system developed in partnership with Namangan hospitals.",                    phase: "Concept",         team: 5,  accent: "cyan" as AccentKey    },
  ],
};

const IMPACT_STATS = {
  UZ: [
    { value: "1,200+", label: "AI so'rovlar/kun",         color: "text-accent" },
    { value: "8",      label: "AI vositalar",              color: "text-violet-400" },
    { value: "4",      label: "Tadqiqot loyihalari",       color: "text-emerald-400" },
    { value: "98%",    label: "Foydalanuvchi mamnunligi", color: "text-accent" },
  ],
  RU: [
    { value: "1,200+", label: "ИИ запросов/день",         color: "text-accent" },
    { value: "8",      label: "ИИ инструментов",           color: "text-violet-400" },
    { value: "4",      label: "Исследовательских проектов", color: "text-emerald-400" },
    { value: "98%",    label: "Удовлетворённость",         color: "text-accent" },
  ],
  EN: [
    { value: "1,200+", label: "AI queries/day",            color: "text-accent" },
    { value: "8",      label: "AI tools",                  color: "text-violet-400" },
    { value: "4",      label: "Research projects",         color: "text-emerald-400" },
    { value: "98%",    label: "User satisfaction",         color: "text-accent" },
  ],
};

const T = {
  UZ: {
    badge: "/ AI & Innovatsiya Markazi",
    h1a: "Sun'iy Intellekt",
    h1b: "Kelajak Bugun Boshlanadi",
    desc: "Uychi AI Markazi — Namangan-Uchqo'rg'on yo'lidagi Uychi tumanida AI tadqiqot va ishlab chiqish markazi. Korporativ AI vositalari, startap akseleratsiyasi va ilmiy tadqiqotlar.",
    demoBtn: "Demoni Ko'rish",
    researchBtn: "Tadqiqot Guruhi",
    tabTools: "AI Vositalar",
    tabResearch: "Tadqiqot Loyihalari",
    toolsTitle: "AI Vositalar Arsenali",
    toolsDesc: "Uychi IT Hub rezidentlari uchun bepul taqdim etiladigan AI vositalar to'plami.",
    startBtn: "Boshlash →",
    researchTitle: "Faol Tadqiqot Loyihalari",
    researchDesc: "Uychi AI Markazida amalga oshirilayotgan ilmiy va amaliy tadqiqotlar.",
    specialists: "mutaxassis",
    more: "Batafsil →",
    joinBadge: "/ Tadqiqot Guruhi",
    joinTitle: "Tadqiqotchilarga Qo'shiling",
    joinDesc: "AI tadqiqot guruhimizga qo'shilish uchun ariza qoldiring — universitet o'qituvchilari, doktorantlar va mustaqil tadqiqotchilar xush kelibsiz.",
    joinBtn: "Ariza Topshirish",
    ctaTitle: "AI Imkoniyatlarini Birgalikda Ochaylik",
    ctaDesc: "Kompaniyangiz yoki startapingiz uchun maxsus AI yechimi ishlab chiqishga tayyor jamoamiz bilan bog'laning.",
    freeConsult: "Bepul Konsultatsiya",
    techDocs: "Texnik Hujjatlar",
  },
  RU: {
    badge: "/ Центр ИИ и Инноваций",
    h1a: "Искусственный Интеллект",
    h1b: "Будущее Начинается Сегодня",
    desc: "Uychi AI Markaz — центр исследований и разработки ИИ в районе Uychi. Корпоративные ИИ-инструменты, акселерация стартапов и научные исследования.",
    demoBtn: "Смотреть Демо",
    researchBtn: "Группа Исследований",
    tabTools: "ИИ Инструменты",
    tabResearch: "Исследовательские Проекты",
    toolsTitle: "Арсенал ИИ Инструментов",
    toolsDesc: "Набор ИИ-инструментов, предоставляемых резидентам Uychi IT Hub бесплатно.",
    startBtn: "Начать →",
    researchTitle: "Активные Исследовательские Проекты",
    researchDesc: "Научные и прикладные исследования, проводимые в Uychi AI Markaz.",
    specialists: "специалистов",
    more: "Подробнее →",
    joinBadge: "/ Группа Исследований",
    joinTitle: "Присоединяйтесь к Исследователям",
    joinDesc: "Оставьте заявку на вступление в нашу группу ИИ-исследований — приглашаются преподаватели, докторанты и независимые исследователи.",
    joinBtn: "Подать Заявку",
    ctaTitle: "Откроем Возможности ИИ Вместе",
    ctaDesc: "Свяжитесь с нашей командой для разработки индивидуального ИИ-решения для вашей компании или стартапа.",
    freeConsult: "Бесплатная Консультация",
    techDocs: "Техническая Документация",
  },
  EN: {
    badge: "/ AI & Innovation Center",
    h1a: "Artificial Intelligence",
    h1b: "The Future Starts Today",
    desc: "Uychi AI Center — an AI research and development hub in Uychi district. Corporate AI tools, startup acceleration, and scientific research.",
    demoBtn: "View Demo",
    researchBtn: "Research Team",
    tabTools: "AI Tools",
    tabResearch: "Research Projects",
    toolsTitle: "AI Tools Arsenal",
    toolsDesc: "A suite of AI tools provided free to Uychi IT Hub residents.",
    startBtn: "Get Started →",
    researchTitle: "Active Research Projects",
    researchDesc: "Scientific and applied research conducted at Uychi AI Center.",
    specialists: "specialists",
    more: "Learn More →",
    joinBadge: "/ Research Team",
    joinTitle: "Join Our Researchers",
    joinDesc: "Apply to join our AI research group — university faculty, PhD students, and independent researchers are welcome.",
    joinBtn: "Apply Now",
    ctaTitle: "Let's Unlock AI Possibilities Together",
    ctaDesc: "Contact our team to develop a custom AI solution for your company or startup.",
    freeConsult: "Free Consultation",
    techDocs: "Technical Docs",
  },
};

export default function AiCenterPage() {
  const [activeTab, setActiveTab] = useState<"tools" | "research">("tools");
  const { lang } = useLang();
  const t = T[lang];
  const tools = AI_TOOLS[lang];
  const projects = RESEARCH_PROJECTS[lang];
  const stats = IMPACT_STATS[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_30%,rgba(167,139,250,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.badge}</p>
              <h1 className="mt-3 text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight tracking-tight text-foreground">
                {t.h1a}
                <br />
                <span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  {t.h1b}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{t.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/schedule" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-[13px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.5)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  {t.demoBtn}
                </a>
                <a href="mailto:research@uychi.uz?subject=Tadqiqot guruhi" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-[13px] font-semibold text-muted transition-all hover:text-foreground">
                  {t.researchBtn}
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 lg:w-80">
              {stats.map((s) => (
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
                {tab === "tools" ? t.tabTools : t.tabResearch}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-accent" />
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
              <h2 className="text-2xl font-bold text-foreground">{t.toolsTitle}</h2>
              <p className="mt-2 text-[14px] text-muted">{t.toolsDesc}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => {
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
                    <a href="/schedule" className={`mt-5 block w-full rounded-xl border py-2.5 text-center text-[12px] font-bold transition-all ${c.badge} hover:opacity-80`}>
                      {t.startBtn}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "research" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">{t.researchTitle}</h2>
              <p className="mt-2 text-[14px] text-muted">{t.researchDesc}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((proj) => {
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
                          {proj.team} {t.specialists}
                        </span>
                      </div>
                      <button className={`text-[12px] font-semibold ${c.text} hover:underline`}>
                        {t.more}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-background to-card p-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">{t.joinBadge}</p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{t.joinTitle}</h3>
              <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">{t.joinDesc}</p>
              <a href="mailto:research@uychi.uz?subject=Tadqiqot guruhiga qo'shilish" className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-8 py-3.5 text-[14px] font-bold text-violet-400 transition-all hover:bg-violet-500/15">
                {t.joinBtn}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-border-subtle px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{t.ctaDesc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/schedule" className="rounded-full bg-accent px-8 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.5)]">
              {t.freeConsult}
            </a>
            <a href="mailto:ai@uychi.uz?subject=Texnik hujjatlar so'rovi" className="rounded-full border border-border px-8 py-3.5 text-[14px] font-semibold text-muted transition-all hover:text-foreground">
              {t.techDocs}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
