"use client";

import { useState } from "react";
import { useApi, apiPost } from "@/lib/api";
import { PARTNERS_LIST } from "@/lib/mock-data";

type Partner = { id: number; name: string; country: string; category: string; tier: string };

const PERKS = [
  { symbol: "↓", title: "Xarajat afzalligi", desc: "Mintaqaviy texnologiya markazlariga nisbatan operatsion xarajatlar 60–70% past. Texnika importiga bojsiz kirish.", highlight: "60–70% arzonroq", accent: "cyan" },
  { symbol: "◈", title: "Kadrlar bazasi", desc: "Yiliga 300,000+ STEM bitiruvchisi kuchli matematika asosi va o'sib borayotgan ingliz tili bilimi bilan.", highlight: "300K+ STEM/yil", accent: "violet" },
  { symbol: "◇", title: "IT Park imtiyozlari", desc: "10 yil davomida 0% korporativ soliq, 0% mehnat fondi solig'i va barcha xorijiy xodimlar uchun visa ko'maklashuvi.", highlight: "0% soliq × 10 yil", accent: "emerald" },
  { symbol: "⊕", title: "Davlat ko'magi", desc: "Prezidentlik darajasida qo'llab-quvvatlash, tezlashtirilgan litsenziyalash va strategik texnologiya loyihalariga ko'investitsiya.", highlight: "Prezidentlik mandati", accent: "cyan" },
];

const OPPORTUNITIES = [
  { title: "Startap Ekotizimi", desc: "AgroTech, EdTech, LogiTech va GovTech yo'nalishlaridagi dastlabki bosqich startaplar", amount: "$50K – $500K", type: "Seed & Pre-Seed", accent: "cyan" },
  { title: "IT Infratuzilma", desc: "Coworking, data center va AI laboratoriyalari kengaytirish loyihalari", amount: "$1M – $10M", type: "Infrastructure", accent: "violet" },
  { title: "Ta'lim Markazi", desc: "IT ta'lim kapasitesini oshirish — yangi kurslar va sertifikat dasturlari", amount: "$200K – $2M", type: "EdTech", accent: "emerald" },
  { title: "Davlat Raqamlashtirish", desc: "Mahalliy hokimlik va davlat xizmatlari uchun raqamli transformatsiya loyihalari", amount: "$500K – $5M", type: "GovTech", accent: "cyan" },
];

