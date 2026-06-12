"use client";

import React, { useState } from "react";

const EVENT_TYPES = ['Hackathon', 'Meetup', 'Bootcamp', 'Conference', 'Training', 'Workshop'] as const;
type EventType = typeof EVENT_TYPES[number];

interface EventItem {
  id: string; title: string; type: EventType; date: string; endDate?: string;
  location: string; description: string; speaker?: string; prize?: string;
  seats: number; registered: number; accent: "cyan" | "violet" | "emerald"; tags: string[];
}

const EVENTS: EventItem[] = [
  { id: 'hackathon-2026', title: 'Uychi IT Hackathon 2026', type: 'Hackathon', date: '2026-07-12', endDate: '2026-07-13', location: 'Uychi IT Hub, Asosiy bino', description: '48 soatlik hackathon musobaqasida AI, agrotex va fintech yo\'nalishlari bo\'yicha innovatsion yechimlar yarating. G\'oliblar jami 5,000,000 UZS mukofot fondidan ulush oladi.', prize: '5,000,000 UZS', seats: 200, registered: 134, accent: 'cyan', tags: ['AI', 'AgriTech', 'FinTech', 'Musobaqa'] },
  { id: 'google-io-watch-2026', title: 'Google I/O Watch Party — Uychi', type: 'Meetup', date: '2026-05-20', location: 'Uychi IT Hub, Konferens-zal', description: 'Google I/O 2026 asosiy taqdimotini birga tomosha qilamiz. Yangi texnologiyalar, Gemini AI yangiliklari va developer vositalari muhokamasi. Pizza va networking.', speaker: 'Google Developer Groups Uzbekistan', seats: 80, registered: 80, accent: 'emerald', tags: ['Google', 'AI', 'Networking', 'Bepul'] },
  { id: 'python-bootcamp-2026', title: 'Python AI Bootcamp — Iyul oqimi', type: 'Bootcamp', date: '2026-07-07', endDate: '2026-08-30', location: 'Uychi IT Hub, Lab-1 va Lab-2', description: '8 haftalik intensiv Python va sun\'iy intellekt bootcamp. NumPy, Pandas, Scikit-learn, TensorFlow asoslaridan tortib real loyihalar yaratishgacha.', speaker: 'Uychi IT Hub o\'qituvchilar jamoasi', seats: 30, registered: 22, accent: 'violet', tags: ['Python', 'AI', 'ML', 'Intensiv'] },
  { id: 'ai-conference-2026', title: 'CentralAsia AI Conference 2026', type: 'Conference', date: '2026-09-15', endDate: '2026-09-16', location: 'Namangan, Davlat universiteti', description: 'Markaziy Osiyo miqyosidagi AI konferentsiyasi. 30+ ma\'ruzachi, 500+ ishtirokchi, startap pitching va investorlar bilan uchrashuvlar.', speaker: 'Xalqaro AI tadqiqotchilari', seats: 500, registered: 287, accent: 'cyan', tags: ['AI', 'Konferentsiya', 'Networking', 'Startap'] },
  { id: 'startup-demo-day-2026', title: 'Uychi Hub Demo Day — Q3 2026', type: 'Meetup', date: '2026-08-22', location: 'Uychi IT Hub, Asosiy auditoriya', description: 'Hubning joriy rezident startaplari o\'z mahsulotlari va natijalari bilan chiqish qiladi. Mahalliy va xalqaro investorlar taklif etilgan.', seats: 150, registered: 98, accent: 'emerald', tags: ['Startap', 'Demo Day', 'Investitsiya', 'Pitching'] },
  { id: 'cybersecurity-workshop-2026', title: 'Kiberxavfsizlik Amaliy Ustaxonasi', type: 'Workshop', date: '2026-06-28', location: 'Uychi IT Hub, Lab-3', description: 'Etik xakerlik, penetratsion test va tarmoq xavfsizligi bo\'yicha bir kunlik amaliy ustaxona. CTF topshiriqlari va sertifikat.', speaker: 'CloudNet Uychi — Kiberxavfsizlik bo\'limi', seats: 40, registered: 31, accent: 'violet', tags: ['Kiberxavfsizlik', 'CTF', 'Ethical Hacking'] },
  { id: 'flutter-training-2026', title: 'Flutter Mobil Dasturlash Treningi', type: 'Training', date: '2026-07-19', endDate: '2026-07-20', location: 'Uychi IT Hub, Kichik konferens-zal', description: 'Ikki kunlik Flutter treningi — UI komponentlar, state management, API integratsiyasi va store\'ga chiqarish. Sertifikat beriladi.', speaker: 'AlgoSoft — Flutter jamoasi', seats: 25, registered: 19, accent: 'cyan', tags: ['Flutter', 'Dart', 'Mobil', 'iOS'] },
  { id: 'ux-design-workshop-2026', title: 'Figma UX/UI Dizayn Ustaxonasi', type: 'Workshop', date: '2026-04-14', location: 'Uychi IT Hub, Kreativ zona', description: 'Figma-da professional interfeys dizayni: komponentlar, auto-layout, prototiplash va foydalanuvchi tadqiqoti usullari.', speaker: 'PixelStudio — Senior UX Designer', seats: 20, registered: 20, accent: 'emerald', tags: ['Figma', 'UI/UX', 'Dizayn', 'Prototip'] },
];

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string; bg: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    bg: "bg-accent/5" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  bg: "bg-violet-500/5" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", bg: "bg-emerald-500/5" },
};

