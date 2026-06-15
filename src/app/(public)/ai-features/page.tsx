"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

const FEATURES = {
  UZ: [
    {
      id: "chat", icon: "💬", accent: "accent" as const,
      title: "AI Chat Yordamchi",
      desc: "Ko'p tilli AI yordamchi — investitsiya imkoniyatlari, ekotizim xizmatlari va qonuniy talablar bo'yicha 24/7 aniq javob beradi. O'zbek, Rus, Ingliz va boshqa tillarda ishlaydi.",
      caps: ["Real vaqtda ko'p tilli qo'llab-quvvatlash", "Investitsiya so'rovlarini hal qilish", "Hujjatlar bo'yicha Q&A", "Qonuniy yo'naltirishlar"],
    },
    {
      id: "business", icon: "📊", accent: "violet" as const,
      title: "AI Biznes Maslahatchisi",
      desc: "Markaziy Osiyo texnologiya landshafti uchun bozorga kirish strategiyalari, raqobat tahlili va biznes-model optimizatsiyasini baholovchi ML-asosidagi strategik tizim.",
      caps: ["Bozor tahlili hisobotlari", "Raqobatchilar razvedkasi", "Biznes-model baholash", "Strategik yo'l xaritalari"],
    },
    {
      id: "investment", icon: "📈", accent: "emerald" as const,
      title: "AI Investitsiya Yordamchisi",
      desc: "Startaplarni tahlil qiladigan, xavf baholaydigan, global analoglar bilan solishtiradi va daqiqalar ichida tuzilgan investitsiya xatiralarini yaratadigan intellektual due diligence vositasi.",
      caps: ["Avtomatik due diligence", "Xavf baholash modellari", "Global benchmarking", "Investitsiya xatirasi generatsiyasi"],
    },
    {
      id: "startup", icon: "🚀", accent: "accent" as const,
      title: "AI Startap Maslahatchisi",
      desc: "Minglab muvaffaqiyatli startap trajektoriyalarida o'qitilgan virtual mentor. Mahsulot-bozor mosligi, moliyalashtirish, jamoa qurish va miqyoslashtirish strategiyasi bo'yicha shaxsiy yo'l-yo'riq beradi.",
      caps: ["PMF baholash", "Moliyalashtirish qo'llanmalari", "Jamoa tuzilmasi maslahati", "Miqyoslashtirish tizimlari"],
    },
    {
      id: "translation", icon: "🌐", accent: "violet" as const,
      title: "AI Tarjima Markazi",
      desc: "Yuridik, moliyaviy va texnik hujjatlar uchun maxsus sozlangan 40+ tildagi kontekstga sezgir tarjima motori. Barcha tarjimalarda nuanslar va professional ohangni saqlaydi.",
      caps: ["40+ til", "Yuridik hujjat tarjimasi", "Moliyaviy terminologiya", "Real vaqtda talqin"],
    },
    {
      id: "documents", icon: "📄", accent: "emerald" as const,
      title: "AI Hujjat Generatori",
      desc: "NDA, MoU, investitsiya term-sheet, kompaniya ro'yxatdan o'tkazish shakllari, sheriklik shartnomalarini O'zbek va xalqaro qonunchilikka muvofiq avtomatik yaratadi.",
      caps: ["NDA va MoU generatsiyasi", "Term-sheet avtomatizatsiyasi", "Pitch deck yaratuvchi", "Moslik tekshiruvi"],
    },
    {
      id: "voice", icon: "🎙️", accent: "accent" as const,
      title: "AI Ovoz Yordamchisi",
      desc: "Tabiiy til ovoz buyruqlari orqali Uychi Hub platformasiga qo'lsiz kirish. Xizmatlarda harakatlanish, uchrashuvlarni bron qilish, ma'lumotlar bazalarini so'rash — termasdan.",
      caps: ["Ovozli navigatsiya", "Ovoz orqali uchrashuv bron qilish", "Ma'lumotlar so'rovlari", "Ko'p tilli ovoz qo'llab-quvvatlash"],
    },
    {
      id: "knowledge", icon: "🧠", accent: "violet" as const,
      title: "AI Bilim Bazasi",
      desc: "Markaziy Osiyo raqamli iqtisodiyotiga oid qonuniy mexanizmlar, bozor hisobotlari, investitsiya misollarini va texnologiya tendentsiyalarini to'plovchi muntazam yangilanadigan intellektual ombor.",
      caps: ["Qonunchilik ma'lumotlar bazasi", "Bozor razvedkasi", "Investitsiya misollar to'plami", "Texnologiya tendentsiyalari hisobotlari"],
    },
  ],
  RU: [
    {
      id: "chat", icon: "💬", accent: "accent" as const,
      title: "ИИ Чат-ассистент",
      desc: "Многоязычный ИИ-ассистент — даёт точные ответы об инвестиционных возможностях, услугах экосистемы и правовых требованиях 24/7 на узбекском, русском, английском и других языках.",
      caps: ["Многоязычная поддержка в реальном времени", "Обработка инвестиционных запросов", "Вопросы по документам", "Правовые рекомендации"],
    },
    {
      id: "business", icon: "📊", accent: "violet" as const,
      title: "ИИ Бизнес-консультант",
      desc: "ML-аналитика для оценки стратегий выхода на рынок, конкурентного позиционирования и оптимизации бизнес-модели в контексте технологического ландшафта Центральной Азии.",
      caps: ["Отчёты анализа рынка", "Конкурентная разведка", "Оценка бизнес-модели", "Стратегические дорожные карты"],
    },
    {
      id: "investment", icon: "📈", accent: "emerald" as const,
      title: "ИИ Инвестиционный ассистент",
      desc: "Интеллектуальный инструмент due diligence: анализирует стартапы, генерирует оценки рисков, сравнивает с мировыми аналогами и создаёт инвестиционные меморандумы за минуты.",
      caps: ["Автоматизированный due diligence", "Модели оценки рисков", "Глобальный бенчмаркинг", "Генерация инвестиционных меморандумов"],
    },
    {
      id: "startup", icon: "🚀", accent: "accent" as const,
      title: "ИИ Стартап-советник",
      desc: "Виртуальный ментор, обученный на тысячах траекторий успешных стартапов. Даёт персональные рекомендации по PMF, фандрайзингу, построению команды и стратегии масштабирования.",
      caps: ["Оценка PMF", "Руководства по фандрайзингу", "Советы по структуре команды", "Фреймворки масштабирования"],
    },
    {
      id: "translation", icon: "🌐", accent: "violet" as const,
      title: "ИИ Центр переводов",
      desc: "Контекстно-чувствительный движок перевода, поддерживающий 40+ языков с доменной точностью для юридических, финансовых и технических документов.",
      caps: ["40+ языков", "Перевод юридических документов", "Финансовая терминология", "Синхронный перевод"],
    },
    {
      id: "documents", icon: "📄", accent: "emerald" as const,
      title: "ИИ Генератор документов",
      desc: "Автоматическое создание NDA, MoU, инвестиционных term sheet, форм регистрации компаний и питч-деков в соответствии с узбекским и международным законодательством.",
      caps: ["Генерация NDA и MoU", "Автоматизация term sheet", "Конструктор питч-деков", "Проверка соответствия"],
    },
    {
      id: "voice", icon: "🎙️", accent: "accent" as const,
      title: "ИИ Голосовой ассистент",
      desc: "Доступ к платформе Uychi Hub без рук через голосовые команды на естественном языке. Навигация по сервисам, бронирование встреч, запросы в базы данных — без набора текста.",
      caps: ["Голосовая навигация", "Бронирование встреч голосом", "Запросы данных", "Многоязычная голосовая поддержка"],
    },
    {
      id: "knowledge", icon: "🧠", accent: "violet" as const,
      title: "ИИ База знаний",
      desc: "Постоянно обновляемый интеллектуальный репозиторий с нормативной базой, рыночными отчётами, инвестиционными кейсами и технологическими трендами цифровой экономики Центральной Азии.",
      caps: ["Нормативная база данных", "Рыночная аналитика", "Инвестиционные кейсы", "Отчёты технологических трендов"],
    },
  ],
  EN: [
    {
      id: "chat", icon: "💬", accent: "accent" as const,
      title: "AI Chat Assistant",
      desc: "Multilingual AI assistant providing instant, accurate answers about investment opportunities, ecosystem services, and regulatory requirements — available 24/7 in Uzbek, Russian, English and more.",
      caps: ["Real-time multilingual support", "Investment query resolution", "Document Q&A", "Regulatory guidance"],
    },
    {
      id: "business", icon: "📊", accent: "violet" as const,
      title: "AI Business Consultant",
      desc: "ML-powered strategic insights to evaluate market entry strategies, competitive positioning, and business model optimization specific to the Central Asian tech landscape.",
      caps: ["Market analysis reports", "Competitor intelligence", "Business model scoring", "Strategic roadmaps"],
    },
    {
      id: "investment", icon: "📈", accent: "emerald" as const,
      title: "AI Investment Assistant",
      desc: "Intelligent due diligence tool that analyses startups, generates risk assessments, benchmarks against global comps, and produces structured investment memos in minutes.",
      caps: ["Automated due diligence", "Risk scoring models", "Global benchmarking", "Investment memo generation"],
    },
    {
      id: "startup", icon: "🚀", accent: "accent" as const,
      title: "AI Startup Advisor",
      desc: "Virtual mentor trained on thousands of successful startup trajectories. Personalised guidance on product-market fit, fundraising, team building, and scaling strategy.",
      caps: ["PMF assessment", "Fundraising playbooks", "Team structure advice", "Scaling frameworks"],
    },
    {
      id: "translation", icon: "🌐", accent: "violet" as const,
      title: "AI Translation Hub",
      desc: "Context-aware translation engine supporting 40+ languages with domain-specific accuracy for legal, financial, and technical documents. Preserves nuance and professional tone.",
      caps: ["40+ languages", "Legal document translation", "Financial terminology", "Real-time interpretation"],
    },
    {
      id: "documents", icon: "📄", accent: "emerald" as const,
      title: "AI Document Generator",
      desc: "Automated generation of NDAs, MoUs, investment term sheets, company registration forms, and pitch decks — compliant with Uzbek and international law.",
      caps: ["NDA & MoU generation", "Term sheet automation", "Pitch deck builder", "Compliance checking"],
    },
    {
      id: "voice", icon: "🎙️", accent: "accent" as const,
      title: "AI Voice Assistant",
      desc: "Hands-free access to the Uychi Hub platform via natural language voice commands. Navigate services, book meetings, query databases — without typing.",
      caps: ["Voice navigation", "Meeting booking by voice", "Data queries", "Multi-language voice support"],
    },
    {
      id: "knowledge", icon: "🧠", accent: "violet" as const,
      title: "AI Knowledge Base",
      desc: "Continuously updated intelligence repository aggregating regulatory frameworks, market reports, investment case studies, and technology trends relevant to the Central Asian digital economy.",
      caps: ["Regulatory database", "Market intelligence", "Investment case studies", "Technology trend reports"],
    },
  ],
};

