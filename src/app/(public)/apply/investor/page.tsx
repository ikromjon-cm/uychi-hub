"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { apiFormPost } from "@/lib/api";

const T = {
  UZ: {
    badge: "Investor Arizasi", h1: "Uychi Hubga Investitsiya Kiriting",
    desc: "Investitsiya manfaatingizni yuboring. Hamkorlik jamoamiz barcha arizalarni 48 soat ichida ko'rib chiqadi va qo'ng'iroq rejalashtiriladi.",
    section1: "Shaxsiy Ma'lumotlar", section2: "Investitsiya Profili",
    fullName: "Ism Familya", fullNamePh: "To'liq ismingiz",
    email: "Elektron Pochta", emailPh: "siz@fond.com",
    company: "Kompaniya / Fond", companyPh: "Investitsiya firmasi nomi",
    country: "Mamlakat", countryPh: "Mamlakatngiz",
    phone: "Telefon Raqam", phonePh: "+998 XX XXX XX XX",
    linkedin: "LinkedIn", linkedinPh: "linkedin.com/in/profilingiz",
    investType: "Investitsiya Turi", investTypePh: "Turni tanlang",
    sectors: "Asosiy Sohalar", sectorsPh: "Asosiy sohani tanlang",
    ticketSize: "Investitsiya Hajmi", ticketSizePh: "Hajmni tanlang",
    timeline: "Investitsiya Muddati", timelinePh: "Muddatni tanlang",
    notes: "Investitsiya Konsepsiyasi va Xabar",
    notesPh: "Investitsiya konsepsiyangizni, nima qidirayotganingizni va nima uchun Uychi Hub sizni qiziqtirayotganini yozing...",
    sending: "Yuborilmoqda...", submit: "Ariza Yuborish →",
    successTitle: "Ariza Qabul Qilindi!", successDesc: "Investitsiya jamoamiz 48 soat ichida siz bilan bog'lanadi.",
  },
  RU: {
    badge: "Заявка Инвестора", h1: "Инвестируйте в Uychi Hub",
    desc: "Отправьте ваше инвестиционное предложение. Наша команда рассмотрит все заявки в течение 48 часов и запланирует звонок.",
    section1: "Личные Данные", section2: "Инвестиционный Профиль",
    fullName: "Имя Фамилия", fullNamePh: "Ваше полное имя",
    email: "Электронная Почта", emailPh: "вы@фонд.com",
    company: "Компания / Фонд", companyPh: "Название инвестиционной компании",
    country: "Страна", countryPh: "Ваша страна",
    phone: "Номер Телефона", phonePh: "+998 XX XXX XX XX",
    linkedin: "LinkedIn", linkedinPh: "linkedin.com/in/ваш-профиль",
    investType: "Тип Инвестиций", investTypePh: "Выберите тип",
    sectors: "Ключевые Отрасли", sectorsPh: "Выберите основную отрасль",
    ticketSize: "Объём Инвестиций", ticketSizePh: "Выберите объём",
    timeline: "Горизонт Инвестирования", timelinePh: "Выберите горизонт",
    notes: "Инвестиционная Концепция и Сообщение",
    notesPh: "Напишите о вашей инвестиционной концепции, что вы ищете и почему вас интересует Uychi Hub...",
    sending: "Отправка...", submit: "Отправить Заявку →",
    successTitle: "Заявка Принята!", successDesc: "Инвестиционная команда свяжется с вами в течение 48 часов.",
  },
  EN: {
    badge: "Investor Application", h1: "Invest in Uychi Hub",
    desc: "Submit your investment interest. Our partnership team reviews all applications within 48 hours and schedules a call.",
    section1: "Personal Information", section2: "Investment Profile",
    fullName: "Full Name", fullNamePh: "Your full name",
    email: "Email", emailPh: "you@fund.com",
    company: "Company / Fund", companyPh: "Investment firm name",
    country: "Country", countryPh: "Your country",
    phone: "Phone Number", phonePh: "+998 XX XXX XX XX",
    linkedin: "LinkedIn", linkedinPh: "linkedin.com/in/yourprofile",
    investType: "Investment Type", investTypePh: "Select type",
    sectors: "Key Sectors", sectorsPh: "Select primary sector",
    ticketSize: "Investment Size", ticketSizePh: "Select range",
    timeline: "Investment Timeline", timelinePh: "Select timeline",
    notes: "Investment Thesis & Message",
    notesPh: "Write about your investment thesis, what you're looking for, and why Uychi Hub interests you...",
    sending: "Sending...", submit: "Submit Application →",
    successTitle: "Application Received!", successDesc: "Our investment team will contact you within 48 hours.",
  },
};

