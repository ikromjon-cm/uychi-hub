import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MOCK_STARTUPS } from "@/lib/mock-data";
import { ArrowLeft, CheckCircle, Globe, Users, DollarSign, Code2 } from "lucide-react";

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
  const palette: Record<string, { bg: string; text: string }> = {
    indigo:  { bg: "#4f46e5", text: "#818cf8" },
    violet:  { bg: "#7c3aed", text: "#a78bfa" },
    emerald: { bg: "#059669", text: "#34d399" },
    rose:    { bg: "#e11d48", text: "#fb7185" },
    amber:   { bg: "#d97706", text: "#fbbf24" },
    sky:     { bg: "#0284c7", text: "#38bdf8" },
  };
  const c = palette[color] || palette.indigo;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill={c.bg} fillOpacity="0.12" />
      <circle cx="24" cy="24" r="23" fill="none" stroke={c.bg} strokeWidth="1" strokeOpacity="0.25" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill={c.text} fontSize="17" fontWeight="700" fontFamily="system-ui, sans-serif">{initials}</text>
    </svg>
  );
}

type TeamMember = { name: string; role: string; color: string };

const DETAIL: Record<string, {
  problem: string;
  solution: string;
  users: string;
  website?: string;
  team: TeamMember[];
  metrics: { label: string; value: string }[];
}> = {
  "paxta-soft-ai": {
    problem: "Uychi tumanidagi 12,000+ tonna yillik paxta ishlab chiqarishida chiqindi va energiya sarfi yuqori. Sifat nazorati qo'lda amalga oshiriladi — bu kechikishlarga va yo'qotishlarga olib keladi.",
    solution: "AI kompyuter ko'rish tizimi paxta sifatini real vaqtda tekshiradi. Chiqindini 25% ga kamaytiradi, energiya sarfini optimallashtiradi va ishlab chiqarish samaradorligini oshiradi.",
    users: "5 ta zavod · 12,000 tonna/yil · 8 ta operator",
    team: [
      { name: "Akmal Rahimov",   role: "Asoschisi & CEO",     color: "indigo" },
      { name: "Sarvar Xolmatov", role: "CTO / ML Engineer",   color: "violet" },
      { name: "Dilnoza Tosheva", role: "Computer Vision",     color: "emerald" },
      { name: "Behruz Nazarov",  role: "IoT Engineer",        color: "rose" },
      { name: "Malika Karimova", role: "Product Manager",     color: "amber" },
      { name: "Ulugbek Sobirov", role: "Backend Dev",         color: "sky" },
      { name: "Feruza Yusupova", role: "QA Engineer",         color: "violet" },
      { name: "Jasur Mirzayev",  role: "Data Analyst",        color: "indigo" },
    ],
    metrics: [
      { label: "Chiqindi kamayishi", value: "25%" },
      { label: "Zavodlar",           value: "5" },
      { label: "Moliya",             value: "$150K" },
      { label: "Bosqich",            value: "Seed" },
    ],
  },
  "ipakchi-ai": {
    problem: "Uychi ipak fabrikalarida sifat nazorati qo'lda va sekin. Yillik 800 kg/kun ishlab chiqariladigan ipakda nuqsonlar 15% ni tashkil qiladi, bu katta yo'qotishlarga olib keladi.",
    solution: "Kompyuter ko'rish asosida ipak sifati, rang va nuqsonlarni avtomatik aniqlash. Real vaqtda monitoring va avtomatik saralash tizimi.",
    users: "3 fabrika · 800 kg/kun · 12 ta operator",
    team: [
      { name: "Dildora Yunusova", role: "Asoschisi & CEO",    color: "violet" },
      { name: "Husan Tursunov",   role: "ML Engineer",        color: "indigo" },
      { name: "Nargiza Qodieva",  role: "Computer Vision",    color: "emerald" },
      { name: "Otabek Xasanov",   role: "Embedded Systems",   color: "rose" },
      { name: "Zulfiya Ergasheva", role: "Backend Dev",       color: "amber" },
    ],
    metrics: [
      { label: "Nuqson aniqlash", value: "99.2%" },
      { label: "Fabrikalar",      value: "3" },
      { label: "Moliya",          value: "$100K" },
      { label: "Bosqich",         value: "MVP" },
    ],
  },
  "agri-sense": {
    problem: "Uychi tumanidagi 14,900 ga yerda suv isrof bo'ladi. Fermerlar tuproq namligini ko'z bilan baholaydi — noto'g'ri sug'orish hosildorlikni 35% kamaytiradi.",
    solution: "Tuproq namligi va haroratni IoT sensorlar bilan real vaqtda monitoring. AI algoritmi sug'orish jadvalini optimallashtiradi va suvni 40% tejaydi.",
    users: "1,200+ fermer · 14,900 ga yer · 45 ta sensor tarmoq",
    team: [
      { name: "Jasur Toshmatov",  role: "Asoschisi & CEO",   color: "emerald" },
      { name: "Anvar Mirzayev",   role: "IoT Engineer",      color: "indigo" },
      { name: "Murod Xoliqov",    role: "Backend Dev",       color: "violet" },
      { name: "Shahnoza Norova",  role: "Data Scientist",    color: "rose" },
    ],
    metrics: [
      { label: "Suv tejash",  value: "40%" },
      { label: "Fermerlar",   value: "1,200+" },
      { label: "Moliya",      value: "$50K" },
      { label: "Bosqich",     value: "Pre-Seed" },
    ],
  },
  "dentago": {
    problem: "Uychi tumanidagi stomatologiya klinikalarida navbat tizimi yo'q. Bemorlar soatlab kutadi, shifokorlar jadval yurita olmaydi — bu daromad va bemor sonini kamaytiradi.",
    solution: "Aqlli navbat tizimi, to'lov integratsiyasi va tibbiy tarix boshqaruvi. SMS eslatmalar, online ro'yxatdan o'tish va shifokor jadvalini avtomatik optimallashtirish.",
    users: "8 klinika · 500+ bemor/oy · 25 ta shifokor",
    team: [
      { name: "Sardor Holmatov",  role: "Asoschisi & CEO",   color: "rose" },
      { name: "Kamola Umarova",   role: "CTO",               color: "indigo" },
      { name: "Bekzod Tursunov",  role: "Flutter Developer", color: "violet" },
      { name: "Gulnora Rashidova", role: "UI/UX Designer",   color: "emerald" },
      { name: "Timur Xasanov",    role: "Backend Dev",       color: "amber" },
      { name: "Nilufar Yusupova", role: "QA Engineer",       color: "sky" },
    ],
    metrics: [
      { label: "Kutish vaqti",  value: "-60%" },
      { label: "Klinikalar",    value: "8" },
      { label: "Moliya",        value: "$120K" },
      { label: "Bosqich",       value: "MVP" },
    ],
  },
  "silk-pay": {
    problem: "Ipak yetishtiruvchi kichik korxonalar bank xizmatlari va kreditga kirish imkoniyatiga ega emas. Moliyaviy inklyuziya darajasi pastligi biznesni cheklaydi.",
    solution: "Ipak zanjiri ishtirokchilari uchun mobil mikromoliya va to'lov tizimi. Blockchain asosida shaffof hisob-kitob va kredit tarixi yaratish.",
    users: "120+ korxona · 350+ foydalanuvchi",
    team: [
      { name: "Shahlo Karimova",  role: "Asoschisi & CEO",   color: "amber" },
      { name: "Firdavs Ergashev", role: "Blockchain Dev",    color: "indigo" },
      { name: "Lola Toshqo'zova", role: "Flutter Developer", color: "violet" },
    ],
    metrics: [
      { label: "Tranzaksiyalar",  value: "1,200+" },
      { label: "Korxonalar",      value: "120+" },
      { label: "Moliya",          value: "$30K" },
      { label: "Bosqich",         value: "Idea" },
    ],
  },
  "cotton-log": {
    problem: "Paxta logistikasida qog'oz hujjatlar va telefon orqali muvofiqlashtirish samarasiz. Vaqt yo'qotishi va noto'g'ri hisob-kitob muammolari mavjud.",
    solution: "Paxta logistikasi va ta'minot zanjirini raqamlashtirish platformasi. Real vaqtda kuzatish, hujjatlar va to'lovlarni avtomatlashtirish.",
    users: "15+ zavod · 45+ logistika kompaniyasi",
    team: [
      { name: "Rustam Aliyev",    role: "Asoschisi & CEO",   color: "sky" },
      { name: "Nodir Xoliqov",    role: "Product Lead",      color: "indigo" },
      { name: "Sarvinoz Qosimova", role: "Frontend Dev",     color: "violet" },
      { name: "Jahongir Norqo'ziev", role: "Backend Dev",    color: "emerald" },
      { name: "Aziz Tursunov",    role: "Mobile Dev",        color: "rose" },
      { name: "Maftuna Ergasheva", role: "UI/UX Designer",   color: "amber" },
      { name: "Ravshan Mirzayev", role: "DevOps",            color: "sky" },
    ],
    metrics: [
      { label: "Logistika tejash", value: "30%" },
      { label: "Zavodlar",         value: "15+" },
      { label: "Moliya",           value: "$200K" },
      { label: "Bosqich",          value: "Seed" },
    ],
  },
  "edu-rural": {
    problem: "Qishloq maktablarida internet yo'qligi va o'qituvchi tanqisligi sababli ta'lim sifati past. 47 maktabning yarmida laboratoriya yo'q.",
    solution: "Offline ishlaydigan adaptiv o'quv platformasi va AI repetitor. O'quvchi darajasiga qarab darslar avtomatik moslashadi.",
    users: "12 maktab · 3,400+ o'quvchi · 85 o'qituvchi",
    team: [
      { name: "Zulfiya Nurmatova", role: "Asoschisi & CEO",  color: "emerald" },
      { name: "Dilshod Ergashev",  role: "AI/NLP Engineer",  color: "indigo" },
      { name: "Oydin Xasanova",    role: "Instructional",    color: "violet" },
      { name: "Sherzod Karimov",   role: "Flutter Dev",      color: "rose" },
      { name: "Barno Tosheva",     role: "Content Creator",  color: "amber" },
      { name: "Ulmas Yusupov",     role: "Backend Dev",      color: "sky" },
    ],
    metrics: [
      { label: "O'quvchilar",     value: "3,400+" },
      { label: "Maktablar",       value: "12" },
      { label: "Moliya",          value: "$80K" },
      { label: "Bosqich",         value: "MVP" },
    ],
  },
  "green-silk": {
    problem: "Ipak qurti yetishtirish jarayoni qadimiy va samarasiz. Harorat, namlik va ovqatlantirish noto'g'ri bo'lsa, ipak qurti o'limi 40% ga yetishi mumkin.",
    solution: "Ipak qurti yetishtirish salonlarini avtomatik monitoring va boshqarish. AI harorat, namlik va ovqatlantirish jadvalini optimallashtiradi.",
    users: "25+ ipakchilik xo'jaligi · 180+ fermer",
    team: [
      { name: "Bekzod Xoshimov",  role: "Asoschisi & CEO",   color: "violet" },
      { name: "Dilorom Mirzayeva", role: "ML Engineer",       color: "indigo" },
      { name: "Sanjar Toshmatov", role: "IoT Engineer",       color: "emerald" },
      { name: "Gulbahor Ergasheva", role: "Backend Dev",      color: "rose" },
    ],
    metrics: [
      { label: "O'lim kamayishi", value: "-65%" },
      { label: "Xo'jaliklar",    value: "25+" },
      { label: "Moliya",         value: "$70K" },
      { label: "Bosqich",        value: "Pre-Seed" },
    ],
  },
  "farm-ai-uychi": {
    problem: "Uychi tumanidagi 8,100 ga paxtazorlarni ko'zdan kechirish uchun agronomlar etarli emas. Xastaliklarga kech munosabat hosildorlikni kamaytiradi.",
    solution: "Drone va satellite tasvirlarini AI tahlili orqali hosildorlikni bashorat qilish. Xastalik va zararkunandalarni erta aniqlash tizimi.",
    users: "320+ fermer · 8,100 ga yer · Namangan viloyati",
    team: [
      { name: "Murod Toshqo'ziev", role: "Asoschisi & CEO",  color: "sky" },
      { name: "Akbar Norqo'ziev",  role: "Satellite AI",     color: "indigo" },
      { name: "Mohira Xoliqova",   role: "Computer Vision",  color: "violet" },
      { name: "Mansur Ergashev",   role: "Drone Operator",   color: "emerald" },
      { name: "Sharofat Tosheva",  role: "Data Scientist",   color: "rose" },
      { name: "Jamshid Aliyev",    role: "Backend Dev",      color: "amber" },
      { name: "Hulkar Nurova",     role: "Frontend Dev",     color: "sky" },
      { name: "Farhod Qodirov",    role: "Agronomist",       color: "indigo" },
      { name: "Lola Mirzayeva",    role: "QA Engineer",      color: "violet" },
    ],
    metrics: [
      { label: "Hosildorlik",   value: "+22%" },
      { label: "Maydon (ga)",   value: "8,100" },
      { label: "Moliya",        value: "$180K" },
      { label: "Bosqich",       value: "Seed" },
    ],
  },
  "uychi-edu": {
    problem: "Uychi tumanidagi 47 maktabning ko'pchiligida internet yo'q. Standart o'quv ilovalar offline ishlamaydi, bu ta'lim tengsizligini kuchaytiradi.",
    solution: "Offline rejimda ishlaydigan adaptiv o'quv ilovasi. Faqat sinxronlash vaqtida internet talab qiladi. Gamifikatsiya orqali o'qishni qiziqarli qiladi.",
    users: "8 maktab · 2,100+ o'quvchi",
    team: [
      { name: "Kamola Nazarova",  role: "Asoschisi & CEO",   color: "emerald" },
      { name: "Sanjar Yusupov",   role: "Flutter Developer", color: "indigo" },
      { name: "Ziyoda Ergasheva", role: "Content Lead",      color: "violet" },
      { name: "Nodir Toshmatov",  role: "Backend Dev",       color: "rose" },
      { name: "Feruza Norova",    role: "UI/UX Designer",    color: "amber" },
    ],
    metrics: [
      { label: "O'quvchilar",   value: "2,100+" },
      { label: "Maktablar",     value: "8" },
      { label: "Moliya",        value: "$60K" },
      { label: "Bosqich",       value: "MVP" },
    ],
  },
};