const HERO = {
  UZ: {
    badge: "8 ta AI Xizmat",
    title: "Uychi Hubning AI Mexanizmi",
    titleGradient: "Uychi Hub",
    desc: "Markaziy Osiyo bozorida biznes qarorlarini tezlashtirish, operatsiyalarni soddalashtirishga mo'ljallangan enterprise darajadagi AI xizmatlar to'plami.",
    demo: "Demo Ko'rish",
    contact: "Bog'lanish",
    cta: "Bepul Demo Bron Qilish →",
    ctaDesc: "Jamoamiz bilan jonli demo rejalang va AI xizmatlari sizning biznesingizni qanday tezlashtirishi mumkinligini bilib oling.",
  },
  RU: {
    badge: "8 ИИ Инструментов",
    title: "ИИ Движок",
    titleGradient: "Uychi Hub",
    desc: "Набор ИИ-инструментов корпоративного уровня для ускорения бизнес-решений, оптимизации операций и открытия новых возможностей на рынке Центральной Азии.",
    demo: "Демо",
    contact: "Связаться",
    cta: "Записаться на бесплатное демо →",
    ctaDesc: "Закажите живую демонстрацию с нашей командой и узнайте, как ИИ-инструменты могут ускорить ваш бизнес.",
  },
  EN: {
    badge: "8 AI-Powered Tools",
    title: "The AI Engine Behind",
    titleGradient: "Uychi Hub",
    desc: "A suite of enterprise-grade AI tools built to accelerate business decisions, streamline operations, and unlock new opportunities across the Central Asian market.",
    demo: "Schedule a Demo",
    contact: "Contact Sales",
    cta: "Book a Free Demo →",
    ctaDesc: "Book a live demo with our team and see how AI tools can accelerate your business in Uzbekistan.",
  },
};

