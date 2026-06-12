"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STATS } from "@/lib/constants";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { NEWS as MOCK_NEWS } from "@/lib/mock-data";
import { ArrowRight, Sparkles, Building2, Brain, Rocket, GraduationCap, CheckCircle, ChevronRight, AlertCircle } from "lucide-react";

type Article = { id: number; title: string; category: string; summary: string; status: string; published_at: string; };

const ICONS = [Building2, Brain, Rocket, GraduationCap];
const INFRA_COLORS = ["accent", "violet", "emerald", "accent"] as const;
const STARTUP_ACCENTS = ["emerald", "accent", "violet"] as const;
const STEP_COLORS = ["accent", "violet", "emerald", "accent"] as const;
const ACCENTS = ["accent", "violet", "emerald"] as const;

type AccentKey = "accent" | "violet" | "emerald";

const A: Record<AccentKey, { border: string; badge: string; glow: string; text: string }> = {
  accent:  { border: "border-accent/20 hover:border-accent/50",         badge: "bg-accent/10 text-accent",         glow: "hover:shadow-[0_0_30px_-5px_rgba(6,247,227,0.15)]",     text: "text-accent" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/50", badge: "bg-violet-500/10 text-violet-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.15)]",    text: "text-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/50",badge: "bg-emerald-500/10 text-emerald-400",glow: "hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]",   text: "text-emerald-400" },
};

const STEP_C = {
  accent:  { border: "border-accent/20",        num: "text-accent/20",        title: "text-accent" },
  violet:  { border: "border-violet-400/20",     num: "text-violet-400/20",    title: "text-violet-400" },
  emerald: { border: "border-emerald-400/20",    num: "text-emerald-400/20",   title: "text-emerald-400" },
};

