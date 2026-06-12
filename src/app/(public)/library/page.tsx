"use client";

import { useState } from "react";

type ResourceType = "book" | "paper" | "report" | "guide";

interface Resource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  category: string;
  year: number;
  pages: number;
  lang: "uz" | "ru" | "en";
  free: boolean;
  downloads: number;
  desc: string;
  accent: "cyan" | "violet" | "emerald";
}

const A = {
  cyan:    { border: "border-cyan-500/20 hover:border-cyan-500/40",    badge: "bg-cyan-500/10 text-cyan-400",    text: "text-cyan-400" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400", text: "text-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400", text: "text-emerald-400" },
};

const TYPE_ICONS: Record<ResourceType, string> = {
  book: "📚",
  paper: "📝",
  report: "📊",
  guide: "🗺️",
};

const TYPE_LABELS: Record<ResourceType, string> = {
  book: "Kitob",
  paper: "Ilmiy maqola",
  report: "Hisobot",
  guide: "Qo'llanma",
};

const LANG_FLAG: Record<string, string> = { uz: "🇺🇿", ru: "🇷🇺", en: "🇺🇸" };

const RESOURCES: Resource[] = [
  {
    id: "1",
    title: "O'zbekistonda Startap Ekotizimi: 2024 Holati",
    author: "IT Park Uzbekistan",
    type: "report",
    category: "Startap",
    year: 2024,
    pages: 48,
    lang: "uz",
    free: true,
    downloads: 2840,
    desc: "O'zbekiston startap ekotizimining 2024 yilgi holati, tendentsiyalari va investitsiya statistikasi haqida to'liq hisobot.",
    accent: "cyan",
  },
  {
    id: "2",
    title: "Agrotexnologiyalarga Kiritilgan Investitsiyalar",
    author: "ADB Ventures",
    type: "paper",
    category: "AgriTech",
    year: 2024,
    pages: 32,
    lang: "en",
    free: true,
    downloads: 1640,
    desc: "Markaziy Osiyo agrotexnologiya bozoriga investitsiya imkoniyatlari va qiyosiy tahlil.",
    accent: "emerald",
  },
  {
    id: "3",
    title: "Next.js 14 bilan Full-Stack Dasturlash",
    author: "Alisher Toshmatov",
    type: "book",
    category: "Dasturlash",
    year: 2024,
    pages: 320,
    lang: "uz",
    free: false,
    downloads: 4200,
    desc: "O'zbek tilida yozilgan birinchi Next.js to'liq qo'llanmasi — yangi boshlovchilardan professional darajagacha.",
    accent: "cyan",
  },
  {
    id: "4",
    title: "Bulut Infratuzilma va DevOps Asoslari",
    author: "Nodira Yusupova",
    type: "guide",
    category: "DevOps",
    year: 2023,
    pages: 180,
    lang: "uz",
    free: false,
    downloads: 3100,
    desc: "AWS, Docker va CI/CD pipeline larni o'rnatish va boshqarish bo'yicha amaliy qo'llanma.",
    accent: "violet",
  },
  {
    id: "5",
    title: "O'zbek NLP: Til Modellari Tadqiqoti",
    author: "Uychi AI Lab",
    type: "paper",
    category: "AI/ML",
    year: 2024,
    pages: 24,
    lang: "en",
    free: true,
    downloads: 980,
    desc: "O'zbek tilidagi tabiiy til qayta ishlash uchun yangi arxitektura va benchmark natijalari.",
    accent: "violet",
  },
  {
    id: "6",
    title: "Logistika 4.0: Raqamli Transformatsiya",
    author: "Namangan Davlat Universiteti",
    type: "report",
    category: "LogiTech",
    year: 2024,
    pages: 56,
    lang: "uz",
    free: true,
    downloads: 720,
    desc: "O'zbekiston logistika sektori va IoT/AI texnologiyalarini qo'llash bo'yicha tadqiqot.",
    accent: "emerald",
  },
  {
    id: "7",
    title: "Кибербезопасность для малого бизнеса",
    author: "CloudNet Uychi",
    type: "guide",
    category: "Kiberxavfsizlik",
    year: 2023,
    pages: 96,
    lang: "ru",
    free: true,
    downloads: 1850,
    desc: "Kichik va o'rta biznes uchun kiberxavfsizlik asoslari, tahdidlardan himoya qilish usullari.",
    accent: "cyan",
  },
  {
    id: "8",
    title: "EdTech Biznes Modellari: Global Tajriba",
    author: "EduCore UZ",
    type: "report",
    category: "EdTech",
    year: 2024,
    pages: 40,
    lang: "uz",
    free: true,
    downloads: 1230,
    desc: "Muvaffaqiyatli EdTech kompaniyalarining biznes modellari va O'zbekiston kontekstiga moslash tajribasi.",
    accent: "violet",
  },
  {
    id: "9",
    title: "Python Machine Learning Fundamentals",
    author: "DigitalMind UZ",
    type: "book",
    category: "AI/ML",
    year: 2024,
    pages: 440,
    lang: "uz",
    free: false,
    downloads: 5600,
    desc: "O'zbek tilida mashinaviy o'rganish asoslari — scikit-learn, TensorFlow va PyTorch bilan amaliy mashqlar.",
    accent: "emerald",
  },
  {
    id: "10",
    title: "Investorlar Uchun Pitching Mahorati",
    author: "Uychi IT Hub",
    type: "guide",
    category: "Startap",
    year: 2024,
    pages: 64,
    lang: "uz",
    free: true,
    downloads: 3400,
    desc: "Investorlarga pitch qilish texnikasi, Deck tayyorlash va muzokaralar olib borish bo'yicha to'liq qo'llanma.",
    accent: "cyan",
  },
];

const CATEGORIES = ["Barchasi", ...Array.from(new Set(RESOURCES.map((r) => r.category)))];
const TYPES: { key: string; label: string }[] = [
  { key: "all", label: "Barcha turdagi" },
  { key: "book", label: "Kitoblar" },
  { key: "paper", label: "Maqolalar" },
  { key: "report", label: "Hisobotlar" },
  { key: "guide", label: "Qo'llanmalar" },
];

export default function LibraryPage() {
  const [category, setCategory] = useState("Barchasi");
  const [typeFilter, setTypeFilter] = useState("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = RESOURCES.filter((r) => {
    const matchCat = category === "Barchasi" || r.category === category;
    const matchType = typeFilter === "all" || r.type === typeFilter;
    const matchFree = !freeOnly || r.free;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchFree && matchSearch;
  });

  const totalDownloads = RESOURCES.reduce((s, r) => s + r.downloads, 0);

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Hero */}
      <section className="relative border-b border-white/4 px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.05)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">/ Raqamli Kutubxona</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
            IT Bilimlar <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Markazi
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Kitoblar, ilmiy maqolalar, hisobotlar va amaliy qo&apos;llanmalar — IT va tadbirkorlik sohasidagi eng to&apos;liq o&apos;zbek tilidagi raqamli resurs bazasi.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Jami resurslar", value: String(RESOURCES.length), color: "text-cyan-400" },
              { label: "Bepul resurslar", value: String(RESOURCES.filter((r) => r.free).length), color: "text-emerald-400" },
              { label: "Jami yuklab olingan", value: `${(totalDownloads / 1000).toFixed(1)}K+`, color: "text-violet-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/2 px-5 py-3 text-center">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-zinc-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nom yoki muallif bo'yicha qidirish..." className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-zinc-600" />
            {search && <button onClick={() => setSearch("")} className="text-zinc-600 hover:text-white">✕</button>}
          </div>

          {/* Type + Free toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {TYPES.map((t) => (
              <button key={t.key} onClick={() => setTypeFilter(t.key)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${typeFilter === t.key ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-400" : "border-white/8 bg-white/3 text-zinc-500 hover:text-zinc-300"}`}>
                {t.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setFreeOnly(!freeOnly)} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${freeOnly ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400" : "border-white/8 bg-white/3 text-zinc-500 hover:text-zinc-300"}`}>
                <span className={`h-2 w-2 rounded-full ${freeOnly ? "bg-emerald-400" : "bg-zinc-600"}`} />
                Faqat bepul
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${category === cat ? "border-violet-400/40 bg-violet-500/10 text-violet-400" : "border-white/6 bg-white/2 text-zinc-600 hover:text-zinc-400"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-5 text-[12px] text-zinc-600">{filtered.length} ta resurs topildi</p>

        {/* Resources grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-zinc-500">Resurs topilmadi</p>
            <button onClick={() => { setSearch(""); setCategory("Barchasi"); setTypeFilter("all"); setFreeOnly(false); }} className="mt-3 text-[13px] text-cyan-400 hover:underline">Filtrni tozalash</button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((res) => {
              const c = A[res.accent];
              return (
                <div key={res.id} className={`group flex flex-col rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-200 hover:-translate-y-0.5 ${c.border}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/3 text-lg">
                      {TYPE_ICONS[res.type]}
                    </div>
                    <div className="flex gap-1.5">
                      {res.free && (
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-500/8 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-400">
                          Bepul
                        </span>
                      )}
                      <span className="text-sm">{LANG_FLAG[res.lang]}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="text-[14px] font-bold leading-snug text-white">{res.title}</h3>
                    <p className="mt-1 text-[12px] text-zinc-600">{res.author} · {res.year}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-zinc-600">{res.desc}</p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/4 pt-4">
                    <div className="flex gap-3 text-[11px] text-zinc-600">
                      <span>{res.pages} bet</span>
                      <span>·</span>
                      <span className={c.text}>{TYPE_LABELS[res.type]}</span>
                      <span>·</span>
                      <span>{(res.downloads / 1000).toFixed(1)}K yuklab</span>
                    </div>
                    <button className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-all ${c.badge} hover:opacity-80`}>
                      {res.free ? "Yuklab olish" : "Sotib olish"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Contribute CTA */}
        <div className="mt-16 rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-[#050f14] to-[#0a0a0a] p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">/ Kutubxonaga Hissa Qo&apos;shing</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Bilimingizni Ulashing</h3>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-zinc-500">
            O&apos;zingizning kitob, maqola yoki qo&apos;llanmangizni kutubxonaga qo&apos;shish uchun ariza yuboring. Mualliflik huquqingiz saqlanadi.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-8 py-3.5 text-[14px] font-bold text-cyan-400 transition-all hover:bg-cyan-500/15">
            Resurs Yuborish
          </button>
        </div>
      </div>
    </div>
  );
}
