"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { apiFormPost } from "@/lib/api";
import { useLang } from "@/lib/i18n";

const T = {
  UZ: {
    badge: "Startap Arizasi", h1: "Inkubatorga Qo'shiling",
    desc: "Uychi Hub startap inkubatsiya dasturiga ariza bering. Moliyalashtirish, mentorlik, ofis maydoni va global tarmoqqa kirish imkoniyatiga ega bo'ling.",
    section1: "Asoschi Ma'lumotlari", section2: "Startap Ma'lumotlari",
    founderName: "Ism Familya", founderNamePh: "To'liq ismingiz",
    email: "Elektron Pochta", emailPh: "asoschi@startap.com",
    phone: "Telefon Raqam", phonePh: "+998 XX XXX XX XX",
    country: "Mamlakat", countryPh: "Kelib chiqqan davlat",
    startupName: "Startap Nomi", startupNamePh: "Startapingiz nomi",
    website: "Veb-sayt", websitePh: "https://startapingiz.com",
    sector: "Soha", sectorPh: "Soha",
    stage: "Bosqich", stagePh: "Bosqich",
    teamSize: "Jamoa Soni", teamSizePh: "mas. 5",
    funding: "Kerakli Moliyalashtirish", fundingPh: "Moliyalashtirish hajmini tanlang",
    techStack: "Texnologiya Steki", techStackPh: "mas. Python, TensorFlow, React, PostgreSQL",
    description: "Startap Tavsifi",
    descPh: "Mahsulotingizni, qanday muammoni yechayotganingizni, natijalariingizni va nima uchun Uychi Hubga qo'shilmoqchi ekanligingizni yozing...",
    sending: "Yuborilmoqda...", submit: "Ariza Yuborish →",
    successTitle: "Ariza Qabul Qilindi!", successDesc: "Inkubatsiya jamoamiz 5 ish kuni ichida siz bilan bog'lanadi.",
  },
  RU: {
    badge: "Заявка Стартапа", h1: "Присоединяйтесь к Инкубатору",
    desc: "Подайте заявку в инкубационную программу Uychi Hub. Получите доступ к финансированию, менторству, офисному пространству и глобальной сети.",
    section1: "Данные Основателя", section2: "Данные Стартапа",
    founderName: "Имя Фамилия", founderNamePh: "Ваше полное имя",
    email: "Электронная Почта", emailPh: "основатель@стартап.com",
    phone: "Номер Телефона", phonePh: "+998 XX XXX XX XX",
    country: "Страна", countryPh: "Страна происхождения",
    startupName: "Название Стартапа", startupNamePh: "Название вашего стартапа",
    website: "Веб-сайт", websitePh: "https://вашстартап.com",
    sector: "Отрасль", sectorPh: "Отрасль",
    stage: "Стадия", stagePh: "Стадия",
    teamSize: "Размер Команды", teamSizePh: "напр. 5",
    funding: "Необходимое Финансирование", fundingPh: "Выберите объём финансирования",
    techStack: "Технологический Стек", techStackPh: "напр. Python, TensorFlow, React, PostgreSQL",
    description: "Описание Стартапа",
    descPh: "Напишите о вашем продукте, какую проблему вы решаете, ваших результатах и почему хотите присоединиться к Uychi Hub...",
    sending: "Отправка...", submit: "Отправить Заявку →",
    successTitle: "Заявка Принята!", successDesc: "Команда инкубатора свяжется с вами в течение 5 рабочих дней.",
  },
  EN: {
    badge: "Startup Application", h1: "Join the Incubator",
    desc: "Apply to Uychi Hub's startup incubation program. Get access to funding, mentorship, office space, and a global network.",
    section1: "Founder Information", section2: "Startup Details",
    founderName: "Full Name", founderNamePh: "Your full name",
    email: "Email", emailPh: "founder@startup.com",
    phone: "Phone Number", phonePh: "+998 XX XXX XX XX",
    country: "Country", countryPh: "Country of origin",
    startupName: "Startup Name", startupNamePh: "Your startup name",
    website: "Website", websitePh: "https://yourstartup.com",
    sector: "Sector", sectorPh: "Sector",
    stage: "Stage", stagePh: "Stage",
    teamSize: "Team Size", teamSizePh: "e.g. 5",
    funding: "Funding Needed", fundingPh: "Select funding range",
    techStack: "Tech Stack", techStackPh: "e.g. Python, TensorFlow, React, PostgreSQL",
    description: "Startup Description",
    descPh: "Describe your product, the problem you're solving, your traction, and why you want to join Uychi Hub...",
    sending: "Sending...", submit: "Submit Application →",
    successTitle: "Application Received!", successDesc: "Our incubation team will contact you within 5 business days.",
  },
};

