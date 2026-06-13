"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STATS } from "@/lib/constants";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { NEWS as MOCK_NEWS } from "@/lib/mock-data";
import {
  ArrowRight, ArrowUpRight, Building2, Brain, Rocket, GraduationCap,
  CheckCircle, ChevronRight, AlertCircle, MapPin, Phone, Mail,
} from "lucide-react";

type Article = { id: number; title: string; category: string; summary: string; status: string; published_at: string };

/* ─── Motion variants ─────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const slideLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};
const slideRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── CountUp ──────────────────────────────────────────────────────── */
function CountUp({ to }: { to: string }) {
  const ref     = useRef<HTMLSpanElement>(null);
  const inView  = useInView(ref, { once: true });
  const num     = parseFloat(to.replace(/[^\d.]/g, "")) || 0;
  const suffix  = to.replace(/[\d.,]/g, "");
  const [val, setVal] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    let start: number | null = null;
    const dur = 1600;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(ease * num));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return <span ref={ref}>{to.includes(",") ? val.toLocaleString() : val}{suffix}</span>;
}

/* ─── Section heading ──────────────────────────────────────────────── */
function SectionTag({ color, children }: { color?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${color ?? "text-accent"}`}>
      <span className="h-px w-5 bg-current opacity-60" />
      {children}
    </span>
  );
}

/* ─── Hover card ───────────────────────────────────────────────────── */
function HoverCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group rounded-2xl border border-border bg-card card-shadow transition-all duration-300 hover:border-accent/25 ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [sending,   setSending]   = useState(false);
  const [sent,      setSent]      = useState(false);
  const [formError, setFormError] = useState("");

  const mockArticles: Article[] = MOCK_NEWS.map((n, i) => ({
    id: i + 1, title: n.title, category: n.category,
    summary: n.excerpt, status: "published", published_at: n.date,
  }));
  const { data: articles } = useApi<Article[]>("/news/articles/", [], mockArticles);
  const { t } = useLang();
  const NEWS = articles.filter(a => a.status === "published").slice(0, 6);

  const STAT_ICONS = ["👥", "📐", "🏫", "🏭", "🏗️"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setSending(true);
    const fd   = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    const { email, phone, name } = data as Record<string, string>;
    if (!name || name.length < 2)                               { setFormError("Ismingizni to'liq kiriting (kamida 2 harf)"); setSending(false); return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))    { setFormError("Email manzili noto'g'ri formatda"); setSending(false); return; }
    if (phone && !/^[\+\d\s\-\(\)]{7,20}$/.test(phone))        { setFormError("Telefon raqam noto'g'ri formatda"); setSending(false); return; }
    try {
      const res = await fetch("/api/contact/submissions/", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.text().catch(() => "")) || "Yuborishda xatolik yuz berdi");
      setSent(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
    setSending(false);
  }

  return (
    <div className="flex flex-col bg-background text-foreground">
      <Navbar />

      {/* ══ HERO — split layout ══════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Accent orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-500/6 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-12 pt-28">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">

            {/* Left — content */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <SectionTag>Uychi · Namangan · 2026</SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-foreground"
              >
                {t.hero.title.split("IT")[0]}
                <span className="gradient-text">IT</span>
                {t.hero.title.split("IT")[1]}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-lg text-[1rem] leading-[1.75] text-muted"
              >
                {t.hero.desc}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/apply/startup"
                    className="btn-ripple inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(79,70,229,0.4)] transition-all hover:bg-accent-dark hover:shadow-[0_6px_28px_rgba(79,70,229,0.5)]"
                  >
                    {t.hero.apply}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-[14px] font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card-hover"
                  >
                    {t.hero.reach}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { icon: "🏆", label: "IT Park a'zosi" },
                  { icon: "🎓", label: "42,400 o'quvchi" },
                  { icon: "🚀", label: "30+ startap" },
                ].map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5 text-[13px] text-muted">
                    <span>{b.icon}</span>
                    <span>{b.label}</span>
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — stats visual */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideRight}
              className="relative hidden lg:block"
            >
              {/* Background card */}
              <div className="relative rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm">
                {/* Gradient accent top */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

                <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  Tuman Ko&apos;rsatkichlari
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      className={`rounded-2xl border border-border bg-background p-5 ${i === 0 ? "col-span-2" : ""}`}
                    >
                      <span className="text-[22px]">{STAT_ICONS[i]}</span>
                      <p className="mt-2 text-[1.6rem] font-extrabold leading-none tracking-tight text-foreground">
                        <CountUp to={s.value} />
                      </p>
                      <p className="mt-1.5 text-[12px] font-medium uppercase tracking-wider text-muted">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* HUB badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="mt-4 flex items-center justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/8 px-5 py-4"
                >
                  <div>
                    <p className="text-[13px] font-bold text-accent">UYCHI IT HUB</p>
                    <p className="mt-0.5 text-[12px] text-muted">Namangan viloyati, O'zbekiston</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Faol
                  </span>
                </motion.div>
              </div>

              {/* Floating mini card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -top-6 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg"
              >
                <p className="text-[11px] text-muted">Yangi startap</p>
                <p className="mt-0.5 text-[13px] font-bold text-foreground">AgroSmart Uychi</p>
                <p className="mt-0.5 text-[11px] font-medium text-emerald-500">✓ Qabul qilindi</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -left-6 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg"
              >
                <p className="text-[11px] text-muted">Sug'orish tejash</p>
                <p className="mt-0.5 text-[18px] font-extrabold text-accent">40%</p>
                <p className="text-[11px] text-muted">IoT + AI orqali</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-widest text-muted">Ko&apos;proq</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-5 w-px bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </section>

      {/* ══ INFRASTRUCTURE ══════════════════════════════════════════════ */}
      <section id="about" className="relative border-t border-border-subtle bg-card py-24 md:py-32">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-16 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionTag>{t.infra.badge.replace("/ ", "")}</SectionTag>
              </motion.div>
              <motion.h2 variants={fadeUp} className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
                {t.infra.title}
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-md text-[15px] leading-relaxed text-muted lg:text-right">
              {t.infra.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.infra.items.map((item, i) => {
              const Icon = [Building2, Brain, Rocket, GraduationCap][i];
              const colors = [
                { bg: "bg-indigo-500/10", text: "text-indigo-500", dark: "dark:text-indigo-400" },
                { bg: "bg-violet-500/10", text: "text-violet-600", dark: "dark:text-violet-400" },
                { bg: "bg-rose-500/10",   text: "text-rose-600",   dark: "dark:text-rose-400" },
                { bg: "bg-amber-500/10",  text: "text-amber-600",  dark: "dark:text-amber-400" },
              ][i];
              return (
                <motion.div key={i} variants={fadeUp}>
                  <HoverCard className="h-full p-6">
                    <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}>
                      <Icon className={`h-5.5 w-5.5 ${colors.text} ${colors.dark}`} />
                    </div>
                    <h3 className="text-[15px] font-bold">{item.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                  </HoverCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ STARTUPS ════════════════════════════════════════════════════ */}
      <section id="startups" className="relative border-t border-border-subtle py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/4 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-16 max-w-xl"
          >
            <motion.div variants={fadeUp}>
              <SectionTag color="text-violet-500 dark:text-violet-400">{t.startups.badge.replace("/ ", "")}</SectionTag>
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              {t.startups.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-muted">
              {t.startups.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-5 md:grid-cols-3"
          >
            {t.startups.items.map((s, i) => {
              const accents = [
                { badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", border: "border-emerald-500/15 hover:border-emerald-500/35" },
                { badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",   dot: "bg-indigo-500",  border: "border-indigo-500/15 hover:border-indigo-500/35" },
                { badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",   dot: "bg-violet-500",  border: "border-violet-500/15 hover:border-violet-500/35" },
              ][i];
              return (
                <motion.div key={i} variants={fadeUp}>
                  <div className={`group flex h-full flex-col rounded-2xl border bg-card p-6 card-shadow transition-all duration-300 ${accents.border}`}>
                    <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${accents.badge}`}>
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                        className={`h-1.5 w-1.5 rounded-full ${accents.dot}`}
                      />
                      {s.sector}
                    </span>

                    <h3 className="mt-4 text-[17px] font-bold text-foreground">{s.name}</h3>

                    <div className="mt-4 flex flex-1 flex-col gap-3 text-[13px]">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0 text-[16px]">⚡</span>
                        <p className="text-muted">{s.problem}</p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <p className="text-muted">{s.solution}</p>
                      </div>
                      <div className="mt-auto rounded-xl border border-border bg-background px-4 py-3">
                        <p className="text-[12px] font-medium text-muted">{s.users}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
      <section id="how" className="relative border-t border-border-subtle bg-card py-24 md:py-32">
        <div className="absolute inset-0 line-grid opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <SectionTag color="text-amber-600 dark:text-amber-400">{t.how.badge.replace("/ ", "")}</SectionTag>
            </motion.div>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-xl text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              {t.how.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              {t.how.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Connector line for desktop */}
            <div className="pointer-events-none absolute left-[calc(12.5%+1px)] top-10 hidden h-px w-[75%] bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-amber-500/20 lg:block" />

            {t.how.steps.map((item, i) => {
              const colors = [
                "border-indigo-500/20 bg-indigo-500/8 text-indigo-500 dark:text-indigo-400",
                "border-violet-500/20 bg-violet-500/8 text-violet-600 dark:text-violet-400",
                "border-rose-500/20 bg-rose-500/8 text-rose-600 dark:text-rose-400",
                "border-amber-500/20 bg-amber-500/8 text-amber-600 dark:text-amber-400",
              ][i];
              const numColors = [
                "text-indigo-500/15 dark:text-indigo-400/15",
                "text-violet-500/15 dark:text-violet-400/15",
                "text-rose-500/15 dark:text-rose-400/15",
                "text-amber-500/15 dark:text-amber-400/15",
              ][i];
              const titleColors = [
                "text-indigo-600 dark:text-indigo-400",
                "text-violet-600 dark:text-violet-400",
                "text-rose-600 dark:text-rose-400",
                "text-amber-600 dark:text-amber-400",
              ][i];
              return (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="relative rounded-2xl border border-border bg-background p-6"
                >
                  {/* Step badge */}
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border text-[13px] font-black ${colors}`}>
                    {item.step}
                  </span>
                  {/* Large number watermark */}
                  <span className={`pointer-events-none absolute right-4 top-2 text-[5rem] font-black leading-none ${numColors}`}>
                    {item.step}
                  </span>
                  <h3 className={`mt-4 text-[16px] font-bold ${titleColors}`}>{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/apply/startup"
              className="btn-ripple inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-white shadow-[0_4px_18px_rgba(79,70,229,0.38)] transition-all hover:bg-accent-dark"
            >
              {t.how.applyBtn} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/apply/investor"
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 px-8 py-3.5 text-[13px] font-semibold text-violet-600 transition-all hover:border-violet-500/55 dark:text-violet-400"
            >
              {t.how.investorBtn}
            </Link>
            <Link
              href="/education"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-[13px] font-semibold text-muted transition-all hover:text-foreground"
            >
              {t.how.educationBtn}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ NEWS ════════════════════════════════════════════════════════ */}
      <section id="news" className="relative border-t border-border-subtle py-24 md:py-32">
        <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/4 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionTag color="text-emerald-600 dark:text-emerald-400">{t.news.badge.replace("/ ", "")}</SectionTag>
              </motion.div>
              <motion.h2 variants={fadeUp} className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
                {t.news.title}
              </motion.h2>
            </div>
            <Link
              href="/news"
              className="hidden items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors hover:text-accent-dark sm:flex"
            >
              Barchasini ko&apos;rish <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {NEWS.map((item, idx) => {
              const catColors = [
                "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
                "bg-violet-500/10 text-violet-600 dark:text-violet-400",
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
              ][idx % 3];
              return (
                <motion.div key={item.id} variants={fadeUp}>
                  <HoverCard className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColors}`}>
                        {item.category}
                      </span>
                      <time className="text-[11px] text-muted">
                        {item.published_at?.slice(0, 10) || ""}
                      </time>
                    </div>
                    <h3 className="mt-4 flex-1 text-[15px] font-bold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted line-clamp-3">
                      {item.summary}
                    </p>
                    <div className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-accent">
                      {t.news.more} <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </HoverCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ CONTACT — 2-column layout ════════════════════════════════════ */}
      <section id="contact" className="relative border-t border-border-subtle bg-card py-24 md:py-32">
        <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

            {/* Left — info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionTag>{t.contact.badge.replace("/ ", "")}</SectionTag>
              </motion.div>
              <motion.h2 variants={fadeUp} className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
                {t.contact.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-muted">
                {t.contact.desc}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 space-y-4">
                {[
                  { icon: MapPin,  label: "Manzil",   value: "Istiqlol ko'chasi 15, Uychi, Namangan",  href: undefined },
                  { icon: Phone,   label: "Telefon",  value: "+998 79 224 00 00",                        href: "tel:+998792240000" },
                  { icon: Mail,    label: "Email",    value: "info@uychi.uz",                            href: "mailto:info@uychi.uz" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
                      {href ? (
                        <a href={href} className="mt-0.5 text-[14px] font-medium text-foreground transition-colors hover:text-accent">
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-[14px] font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                <p className="text-[13px] font-bold text-accent">Ish vaqti</p>
                <p className="mt-1 text-[13px] text-muted">Dushanba – Juma: 09:00 – 18:00</p>
                <p className="text-[13px] text-muted">Shanba: 09:00 – 13:00</p>
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-3xl"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-xl font-bold">{t.contact.successTitle}</h3>
                  <p className="mt-2 text-[14px] text-muted">{t.contact.successDesc}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  {([
                    { label: t.contact.fields.name,    name: "name",    type: "text",  placeholder: t.contact.fields.namePh,    span: 1 },
                    { label: t.contact.fields.company, name: "company", type: "text",  placeholder: t.contact.fields.companyPh, span: 1 },
                    { label: t.contact.fields.country, name: "country", type: "text",  placeholder: t.contact.fields.countryPh, span: 1 },
                    { label: t.contact.fields.email,   name: "email",   type: "email", placeholder: t.contact.fields.emailPh,   span: 1 },
                    { label: t.contact.fields.phone,   name: "phone",   type: "tel",   placeholder: t.contact.fields.phonePh,   span: 2 },
                  ] as const).map((f) => (
                    <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                      <label htmlFor={`c-${f.name}`} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {f.label}
                      </label>
                      <input
                        id={`c-${f.name}`} name={f.name} type={f.type}
                        placeholder={f.placeholder} required
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)]"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label htmlFor="c-message" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {t.contact.fields.message}
                    </label>
                    <textarea
                      id="c-message" name="message" rows={5}
                      placeholder={t.contact.fields.messagePh} required
                      className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)]"
                    />
                  </div>
                  {formError && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="sm:col-span-2">
                      <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-[13px] text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
                      </div>
                    </motion.div>
                  )}
                  <div className="sm:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-ripple w-full rounded-full bg-accent py-4 text-[14px] font-bold text-white shadow-[0_4px_18px_rgba(79,70,229,0.35)] transition-all hover:bg-accent-dark hover:shadow-[0_6px_28px_rgba(79,70,229,0.45)] disabled:opacity-60"
                    >
                      {sending ? t.contact.sending : (
                        <>{t.contact.send} <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="ml-2 inline-block">→</motion.span></>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
