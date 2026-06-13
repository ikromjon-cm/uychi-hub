"use client";

import React, { useState } from "react";
import { useApi } from "@/lib/api";
import { X, CheckCircle } from "lucide-react";

const EVENT_TYPES = ["Hackathon", "Meetup", "Bootcamp", "Conference", "Training", "Workshop"] as const;
type EventType = typeof EVENT_TYPES[number];

interface EventItem {
  id: number; slug: string; title: string; event_type: EventType;
  date: string; end_date?: string | null; location: string; description: string;
  speaker?: string; prize?: string; seats: number; registered_count: number;
  accent: "cyan" | "violet" | "emerald"; tags: string[]; status: string; is_full: boolean;
}

const MOCK_EVENTS: EventItem[] = [
  { id: 1, slug: "hackathon-2026", title: "Uychi IT Hackathon 2026", event_type: "Hackathon", date: "2026-07-12", end_date: "2026-07-13", location: "Uychi IT Hub", description: "48 soatlik hackathon musobaqasi.", prize: "5,000,000 UZS", seats: 200, registered_count: 134, accent: "cyan", tags: ["AI", "AgriTech"], status: "upcoming", is_full: false },
  { id: 2, slug: "python-bootcamp-2026", title: "Python AI Bootcamp", event_type: "Bootcamp", date: "2026-07-07", end_date: "2026-08-30", location: "Uychi IT Hub, Lab-1", description: "8 haftalik intensiv Python bootcamp.", seats: 30, registered_count: 22, accent: "violet", tags: ["Python", "AI"], status: "upcoming", is_full: false },
  { id: 3, slug: "ai-conference-2026", title: "CentralAsia AI Conference 2026", event_type: "Conference", date: "2026-09-15", end_date: "2026-09-16", location: "Namangan, NDU", description: "Markaziy Osiyo miqyosidagi AI konferentsiyasi.", seats: 500, registered_count: 287, accent: "cyan", tags: ["AI", "Networking"], status: "upcoming", is_full: false },
];

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string; bg: string; bar: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent",    bg: "bg-accent/5",    bar: "bg-accent" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400",  bg: "bg-violet-500/5",  bar: "bg-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", bg: "bg-emerald-500/5", bar: "bg-emerald-400" },
};

const TYPE_ICONS: Record<string, React.ReactElement> = {
  Hackathon:  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  Meetup:     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
  Bootcamp:   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
  Conference: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
  Training:   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.61A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  Workshop:   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>,
};

function getDaysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - new Date().getTime()) / 86400000);
}

type RegisterModal = { open: boolean; event: EventItem | null; sent: boolean; sending: boolean; error: string };