export default function Home() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");
  const mockArticles: Article[] = MOCK_NEWS.map((n, i) => ({
    id: i + 1, title: n.title, category: n.category,
    summary: n.excerpt, status: "published", published_at: n.date,
  }));
  const { data: articles } = useApi<Article[]>("/news/articles/", [], mockArticles);
  const { t } = useLang();
  const NEWS = articles.filter(a => a.status === "published").slice(0, 6);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    const email = data.email as string;
    const phone = data.phone as string;
    const name = data.name as string;
    if (!name || name.length < 2) {
      setFormError("Ismingizni to'liq kiriting (kamida 2 harf)");
      setSending(false);
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Email manzili noto'g'ri formatda");
      setSending(false);
      return;
    }
    if (phone && !/^[\+\d\s\-\(\)]{7,20}$/.test(phone)) {
      setFormError("Telefon raqam noto'g'ri formatda");
      setSending(false);
      return;
    }
    try {
      const res = await fetch("/api/contact/submissions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Yuborishda xatolik yuz berdi");
      }
      setSent(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
    setSending(false);
  }

  return (
    <div className="flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,247,227,0.08)_0%,transparent_60%)]" />
          <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px] animate-pulse-glow" />
          <div className="absolute right-1/4 top-1/2 h-56 w-56 rounded-full bg-accent/8 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute inset-0 hero-grid opacity-[0.4]" style={{ backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            <Sparkles className="h-3 w-3" />
            {t.hero.badge}
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            <span className="gradient-text">{t.hero.title.split(" IT ")[0]} IT </span>
            {t.hero.title.split(" IT ")[1]}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-muted">
            {t.hero.desc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/apply/startup"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_35px_-5px_rgba(6,247,227,0.45)] sm:w-auto"
            >
              {t.hero.apply}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#contact"
              className="w-full rounded-full border border-border bg-card px-8 py-3.5 text-center text-[13px] font-semibold text-foreground transition-all hover:bg-card-hover sm:w-auto"
            >
              {t.hero.reach}
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-20 w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center px-4 py-7 text-center last:col-span-2 sm:last:col-span-1">
                <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">{s.value}</span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section id="about" className="relative border-t border-border-subtle px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(167,139,250,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.infra.badge}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{t.infra.title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.infra.desc}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.infra.items.map((item, i) => {
              const color = INFRA_COLORS[i];
              const c = A[color];
              const Icon = ICONS[i];
              return (
                <div key={i} className={`group rounded-2xl border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] ${c.border} ${c.glow}`}>
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl border ${c.badge} border-current/20`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[15px] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Startups */}
      <section id="startups" className="relative border-t border-border-subtle bg-background px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_50%,rgba(6,247,227,0.03)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">{t.startups.badge}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{t.startups.title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.startups.desc}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {t.startups.items.map((s, i) => {
              const accent = STARTUP_ACCENTS[i];
              const c = A[accent];
              return (
                <div key={i} className={`flex flex-col rounded-2xl border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] ${c.border} ${c.glow}`}>
                  <span className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${c.badge} border-current/20`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${c.text.replace("text-", "bg-")}`} />
                    {s.sector}
                  </span>
                  <h3 className={`mt-4 text-[17px] font-bold ${c.text}`}>{s.name}</h3>
                  <div className="mt-3 flex flex-1 flex-col gap-3 text-[13px]">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-muted-foreground">!</span>
                      <p className="text-muted">{s.problem}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <p className="text-muted">{s.solution}</p>
                    </div>
                    <div className="mt-auto rounded-xl border border-border bg-background px-4 py-3">
                      <p className="mt-1 text-[12px] text-muted">{s.users}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative border-t border-border-subtle px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(167,139,250,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">{t.how.badge}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{t.how.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{t.how.desc}</p>
          </div>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.how.steps.map((item, i) => {
              const color = STEP_COLORS[i];
              const c = STEP_C[color];
              return (
                <div key={item.step} className={`relative rounded-2xl border bg-card p-6 transition-all duration-500 hover:-translate-y-1 ${c.border}`}>
                  {i < 3 && (
                    <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-border to-transparent lg:block" />
                  )}
                  <span className={`block text-[4rem] font-bold leading-none ${c.num}`}>{item.step}</span>
                  <h3 className={`mt-2 text-[16px] font-bold ${c.title}`}>{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/apply/startup" className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-black transition-all hover:shadow-[0_0_35px_-5px_rgba(6,247,227,0.5)]">
              {t.how.applyBtn}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/apply/investor" className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 px-8 py-3.5 text-[13px] font-semibold text-violet-400 transition-all hover:border-violet-400/50">
              {t.how.investorBtn}
            </Link>
            <Link href="/education" className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-[13px] font-semibold text-muted transition-all hover:border-border hover:text-foreground">
              {t.how.educationBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="relative border-t border-border-subtle bg-card px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_60%,rgba(52,211,153,0.03)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">{t.news.badge}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{t.news.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item, idx) => {
              const accent = ACCENTS[idx % 3];
              const c = A[accent];
              return (
                <article key={item.id} className={`group flex flex-col rounded-2xl border bg-background p-6 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] ${c.border} ${c.glow}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.badge} border-current/20`}>
                      {item.category}
                    </span>
                    <time className="text-[11px] text-muted">{item.published_at?.slice(0, 10) || ""}</time>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{item.summary}</p>
                  <div className={`mt-5 flex items-center gap-1 text-[12px] font-semibold ${c.text}`}>
                    {t.news.more}
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative border-t border-border-subtle px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.contact.badge}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{t.contact.title}</h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{t.contact.desc}</p>
            <div className="mx-auto mt-6 flex flex-wrap justify-center gap-6 text-[13px] text-muted">
              <span className="flex items-center gap-1.5"><span className="text-accent">📍</span> Istiqlol ko&apos;chasi 15, Uychi, Namangan</span>
              <span className="flex items-center gap-1.5"><span className="text-accent">📞</span> +998 79 224 00 00</span>
              <span className="flex items-center gap-1.5"><span className="text-accent">✉</span> info@uychi.uz</span>
            </div>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-400">✓</div>
              <h3 className="text-xl font-bold">{t.contact.successTitle}</h3>
              <p className="mt-2 text-[14px] text-muted">{t.contact.successDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
              {([
                { label: t.contact.fields.name,    name: "name",    type: "text",  placeholder: t.contact.fields.namePh,    span: 1 },
                { label: t.contact.fields.company, name: "company", type: "text",  placeholder: t.contact.fields.companyPh, span: 1 },
                { label: t.contact.fields.country, name: "country", type: "text",  placeholder: t.contact.fields.countryPh, span: 1 },
                { label: t.contact.fields.email,   name: "email",   type: "email", placeholder: t.contact.fields.emailPh,   span: 1 },
                { label: t.contact.fields.phone,   name: "phone",   type: "tel",   placeholder: t.contact.fields.phonePh,   span: 2 },
              ] as const).map((f) => (
                <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                  <label htmlFor={`contact-${f.name}`} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                  <input
                    id={`contact-${f.name}`} name={f.name} type={f.type} placeholder={f.placeholder} required
                    className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:bg-card-hover"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.contact.fields.message}</label>
                <textarea
                  id="contact-message" name="message" rows={5}
                  placeholder={t.contact.fields.messagePh}
                  required
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:bg-card-hover"
                />
              </div>
              {formError && (
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-[13px] text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {formError}
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <button
                  type="submit" disabled={sending}
                  className="group w-full rounded-full bg-accent py-4 text-[14px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_35px_-5px_rgba(6,247,227,0.5)] disabled:opacity-60"
                >
                  {sending ? t.contact.sending : <>{t.contact.send} <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
