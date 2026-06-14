"use client";

import { useState } from "react";
import { Video, MessageCircle, Send, Users, Calendar, Clock } from "lucide-react";

const PLATFORMS = [
  { id: "zoom",     label: "Zoom",        icon: <Video         className="h-4 w-4" /> },
  { id: "teams",    label: "MS Teams",    icon: <Users         className="h-4 w-4" /> },
  { id: "meet",     label: "Google Meet", icon: <Video         className="h-4 w-4" /> },
  { id: "whatsapp", label: "WhatsApp",    icon: <MessageCircle className="h-4 w-4" /> },
  { id: "telegram", label: "Telegram",    icon: <Send          className="h-4 w-4" /> },
];

const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const TOPICS = [
  "Investitsiya imkoniyatlari",
  "Hamkorlik taklifi",
  "Ofis maydoni / Ko'chib kelish",
  "Startap inkubatsiyasi",
  "AI yechimlari demonstratsiyasi",
  "Davlat va me'yoriy masalalar",
  "Media va matbuot",
  "Umumiy savol",
];

export default function SchedulePage() {
  const [platform, setPlatform] = useState("zoom");
  const [time, setTime]         = useState("");
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) { setError("Iltimos vaqt tanlang"); return; }
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
            Uchrashuv Belgilash
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight text-foreground">
            Jamoamiz bilan Uchrashing
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            Mutaxassislarimiz bilan individual uchrashuv belgilang. 2 soat ichida javob beramiz va vaqtni email orqali tasdiqlaymiz.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-400">✓</div>
            <h2 className="text-xl font-bold text-foreground">Uchrashuv So&apos;rovi Yuborildi!</h2>
            <p className="mt-2 text-[14px] text-muted">Jamoamiz 2 soat ichida vaqtingizni tasdiqlaydi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Ism Familya</label>
                <input name="name" type="text" required placeholder="To'liq ismingiz" className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Email</label>
                <input name="email" type="email" required placeholder="siz@kompaniya.uz" className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Kompaniya</label>
                <input name="company" type="text" placeholder="Kompaniyangiz nomi" className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Telefon</label>
                <input name="phone" type="tel" placeholder="+998 XX XXX XX XX" className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Uchrashuv Mavzusi</label>
              <select name="topic" required className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none focus:border-accent/40">
                <option value="">Mavzu tanlang</option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-wider text-muted">Qulay Platforma</label>
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
                  <Calendar className="h-3 w-3" /> Qulay Sana
                </label>
                <input name="date" type="date" required min={today} className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <Clock className="h-3 w-3" /> Qulay Vaqt (UZT)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((t) => (
                    <button key={t} type="button" onClick={() => setTime(t)}
                      className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-all ${time === t ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Qo&apos;shimcha Izoh</label>
              <textarea name="message" rows={3} placeholder="Uchrashuv oldidan bilishimizni istagan narsangizni yozing..." className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40" />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">{error}</div>
            )}

            <button type="submit" disabled={sending}
              className="w-full rounded-full bg-accent py-4 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] transition-all hover:bg-accent-dark disabled:opacity-60">
              {sending ? "Yuborilmoqda..." : "Uchrashuv So'rovi Yuborish →"}
            </button>

            <p className="text-center text-[12px] text-muted">
              Ish soatlarimiz: Dushanba–Juma, 09:00–18:00 (UTC+5). Biz 2 soat ichida javob beramiz.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