const accentMap = {
  accent: { border: "border-accent/20 hover:border-accent/40", badge: "bg-accent/10 text-accent", glow: "hover:shadow-[0_0_40px_-10px_rgba(6,247,227,0.2)]" },
  violet: { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.2)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400", glow: "hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.2)]" },
};

export default function AIFeaturesPage() {
  const { lang } = useLang();
  const features = FEATURES[lang];
  const hero = HERO[lang];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.12)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight text-foreground">
            {hero.title}<br />
            <span className="gradient-text">{hero.titleGradient}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{hero.desc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/schedule" className="rounded-full bg-accent px-7 py-3 text-[13px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.5)]">
              {hero.demo}
            </Link>
            <Link href="/#contact" className="rounded-full border border-border px-7 py-3 text-[13px] font-semibold text-muted transition-all hover:border-border hover:text-foreground">
              {hero.contact}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((f) => {
              const c = accentMap[f.accent];
              return (
                <div key={f.id} id={f.id} className={`group rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 ${c.border} ${c.glow}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-3xl">{f.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-foreground">{f.title}</h2>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">{f.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {f.caps.map((cap) => (
                          <span key={cap} className={`rounded-full border border-border px-3 py-1 text-[11px] font-medium ${c.badge}`}>
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border-subtle bg-card px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">{hero.ctaDesc}</h2>
          <Link href="/schedule" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.5)]">
            {hero.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
