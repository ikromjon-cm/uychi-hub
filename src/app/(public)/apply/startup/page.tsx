"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { apiPost } from "@/lib/api";

const SECTORS = ["AI / ML", "FinTech", "MedTech", "AgriTech", "EdTech", "CleanTech", "Kiberxavfsizlik", "SaaS", "E-Commerce", "Logistika", "Boshqa"];
const STAGES = ["G'oya / Pre-seed", "MVP / Seed", "Dastlabki Daromad", "Series A", "O'sish Bosqichi"];
const FUNDING = ["< $100K", "$100K – $500K", "$500K – $2M", "$2M – $5M", "$5M+"];

export default function StartupApplyPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const body = Object.fromEntries(fd.entries());
    try {
      await apiPost("/startups/startup-applications/", body);
    } catch {
      const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
      submissions.push({ endpoint: "/startups/startup-applications/", body, timestamp: new Date().toISOString() });
      localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
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
            Startap Arizasi
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight text-foreground">
            Inkubatorga Qo&apos;shiling
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            Uychi Hub startap inkubatsiya dasturiga ariza bering. Moliyalashtirish,
            mentorlik, ofis maydoni va global tarmoqqa kirish imkoniyatiga ega bo&apos;ling.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10 text-2xl text-violet-400">✓</div>
            <h2 className="text-xl font-bold text-foreground">Ariza Qabul Qilindi!</h2>
            <p className="mt-2 text-[14px] text-muted">Inkubatsiya jamoamiz 5 ish kuni ichida siz bilan bog&apos;lanadi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">Asoschi Ma&apos;lumotlari</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "founder_name", label: "Ism Familya", placeholder: "To'liq ismingiz" },
                  { name: "email", label: "Elektron Pochta", type: "email", placeholder: "asoschi@startap.com" },
                  { name: "phone", label: "Telefon Raqam", type: "tel", placeholder: "+998 XX XXX XX XX" },
                  { name: "country", label: "Mamlakat", placeholder: "Kelib chiqqan davlat" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                    <input name={f.name} type={f.type ?? "text"} required placeholder={f.placeholder} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">Startap Ma&apos;lumotlari</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Startap Nomi</label>
                    <input name="startup_name" type="text" required placeholder="Startapingiz nomi" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Veb-sayt</label>
                    <input name="website" type="url" placeholder="https://startapingiz.com" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Soha</label>
                    <select name="sector" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-violet-400/40">
                      <option value="">Soha</option>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Bosqich</label>
                    <select name="stage" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-violet-400/40">
                      <option value="">Bosqich</option>
                      {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Jamoa Soni</label>
                    <input name="team_size" type="number" min="1" placeholder="mas. 5" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Kerakli Moliyalashtirish</label>
                  <select name="funding_needed" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-violet-400/40">
                    <option value="">Moliyalashtirish hajmini tanlang</option>
                    {FUNDING.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Texnologiya Steki</label>
                  <input name="tech_stack" type="text" placeholder="mas. Python, TensorFlow, React, PostgreSQL" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Startap Tavsifi</label>
                  <textarea name="description" required rows={4} placeholder="Mahsulotingizni, qanday muammoni yechayotganingizni, natijalariingizni va nima uchun Uychi Hubga qo'shilmoqchi ekanligingizni yozing..." className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">{error}</div>
            )}
            <button type="submit" disabled={sending} className="group w-full rounded-full bg-violet-400 py-4 text-[14px] font-bold text-black transition-all hover:bg-violet-300 hover:shadow-[0_0_35px_-5px_rgba(167,139,250,0.5)] disabled:opacity-60">
              {sending ? "Yuborilmoqda..." : <>Ariza Yuborish <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