const STAGE_COLORS: Record<string, string> = {
  "Idea":     "text-muted border-border",
  "Pre-Seed": "text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400",
  "MVP":      "text-blue-600 border-blue-500/30 bg-blue-500/10 dark:text-blue-400",
  "Seed":     "text-violet-600 border-violet-500/30 bg-violet-500/10 dark:text-violet-400",
  "Series A": "text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
};

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const slug = params.id;
  const startup = MOCK_STARTUPS.find(s => toSlug(s.name) === slug);
  if (!startup) return { title: "Startap topilmadi — Uychi IT Hub" };
  return {
    title: `${startup.name} — Uychi IT Hub Startaplari`,
    description: startup.desc,
    openGraph: {
      title: `${startup.name} — ${startup.sector}`,
      description: startup.desc,
      siteName: "Uychi IT Hub",
    },
  };
}

export default function StartupDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const startup = MOCK_STARTUPS.find(s => toSlug(s.name) === id);
  if (!startup) notFound();

  const detail = DETAIL[id];
  const techTags = startup.techStack.split(",").map(t => t.trim());
  const stageColor = STAGE_COLORS[startup.stage] || "text-muted border-border";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border-subtle bg-card px-6 py-12">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/startups"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Startaplar ro&apos;yxatiga qaytish
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  {startup.sector}
                </span>
                <span className={`rounded-full border px-3 py-0.5 text-[11px] font-bold ${stageColor}`}>
                  {startup.stage}
                </span>
              </div>

              <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight tracking-tight text-foreground">
                {startup.name}
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                {startup.desc}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-[13px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Asoschisi:&nbsp;<strong className="font-semibold text-foreground">{startup.founder}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Jamoa:&nbsp;<strong className="font-semibold text-foreground">{startup.teamSize} kishi</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Moliya:&nbsp;<strong className="font-semibold text-accent">{startup.fundingNeeded}</strong>
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/apply/investor"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark"
              >
                <DollarSign className="h-4 w-4" />
                Investitsiya qilish
              </Link>
              <a
                href={`mailto:startups@uychi.uz?subject=Murojaat: ${encodeURIComponent(startup.name)}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-[13px] font-semibold text-foreground transition-all hover:bg-card-hover"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                Murojaat qilish
              </a>
              {detail?.website && (
                <a
                  href={detail.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-[13px] font-semibold text-foreground transition-all hover:bg-card-hover"
                >
                  <Globe className="h-4 w-4" />
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

            {detail && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    <span className="text-[16px]">⚡</span>
                    Muammo
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted">{detail.problem}</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Yechim
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted">{detail.solution}</p>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
                <Code2 className="h-4 w-4" />
                Texnologiya Steki
              </h3>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-indigo-500/20 bg-indigo-500/8 px-3 py-1.5 font-mono text-[12px] font-medium text-indigo-600 dark:text-indigo-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Team */}
            {detail?.team && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
                  <Users className="h-4 w-4" />
                  Jamoa ({detail.team.length} kishi)
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.team.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-border hover:bg-card-hover"
                    >
                      <Avatar name={member.name} color={member.color} />
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-bold text-foreground">{member.name}</p>
                        <p className="text-[12px] text-muted">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail?.users && (
              <div className="rounded-2xl border border-indigo-500/15 bg-indigo-500/5 p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Foydalanuvchilar</p>
                <p className="mt-1.5 text-[14px] text-muted">{detail.users}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {detail?.metrics && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-muted">Ko&apos;rsatkichlar</h3>
                <div className="grid grid-cols-2 gap-3">
                  {detail.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border bg-background p-3 text-center">
                      <p className="text-[1.4rem] font-extrabold text-accent">{m.value}</p>
                      <p className="mt-0.5 text-[11px] text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-indigo-500/15 bg-gradient-to-br from-indigo-500/8 to-violet-500/5 p-6">
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

            <div className="rounded-2xl border border-border bg-card p-5 text-[13px]">
              <div className="space-y-3">
                {[
                  { label: "Sektori",        value: startup.sector },
                  { label: "Bosqich",         value: startup.stage },
                  { label: "Jamoa",           value: `${startup.teamSize} kishi` },
                  { label: "Asoschisi",       value: startup.founder },
                  { label: "Moliya kerak",    value: startup.fundingNeeded || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                    <span className="text-muted">{label}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
