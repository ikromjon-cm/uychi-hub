"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

const INVESTMENT_TYPES = ["Venchur Kapital", "Xususiy Kapital", "Angel Investitsiya", "Korporativ VC", "Davlat Fondi", "Oilaviy Ofis", "Boshqa"];
const SECTORS = ["AI / Machine Learning", "FinTech", "MedTech", "AgriTech", "EdTech", "CleanTech", "Kiberxavfsizlik", "SaaS", "Infratuzilma", "Boshqa"];
const TICKET_SIZES = ["$50K – $250K", "$250K – $1M", "$1M – $5M", "$5M – $20M", "$20M+"];
const TIMELINES = ["Darhol (0–3 oy)", "Qisqa muddatli (3–6 oy)", "O'rta muddatli (6–12 oy)", "Uzoq muddatli (12+ oy)"];

export default function InvestorApplyPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    try {
      await fetch("/api/investors/investors/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
    } catch {}
    setSending(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            Investor Arizasi
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi Hubga Investitsiya Kiriting
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            Investitsiya manfaatingizni yuboring. Hamkorlik jamoamiz barcha arizalarni
            48 soat ichida ko&apos;rib chiqadi va qo&apos;ng&apos;iroq rejalashtiriladi.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-400">✓</div>
            <h2 className="text-xl font-bold text-foreground">Ariza Qabul Qilindi!</h2>
            <p className="mt-2 text-[14px] text-muted">Investitsiya jamoamiz 48 soat ichida siz bilan bog&apos;lanadi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">Shaxsiy Ma&apos;lumotlar</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "contact_name", label: "Ism Familya", type: "text", placeholder: "To'liq ismingiz" },
                  { name: "email", label: "Elektron Pochta", type: "email", placeholder: "siz@fond.com" },
                  { name: "company", label: "Kompaniya / Fond", type: "text", placeholder: "Investitsiya firmasi nomi" },
                  { name: "country", label: "Mamlakat", type: "text", placeholder: "Mamlakatngiz" },
                  { name: "phone", label: "Telefon Raqam", type: "tel", placeholder: "+998 XX XXX XX XX" },
                  { name: "linkedin", label: "LinkedIn", type: "url", placeholder: "linkedin.com/in/profilingiz" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                    <input name={f.name} type={f.type} placeholder={f.placeholder} required={["contact_name", "email", "company"].includes(f.name)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-400/40 focus:bg-card" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-[12px] font-bold uppercase tracking-wider text-muted">Investitsiya Profili</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">Investitsiya Turi</label>
                  <select name="investor_type" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                    <option value="">Turni tanlang</option>
                    {INVESTMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">Asosiy Sohalar</label>
                  <select name="sectors" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                    <option value="">Asosiy sohani tanlang</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">Investitsiya Hajmi</label>
                    <select name="ticket_size" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                      <option value="">Hajmni tanlang</option>
                      {TICKET_SIZES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">Investitsiya Muddati</label>
                    <select name="timeline" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none focus:border-emerald-400/40">
                      <option value="">Muddatni tanlang</option>
                      {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Investitsiya Konsepsiyasi va Xabar</label>
                  <textarea name="notes" rows={4} placeholder="Investitsiya konsepsiyangizni, nima qidirayotganingizni va nima uchun Uychi Hub sizni qiziqtirayotganini yozing..." className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-400/40 focus:bg-card" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={sending} className="group w-full rounded-full bg-emerald-400 py-4 text-[14px] font-bold text-black transition-all hover:bg-emerald-300 hover:shadow-[0_0_35px_-5px_rgba(52,211,153,0.5)] disabled:opacity-60">
              {sending ? "Yuborilmoqda..." : <>Ariza Yuborish <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