export default function InvestorsPage() {
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);

  const CATEGORY_MAP: Record<string, string> = {
    government: "Government",
    university: "University",
    international: "International",
    tech: "Corporate",
    investor: "Accelerator",
  };
  const mockPartners: Partner[] = PARTNERS_LIST.map((p, i) => ({
    id: i + 1,
    name: p.name,
    country: p.country,
    category: CATEGORY_MAP[p.category] || p.category,
    tier: "Gold",
  }));
  const { data: partners } = useApi<Partner[]>("/partners/partners/", [], mockPartners);
  const investors = partners.filter(p => ["Corporate", "Accelerator", "International"].includes(p.category));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    try {
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      await apiPost("/contact/submissions/", {
        name: fd.get("name"),
        email: fd.get("email"),
        company: fd.get("company"),
        phone: fd.get("phone"),
        message: `Investitsiya hajmi: ${fd.get("amount")}\n\n${fd.get("message")}`,
        subject: "Investor Murojaat",
      });
    } catch {
      const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
      submissions.push({ endpoint: "/contact/submissions/", body: { subject: "Investor Murojaat" }, timestamp: new Date().toISOString() });
      localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
    }
    setSending(false);
    setFormSent(true);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative border-b border-border-subtle px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(52,211,153,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Investor Markazi</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi IT Ekotizimiga<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Investitsiya Kiriting</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
            Markaziy Osiyo&apos;ning eng tezkor o&apos;sayotgan texnologiya ekotizimiga investitsiya qiling. Davlat ko&apos;magi, soliq imtiyozlari va ishonchli jamoamiz bilan birgalikda rivojlaning.
          </p>

          {/* Key metrics */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Jalb qilingan investitsiya", value: "$2.5M+" },
              { label: "Rezident kompaniyalar", value: "50+" },
              { label: "Yaratilgan ish o'rinlari", value: "400+" },
              { label: "Hamkor davlatlar", value: "12+" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card px-4 py-5">
                <p className="text-2xl font-bold text-emerald-400">{s.value}</p>
                <p className="mt-1 text-[11px] font-medium text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Why Uychi */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">/ Nima uchun Uychi?</p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-foreground">Investitsiya afzalliklari</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p) => (
              <div key={p.title} className={`rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
                p.accent === "cyan" ? "border-accent/15 bg-accent/3" :
                p.accent === "violet" ? "border-violet-400/15 bg-violet-500/3" :
                "border-emerald-400/15 bg-emerald-500/3"
              }`}>
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border text-lg font-bold ${
                  p.accent === "cyan" ? "border-accent/20 bg-accent/10 text-accent" :
                  p.accent === "violet" ? "border-violet-400/20 bg-violet-500/10 text-violet-400" :
                  "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
                }`}>{p.symbol}</div>
                <h3 className="text-[15px] font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">{p.desc}</p>
                <p className={`mt-3 text-[11px] font-bold ${
                  p.accent === "cyan" ? "text-accent" :
                  p.accent === "violet" ? "text-violet-400" : "text-emerald-400"
                }`}>{p.highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Opportunities */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Investitsiya imkoniyatlari</p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-foreground">Asosiy yo'nalishlar</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {OPPORTUNITIES.map((opp) => (
              <div key={opp.title} className={`rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
                opp.accent === "cyan" ? "border-accent/15 bg-card" :
                opp.accent === "violet" ? "border-violet-400/15 bg-card" :
                "border-emerald-400/15 bg-card"
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      opp.accent === "cyan" ? "border-accent/20 bg-accent/10 text-accent" :
                      opp.accent === "violet" ? "border-violet-400/20 bg-violet-500/10 text-violet-400" :
                      "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
                    }`}>{opp.type}</span>
                    <h3 className="mt-3 text-[17px] font-bold text-foreground">{opp.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{opp.desc}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-[11px] text-muted">Investitsiya hajmi</p>
                    <p className={`text-[16px] font-bold ${
                      opp.accent === "cyan" ? "text-accent" :
                      opp.accent === "violet" ? "text-violet-400" : "text-emerald-400"
                    }`}>{opp.amount}</p>
                  </div>
                  <a href="/schedule" className="rounded-xl border border-border bg-card px-4 py-2 text-[12px] font-semibold text-muted transition-all hover:text-foreground">
                    Batafsil
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners / Co-investors */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Hamkor va investorlar</p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-foreground">Bizga ishongan tashkilotlar</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {investors.map((p) => (
              <div key={p.id} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] font-semibold text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* Download deck + Contact */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Download deck */}
          <div className="overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-background to-card p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">Investitsiya Taqdimoti</p>
            <h3 className="mt-2 text-xl font-bold text-foreground">To'liq Hujjatlarni Yuklab Oling</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">Bozor ma'lumotlari, imtiyozlar tuzilmasi, ROI modellari va tasdiqlangan muvaffaqiyat hikoyalarini o'z ichiga olgan keng qamrovli taqdimot.</p>
            <a href="mailto:info@uychi.uz?subject=Investitsiya%20Taqdimoti" className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-[13px] font-bold text-accent transition-all hover:border-cyan-400/50 hover:bg-accent/15">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Taqdimotni yuklab olish (PDF)
            </a>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-400">Bog'lanish</p>
            <h3 className="mt-2 text-xl font-bold text-foreground">Investitsiya Muzokarasi</h3>
            {formSent ? (
              <div className="mt-6 flex flex-col items-center rounded-xl border border-emerald-400/20 bg-emerald-500/5 py-10 text-center">
                <p className="text-2xl text-emerald-400">✓</p>
                <p className="mt-2 font-bold text-foreground">Xabaringiz yuborildi!</p>
                <p className="mt-1 text-[13px] text-muted">24 soat ichida javob beramiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Ism", name: "name", placeholder: "To'liq ismingiz", span: 1 },
                  { label: "Kompaniya", name: "company", placeholder: "Kompaniya nomi", span: 1 },
                  { label: "Email", name: "email", placeholder: "you@company.com", type: "email", span: 1 },
                  { label: "Telefon", name: "phone", placeholder: "+998 XX XXX XX XX", type: "tel", span: 1 },
                  { label: "Investitsiya hajmi", name: "amount", placeholder: "Masalan: $100K – $1M", span: 2 },
                ].map((f) => (
                  <div key={f.label} className={f.span === 2 ? "sm:col-span-2" : ""}>
                    <label htmlFor={`inv-${f.name}`} className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">{f.label}</label>
                    <input id={`inv-${f.name}`} name={f.name} type={f.type || "text"} placeholder={f.placeholder} required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/30" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label htmlFor="inv-message" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">Xabar</label>
                  <textarea id="inv-message" name="message" rows={3} placeholder="Investitsiya yo'nalishi va qo'shimcha ma'lumotlar..." className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/30" />
                </div>
                <div className="sm:col-span-2">
                    <button type="submit" disabled={sending} className="w-full rounded-full bg-violet-400 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-violet-300 disabled:opacity-60">
                    {sending ? "Yuborilmoqda..." : "Muzokaraga taklif"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
