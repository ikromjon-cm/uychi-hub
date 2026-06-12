"use client";

import { useState } from "react";
import { Video, MessageCircle, Send, Users, Calendar, Clock } from "lucide-react";

const PLATFORMS = [
  { id: "zoom", label: "Zoom", icon: <Video className="h-4 w-4" /> },
  { id: "teams", label: "MS Teams", icon: <Users className="h-4 w-4" /> },
  { id: "meet", label: "Google Meet", icon: <Video className="h-4 w-4" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="h-4 w-4" /> },
  { id: "telegram", label: "Telegram", icon: <Send className="h-4 w-4" /> },
];

const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const TOPICS = [
  "Investment Opportunities",
  "Partnership Proposal",
  "Office Space / Relocation",
  "Startup Incubation",
  "AI Solutions Demo",
  "Government & Regulatory",
  "Media & Press",
  "General Inquiry",
];

export default function SchedulePage() {
  const [platform, setPlatform] = useState("zoom");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    try {
      await fetch("/api/meetings/meeting-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd), platform, time }),
      });
    } catch {}
    setSending(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            <Calendar className="h-3 w-3" />
            Meeting Booking
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight text-white">
            Schedule a Meeting
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-zinc-500">
            Book a one-on-one session with our team. We respond within 2 hours
            and confirm your slot by email.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-400">✓</div>
            <h2 className="text-xl font-bold text-white">Meeting Requested!</h2>
            <p className="mt-2 text-[14px] text-zinc-500">Our team will confirm your slot within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Full Name</label>
                <input name="name" type="text" required placeholder="Your full name" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Email</label>
                <input name="email" type="email" required placeholder="you@company.com" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Company</label>
                <input name="company" type="text" placeholder="Your company" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Phone</label>
                <input name="phone" type="tel" placeholder="+998 XX XXX XX XX" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Meeting Topic</label>
              <select name="topic" required className="w-full rounded-xl border border-white/6 bg-[#0a0a0a] px-4 py-3.5 text-[14px] text-white outline-none focus:border-cyan-500/40">
                <option value="">Select a topic</option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Preferred Platform</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-all ${
                      platform === p.id
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                        : "border-white/8 bg-white/2 text-zinc-500 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                  <Calendar className="h-3 w-3" /> Preferred Date
                </label>
                <input name="date" type="date" required className="w-full rounded-xl border border-white/6 bg-[#0a0a0a] px-4 py-3.5 text-[14px] text-white outline-none focus:border-cyan-500/40" />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                  <Clock className="h-3 w-3" /> Preferred Time (UZT)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-all ${
                        time === t
                          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                          : "border-white/8 bg-white/2 text-zinc-500 hover:border-white/15 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Additional Notes</label>
              <textarea name="message" rows={3} placeholder="Anything you'd like us to know before the meeting..." className="w-full resize-none rounded-xl border border-white/6 bg-white/2 px-4 py-3.5 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-500/40 focus:bg-white/3" />
            </div>

            <button type="submit" disabled={sending} className="group w-full rounded-full bg-cyan-400 py-4 text-[14px] font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_35px_-5px_rgba(6,247,227,0.5)] disabled:opacity-60">
              {sending ? "Scheduling..." : <>Schedule Meeting <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