export default function EventsPage() {
  const { data: allEvents, loading } = useApi<EventItem[]>("/events/events/", [], MOCK_EVENTS);
  const [activeType, setActiveType] = useState<string>("Barchasi");
  const [modal, setModal] = useState<RegisterModal>({ open: false, event: null, sent: false, sending: false, error: "" });

  function openModal(event: EventItem) {
    setModal({ open: true, event, sent: false, sending: false, error: "" });
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModal(m => ({ ...m, open: false }));
    document.body.style.overflow = "";
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal.event) return;
    setModal(m => ({ ...m, sending: true, error: "" }));
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd),
      event_title: modal.event.title,
      event_id: modal.event.id,
    };
    try {
      const res = await fetch("/api/events/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setModal(m => ({ ...m, sent: true, sending: false }));
      } else {
        const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
        submissions.push({ endpoint: "/api/events/register/", body: data, timestamp: new Date().toISOString() });
        localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
        setModal(m => ({ ...m, sent: true, sending: false }));
      }
    } catch {
      const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
      submissions.push({ endpoint: "/api/events/register/", body: data, timestamp: new Date().toISOString() });
      localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
      setModal(m => ({ ...m, sent: true, sending: false }));
    }
  }

  const events = allEvents.filter(e => e.status !== "cancelled");
  const filtered = activeType === "Barchasi" ? events : events.filter(e => e.event_type === activeType);
  const upcoming = filtered.filter(e => e.status !== "past" && getDaysUntil(e.date) >= 0);
  const past = filtered.filter(e => e.status === "past" || getDaysUntil(e.date) < 0);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(52,211,153,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Tadbirlar Kalendari</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            IT Tadbirlari &amp;<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Musobaqalar</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Hackathonlar, bootcamplar, konferentsiyalar va ustaxonalar — Uychi IT Hubdagi barcha tadbirlar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Kelayotgan tadbirlar", value: loading ? "..." : String(upcoming.length), color: "text-emerald-400" },
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
        <div className="mb-10 flex flex-wrap gap-2">
          {["Barchasi", ...EVENT_TYPES].map((type) => (
            <button key={type} onClick={() => setActiveType(type)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all ${activeType === type ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400" : "border-border bg-card text-muted hover:text-foreground"}`}>
              {type !== "Barchasi" && TYPE_ICONS[type]}
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-72 animate-pulse rounded-2xl border border-border bg-card" />)}
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <>
                <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.15em] text-muted">Kelayotgan tadbirlar</h2>
                <div className="mb-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((event) => {
                    const accent = (event.accent as AccentKey) in A ? event.accent as AccentKey : "cyan";
                    const c = A[accent];
                    const days = getDaysUntil(event.date);
                    const pct = Math.round((event.registered_count / event.seats) * 100);
                    const isFull = event.is_full || event.registered_count >= event.seats;
                    return (
                      <div key={event.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border}`}>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${c.badge}`}>
                            {TYPE_ICONS[event.event_type]}
                            {event.event_type}
                          </span>
                          {days <= 7 && days >= 0 && (
                            <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-2 py-0.5 text-[10px] font-bold text-orange-400">
                              {days === 0 ? "Bugun!" : `${days} kun qoldi`}
                            </span>
                          )}
                        </div>
                        <h3 className={`mt-4 text-[16px] font-bold leading-snug ${c.text}`}>{event.title}</h3>
                        <div className="mt-3 space-y-1.5 text-[12px] text-muted">
                          <div className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" /></svg>
                            {event.date}{event.end_date ? ` — ${event.end_date}` : ""}
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
                        {event.prize && (
                          <div className={`mt-3 rounded-lg border ${c.border} ${c.bg} px-3 py-2`}>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Mukofot: </span>
                            <span className={`text-[12px] font-bold ${c.text}`}>{event.prize}</span>
                          </div>
                        )}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span>{event.registered_count}/{event.seats} ro&apos;yxatdan o&apos;tgan</span>
                            <span>{Math.min(pct, 100)}%</span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-card-hover">
                            <div className={`h-full rounded-full transition-all ${c.bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {(event.tags || []).map((tag) => (
                            <span key={tag} className="rounded-full bg-card-hover px-2 py-0.5 text-[10px] font-medium text-muted">{tag}</span>
                          ))}
                        </div>
                        {isFull ? (
                          <button disabled className="mt-5 w-full cursor-not-allowed rounded-xl border border-border bg-card py-2.5 text-[13px] font-bold text-muted">
                            Joy band
                          </button>
                        ) : (
                          <button onClick={() => openModal(event)} className={`mt-5 block w-full rounded-xl border py-2.5 text-center text-[13px] font-bold transition-all ${c.badge} ${c.text} hover:opacity-80`}>
                            Ro&apos;yxatdan o&apos;tish
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {past.length > 0 && (
              <>
                <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.15em] text-muted">O&apos;tgan tadbirlar</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {past.map((event) => {
                    const accent = (event.accent as AccentKey) in A ? event.accent as AccentKey : "cyan";
                    const c = A[accent];
                    return (
                      <div key={event.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 opacity-60">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${c.badge} opacity-60`}>
                            {TYPE_ICONS[event.event_type]}
                            {event.event_type}
                          </span>
                          <span className="text-[11px] text-muted">{event.date}</span>
                        </div>
                        <h3 className="mt-3 text-[14px] font-semibold text-muted">{event.title}</h3>
                        <p className="mt-1 text-[12px] text-muted">{event.location} · {event.registered_count} ishtirokchi</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {upcoming.length === 0 && past.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-[15px] text-muted">Tadbir topilmadi</p>
                <button onClick={() => setActiveType("Barchasi")} className="mt-3 text-[13px] text-emerald-400 hover:underline">Barchasini ko&apos;rsatish</button>
              </div>
            )}
          </>
        )}

        <div className="mt-16 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-background to-card p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ O&apos;z tadbiringizni o&apos;tkazing</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Uychi IT Hubda Tadbir Tashkillash</h3>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">Konferentsiya, bootcamp yoki hackathon o&apos;tkazmoqchimisiz? IT Hub infratuzilmasi va Uychi hamjamiyatidan foydalaning.</p>
          <a href="mailto:events@uychi.uz?subject=Tadbir tashkillash murojaat" className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-3.5 text-[14px] font-bold text-emerald-400 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/15">
            Murojaat qilish
          </a>
        </div>
      </div>
      {/* Registration Modal */}
      {modal.open && modal.event && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6">
              {modal.sent ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Ro&apos;yxatdan o&apos;tdingiz!</h3>
                  <p className="mt-2 text-[13px] text-muted">
                    <strong className="text-foreground">{modal.event.title}</strong> tadbiri uchun ariza qabul qilindi.
                    24 soat ichida aloqaga chiqamiz.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-6 rounded-full bg-accent px-8 py-2.5 text-[13px] font-bold text-white"
                  >
                    Yopish
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Tadbirga ro&apos;yxatdan o&apos;tish</p>
                    <h3 className="mt-1 text-[16px] font-bold text-foreground">{modal.event.title}</h3>
                    <p className="mt-0.5 text-[12px] text-muted">{modal.event.date} · {modal.event.location}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    {[
                      { name: "first_name",  label: "Ism",        placeholder: "Ismingiz",          required: true },
                      { name: "phone",       label: "Telefon",    placeholder: "+998 XX XXX XX XX", required: true, type: "tel" },
                      { name: "email",       label: "Email",      placeholder: "example@mail.com",  required: true, type: "email" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {f.label} {f.required && <span className="text-rose-500">*</span>}
                        </label>
                        <input
                          name={f.name}
                          type={f.type ?? "text"}
                          placeholder={f.placeholder}
                          required={f.required}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)]"
                        />
                      </div>
                    ))}

                    {modal.error && (
                      <p className="rounded-xl border border-rose-500/20 bg-rose-500/8 px-3 py-2 text-[12px] text-rose-500">
                        {modal.error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={modal.sending}
                      className="mt-1 w-full rounded-full bg-accent py-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark disabled:opacity-60"
                    >
                      {modal.sending ? "Yuborilmoqda..." : "Ariza Yuborish →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