const TYPE_ICONS: Record<string, React.ReactElement> = {
  Hackathon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  Meetup: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
  Bootcamp: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
  Conference: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
  Training: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.61A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  Workshop: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>,
};

function getDaysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function EventsPage() {
  const [activeType, setActiveType] = useState<string>("Barchasi");

  const filtered = activeType === "Barchasi"
    ? EVENTS
    : EVENTS.filter((e) => e.type === activeType);

  const upcoming = filtered.filter((e) => getDaysUntil(e.date) >= 0);
  const past = filtered.filter((e) => getDaysUntil(e.date) < 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(52,211,153,0.05)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Tadbirlar Kalendari</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            IT Tadbirlari &<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Musobaqalar</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Hackathonlar, bootcamplar, konferentsiyalar va ustaxonalar — Uychi IT Hubdagi barcha tadbirlar.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
               { label: "Kelayotgan tadbirlar", value: String(upcoming.length), color: "text-emerald-400" },
              { label: "Ishtirokchilar", value: "1,800+", color: "text-accent" },
              { label: "Yillik tadbir", value: "24+", color: "text-violet-400" },
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
        {/* Type filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {["Barchasi", ...EVENT_TYPES].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all ${
                activeType === type
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400"
                  : "border-border bg-card text-muted hover:border-border hover:text-foreground"
              }`}
            >
              {type !== "Barchasi" && TYPE_ICONS[type]}
              {type}
            </button>
          ))}
        </div>

        {/* Upcoming Events */}
        {upcoming.length > 0 && (
          <>
            <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.15em] text-muted">Kelayotgan tadbirlar</h2>
            <div className="mb-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => {
                const c = A[event.accent as AccentKey];
                const days = getDaysUntil(event.date);
                const pct = Math.round((event.registered / event.seats) * 100);
                const isFull = event.registered >= event.seats;

                return (
                  <div key={event.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border}`}>
                    {/* Type badge */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${c.badge}`}>
                        {TYPE_ICONS[event.type]}
                        {event.type}
                      </span>
                      {days <= 7 && days >= 0 && (
                        <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-2 py-0.5 text-[10px] font-bold text-orange-400">
                          {days === 0 ? "Bugun!" : `${days} kun qoldi`}
                        </span>
                      )}
                    </div>

                    <h3 className={`mt-4 text-[16px] font-bold leading-snug ${c.text}`}>{event.title}</h3>

                    {/* Date & Location */}
                    <div className="mt-3 space-y-1.5 text-[12px] text-muted">
                      <div className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" /></svg>
                        {event.date}{event.endDate ? ` — ${event.endDate}` : ""}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                        {event.location}
                      </div>
                      {event.speaker && (
                        <div className="flex items-center gap-1.5">
                          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                          {event.speaker}
                        </div>
                      )}
                    </div>

                    <p className="mt-3 flex-1 text-[12px] leading-relaxed text-muted line-clamp-3">{event.description}</p>

                    {/* Prize */}
                    {event.prize && (
                      <div className={`mt-3 rounded-lg border ${c.border} ${c.bg} px-3 py-2`}>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Mukofot: </span>
                        <span className={`text-[12px] font-bold ${c.text}`}>{event.prize}</span>
                      </div>
                    )}

                    {/* Registration progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span>{event.registered}/{event.seats} ro'yxatdan o'tgan</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-card-hover">
                        <div className={`h-full rounded-full transition-all ${event.accent === "cyan" ? "bg-accent" : event.accent === "violet" ? "bg-violet-400" : "bg-emerald-400"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {event.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-card-hover px-2 py-0.5 text-[10px] font-medium text-muted">{tag}</span>
                      ))}
                    </div>

                    {/* Register button */}
                    <button disabled={isFull} className={`mt-5 w-full rounded-xl py-2.5 text-[13px] font-bold transition-all ${
                      isFull
                        ? "cursor-not-allowed border border-border bg-card text-muted"
                        : `border ${c.badge} ${c.text} hover:opacity-80`
                    }`}>
                      {isFull ? "Joy band" : "Ro'yxatdan o'tish"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Past Events */}
        {past.length > 0 && (
          <>
            <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.15em] text-muted">O'tgan tadbirlar</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => {
                const c = A[event.accent as AccentKey];
                return (
                  <div key={event.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 opacity-60">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${c.badge} opacity-60`}>
                        {TYPE_ICONS[event.type]}
                        {event.type}
                      </span>
                      <span className="text-[11px] text-muted">{event.date}</span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold text-muted">{event.title}</h3>
                    <p className="mt-1 text-[12px] text-muted">{event.location} · {event.registered} ishtirokchi</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Submit event CTA */}
        <div className="mt-16 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-background to-card p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ O'z tadbiringizni o'tkazing</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Uychi IT Hubda Tadbir Tashkillash</h3>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">Konferentsiya, bootcamp yoki hackathon o'tkazmoqchimisiz? Istiqlol 15-dagi IT Hub infratuzilmasi va Uychi hamjamiyatidan foydalaning.</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-3.5 text-[14px] font-bold text-emerald-400 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/15">
            Murojaat qilish
          </button>
        </div>
      </div>
    </div>
  );
}