const INVESTMENT_TYPES = ["Venchur Kapital", "Xususiy Kapital", "Angel Investitsiya", "Korporativ VC", "Davlat Fondi", "Oilaviy Ofis", "Boshqa"];
const SECTORS = ["AI / Machine Learning", "FinTech", "MedTech", "AgriTech", "EdTech", "CleanTech", "Kiberxavfsizlik", "SaaS", "Infratuzilma", "Boshqa"];
const TICKET_SIZES = ["$50K – $250K", "$250K – $1M", "$1M – $5M", "$5M – $20M", "$20M+"];
const TIMELINES = ["Darhol (0–3 oy)", "Qisqa muddatli (3–6 oy)", "O'rta muddatli (6–12 oy)", "Uzoq muddatli (12+ oy)"];

export default function InvestorApplyPage() {
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
    const body = Object.fromEntries(fd);
    try {
      await apiFormPost("/hub/leads/", { ...body, lead_type: "investor" });
    } catch {
      /* silent */
    }
    setSent(true);
    setSending(false);
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            {t.badge}
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{t.desc}</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-400">✓</div>
            <h2 className="text-xl font-bold text-foreground">{t.successTitle}</h2>
            <p className="mt-2 text-[14px] text-muted">{t.successDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">{t.section1}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "contact_name", label: t.fullName,  placeholder: t.fullNamePh  },
                  { name: "email",        label: t.email,     placeholder: t.emailPh,    type: "email" },
                  { name: "company",      label: t.company,   placeholder: t.companyPh   },
                  { name: "country",      label: t.country,   placeholder: t.countryPh   },
                  { name: "phone",        label: t.phone,     placeholder: t.phonePh,    type: "tel" },
                  { name: "linkedin",     label: t.linkedin,  placeholder: t.linkedinPh, type: "url" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                    <input name={f.name} type={f.type || "text"} placeholder={f.placeholder} required={["contact_name", "email", "company"].includes(f.name)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-400/40 focus:bg-card" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">{t.section2}</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.investType}</label>
                  <select name="investor_type" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                    <option value="">{t.investTypePh}</option>
                    {INVESTMENT_TYPES.map((tp) => <option key={tp} value={tp}>{tp}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.sectors}</label>
                  <select name="sectors" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                    <option value="">{t.sectorsPh}</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.ticketSize}</label>
                    <select name="ticket_size" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                      <option value="">{t.ticketSizePh}</option>
                      {TICKET_SIZES.map((ts) => <option key={ts} value={ts}>{ts}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.timeline}</label>
                    <select name="timeline" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                      <option value="">{t.timelinePh}</option>
                      {TIMELINES.map((tl) => <option key={tl} value={tl}>{tl}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.notes}</label>
                  <textarea name="notes" rows={4} placeholder={t.notesPh} className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-400/40 focus:bg-card" />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">{error}</div>
            )}
            <button type="submit" disabled={sending} className="group w-full rounded-full bg-emerald-400 py-4 text-[14px] font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-[0_0_35px_-5px_rgba(52,211,153,0.5)] disabled:opacity-60">
              {sending ? t.sending : <>{t.submit} <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