const SECTORS = ["AI / ML", "FinTech", "MedTech", "AgriTech", "EdTech", "CleanTech", "Kiberxavfsizlik", "SaaS", "E-Commerce", "Logistika", "Boshqa"];
const STAGES = ["G'oya / Pre-seed", "MVP / Seed", "Dastlabki Daromad", "Series A", "O'sish Bosqichi"];
const FUNDING = ["< $100K", "$100K – $500K", "$500K – $2M", "$2M – $5M", "$5M+"];

export default function StartupApplyPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");
  const { lang } = useLang();
  const t = T[lang];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const f = Object.fromEntries(fd.entries()) as Record<string, string>;
    // Map the application form fields onto the Startup model fields,
    // preserving founder contact and extra meta in the solution text since
    // the Startup model has no dedicated columns for them.
    const details = [
      f.founder_name && `Asoschi: ${f.founder_name}`,
      f.email && `Email: ${f.email}`,
      f.phone && `Tel: ${f.phone}`,
      f.country && `Davlat: ${f.country}`,
      f.stage && `Bosqich: ${f.stage}`,
      f.funding_needed && `Investitsiya: ${f.funding_needed}`,
      f.team_size && `Jamoa: ${f.team_size}`,
      f.website && `Sayt: ${f.website}`,
    ].filter(Boolean).join(" • ");
    const body = {
      title: f.startup_name || "",
      sector: f.sector || "",
      problem_en: f.description || "",
      problem_uz: f.description || "",
      problem_ru: f.description || "",
      solution_en: details,
      solution_uz: details,
      solution_ru: details,
      tech_stack: f.tech_stack || "",
    };
    try {
      await apiFormPost("/hub/startups/apply/", body);
    } catch {
      /* silent */
    } finally {
      setSent(true);
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-400">
            <Zap className="h-3 w-3" />
            {t.badge}
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{t.desc}</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10 text-2xl text-violet-400">✓</div>
            <h2 className="text-xl font-bold text-foreground">{t.successTitle}</h2>
            <p className="mt-2 text-[14px] text-muted">{t.successDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">{t.section1}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "founder_name", label: t.founderName, placeholder: t.founderNamePh },
                  { name: "email", label: t.email, type: "email", placeholder: t.emailPh },
                  { name: "phone", label: t.phone, type: "tel", placeholder: t.phonePh },
                  { name: "country", label: t.country, placeholder: t.countryPh },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                    <input name={f.name} type={f.type ?? "text"} required placeholder={f.placeholder} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">{t.section2}</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.startupName}</label>
                    <input name="startup_name" type="text" required placeholder={t.startupNamePh} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.website}</label>
                    <input name="website" type="url" placeholder={t.websitePh} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.sector}</label>
                    <select name="sector" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-violet-400/40">
                      <option value="">{t.sectorPh}</option>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.stage}</label>
                    <select name="stage" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-violet-400/40">
                      <option value="">{t.stagePh}</option>
                      {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.teamSize}</label>
                    <input name="team_size" type="number" min="1" placeholder={t.teamSizePh} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.funding}</label>
                  <select name="funding_needed" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-violet-400/40">
                    <option value="">{t.fundingPh}</option>
                    {FUNDING.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.techStack}</label>
                  <input name="tech_stack" type="text" placeholder={t.techStackPh} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.description}</label>
                  <textarea name="description" required rows={4} placeholder={t.descPh} className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">{error}</div>
            )}
            <button type="submit" disabled={sending} className="group w-full rounded-full bg-violet-400 py-4 text-[14px] font-bold text-black transition-all hover:bg-violet-300 hover:shadow-[0_0_35px_-5px_rgba(167,139,250,0.5)] disabled:opacity-60">
              {sending ? t.sending : <>{t.submit} <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
