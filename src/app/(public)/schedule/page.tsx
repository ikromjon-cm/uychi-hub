"use client";

import { useState } from "react";
import { Video, MessageCircle, Send, Users, Calendar, Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PLATFORMS = [
  { id: "zoom",     label: "Zoom",        icon: <Video         className="h-4 w-4" /> },
  { id: "teams",    label: "MS Teams",    icon: <Users         className="h-4 w-4" /> },
  { id: "meet",     label: "Google Meet", icon: <Video         className="h-4 w-4" /> },
  { id: "whatsapp", label: "WhatsApp",    icon: <MessageCircle className="h-4 w-4" /> },
  { id: "telegram", label: "Telegram",    icon: <Send          className="h-4 w-4" /> },
];

const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const TOPICS = {
  UZ: ["Investitsiya imkoniyatlari", "Hamkorlik taklifi", "Ofis maydoni / Ko'chib kelish", "Startap inkubatsiyasi", "AI yechimlari demonstratsiyasi", "Davlat va me'yoriy masalalar", "Media va matbuot", "Umumiy savol"],
  RU: ["Инвестиционные возможности", "Предложение о партнёрстве", "Офисное пространство / Переезд", "Инкубация стартапа", "Демонстрация ИИ-решений", "Государственные и нормативные вопросы", "СМИ и пресса", "Общий вопрос"],
  EN: ["Investment opportunities", "Partnership offer", "Office space / Relocation", "Startup incubation", "AI solutions demo", "Government & regulatory matters", "Media & press", "General inquiry"],
};

const T = {
  UZ: {
    badge: "Uchrashuv Belgilash", h1: "Jamoamiz bilan Uchrashing",
    desc: "Mutaxassislarimiz bilan individual uchrashuv belgilang. 2 soat ichida javob beramiz va vaqtni email orqali tasdiqlaymiz.",
    name: "Ism Familya", namePh: "To'liq ismingiz", email: "Email", emailPh: "siz@kompaniya.uz",
    company: "Kompaniya", companyPh: "Kompaniyangiz nomi", phone: "Telefon", phonePh: "+998 XX XXX XX XX",
    topic: "Uchrashuv Mavzusi", topicPh: "Mavzu tanlang", platform: "Qulay Platforma",
    date: "Qulay Sana", time: "Qulay Vaqt (UZT)", notes: "Qo'shimcha Izoh",
    notesPh: "Uchrashuv oldidan bilishimizni istagan narsangizni yozing...",
    timeError: "Iltimos vaqt tanlang", sending: "Yuborilmoqda...", submit: "Uchrashuv So'rovi Yuborish →",
    hours: "Ish soatlarimiz: Dushanba–Juma, 09:00–18:00 (UTC+5). Biz 2 soat ichida javob beramiz.",
    successTitle: "Uchrashuv So'rovi Yuborildi!", successDesc: "Jamoamiz 2 soat ichida vaqtingizni tasdiqlaydi.",
  },
  RU: {
    badge: "Записаться на Встречу", h1: "Встретьтесь с Нашей Командой",
    desc: "Запишитесь на индивидуальную встречу с нашими специалистами. Ответим в течение 2 часов и подтвердим время по email.",
    name: "Имя Фамилия", namePh: "Ваше полное имя", email: "Email", emailPh: "вы@компания.com",
    company: "Компания", companyPh: "Название компании", phone: "Телефон", phonePh: "+998 XX XXX XX XX",
    topic: "Тема Встречи", topicPh: "Выберите тему", platform: "Удобная Платформа",
    date: "Удобная Дата", time: "Удобное Время (UTC+5)", notes: "Дополнительные Комментарии",
    notesPh: "Напишите всё, что мы должны знать перед встречей...",
    timeError: "Пожалуйста, выберите время", sending: "Отправка...", submit: "Отправить Запрос на Встречу →",
    hours: "Рабочие часы: Пн–Пт, 09:00–18:00 (UTC+5). Мы отвечаем в течение 2 часов.",
    successTitle: "Запрос на Встречу Отправлен!", successDesc: "Наша команда подтвердит время в течение 2 часов.",
  },
  EN: {
    badge: "Schedule a Meeting", h1: "Meet with Our Team",
    desc: "Schedule an individual meeting with our specialists. We'll respond within 2 hours and confirm the time by email.",
    name: "Full Name", namePh: "Your full name", email: "Email", emailPh: "you@company.com",
    company: "Company", companyPh: "Your company name", phone: "Phone", phonePh: "+998 XX XXX XX XX",
    topic: "Meeting Topic", topicPh: "Select a topic", platform: "Preferred Platform",
    date: "Preferred Date", time: "Preferred Time (UTC+5)", notes: "Additional Notes",
    notesPh: "Write anything you'd like us to know before the meeting...",
    timeError: "Please select a time", sending: "Sending...", submit: "Send Meeting Request →",
    hours: "Working hours: Mon–Fri, 09:00–18:00 (UTC+5). We respond within 2 hours.",
    successTitle: "Meeting Request Sent!", successDesc: "Our team will confirm your time within 2 hours.",
  },
};

export default function SchedulePage() {
  const [platform, setPlatform] = useState("zoom");
  const [time, setTime]         = useState("");
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");
  const { lang } = useLang();
  const t = T[lang];
  const topics = TOPICS[lang];
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) { setError(t.timeError); return; }
    setSending(true);
    setError("");
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const body = { ...Object.fromEntries(fd), platform, time };
    try {
      const res = await fetch("/api/meetings/meeting-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
    } catch {
      const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
      submissions.push({ endpoint: "/meetings/meeting-requests/", body, timestamp: new Date().toISOString() });
      localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
    }
    setSent(true);
    setSending(false);
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            <Calendar className="h-3 w-3" />
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.name}</label>
                <input name="name" type="text" required placeholder={t.namePh} className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.email}</label>
                <input name="email" type="email" required placeholder={t.emailPh} className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.company}</label>
                <input name="company" type="text" placeholder={t.companyPh} className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.phone}</label>
                <input name="phone" type="tel" placeholder={t.phonePh} className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.topic}</label>
              <select name="topic" required className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none focus:border-accent/40">
                <option value="">{t.topicPh}</option>
                {topics.map((tp) => <option key={tp} value={tp}>{tp}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.platform}</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button key={p.id} type="button" onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-all ${platform === p.id ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>
                    {p.icon}{p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <Calendar className="h-3 w-3" /> {t.date}
                </label>
                <input name="date" type="date" required min={today} className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <Clock className="h-3 w-3" /> {t.time}
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((tm) => (
                    <button key={tm} type="button" onClick={() => setTime(tm)}
                      className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-all ${time === tm ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.notes}</label>
              <textarea name="message" rows={3} placeholder={t.notesPh} className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">{error}</div>
            )}

            <button type="submit" disabled={sending}
              className="w-full rounded-full bg-accent py-4 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] transition-all hover:bg-accent-dark disabled:opacity-60">
              {sending ? t.sending : t.submit}
            </button>

            <p className="text-center text-[12px] text-muted">{t.hours}</p>
          </form>
        )}
      </div>
    </div>
  );
}
