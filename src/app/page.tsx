"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STATS } from "@/lib/constants";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { NEWS as MOCK_NEWS } from "@/lib/mock-data";
import {
  ArrowRight, Sparkles, Building2, Brain, Rocket, GraduationCap,
  CheckCircle, ChevronRight, AlertCircle,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */
type Article = { id: number; title: string; category: string; summary: string; status: string; published_at: string };
type AccentKey = "accent" | "violet" | "emerald";

/* ─── Constants ───────────────────────────────────────────────────────────────── */
const ICONS = [Building2, Brain, Rocket, GraduationCap];
const INFRA_COLORS: AccentKey[]   = ["accent", "violet", "emerald", "accent"];
const STARTUP_ACCENTS: AccentKey[] = ["emerald", "accent", "violet"];
const STEP_COLORS: AccentKey[]    = ["accent", "violet", "emerald", "accent"];
const ACCENTS: AccentKey[]        = ["accent", "violet", "emerald"];

const A: Record<AccentKey, { border: string; badge: string; glow: string; text: string }> = {
  accent:  { border: "border-accent/20 hover:border-accent/50",          badge: "bg-accent/10 text-accent",          glow: "hover:shadow-[0_0_40px_-6px_rgba(6,247,227,0.22)]",    text: "text-accent" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/50",  badge: "bg-violet-500/10 text-violet-400",  glow: "hover:shadow-[0_0_40px_-6px_rgba(167,139,250,0.22)]",  text: "text-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/50",badge: "bg-emerald-500/10 text-emerald-400",glow: "hover:shadow-[0_0_40px_-6px_rgba(52,211,153,0.22)]",   text: "text-emerald-400" },
};

const STEP_C: Record<AccentKey, { border: string; num: string; title: string }> = {
  accent:  { border: "border-accent/20",         num: "text-accent/18",         title: "text-accent" },
  violet:  { border: "border-violet-400/20",      num: "text-violet-400/18",     title: "text-violet-400" },
  emerald: { border: "border-emerald-400/20",     num: "text-emerald-400/18",    title: "text-emerald-400" },
};

/* ─── Motion variants ─────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── 3-D Tilt card ───────────────────────────────────────────────────────────── */
function TiltCard({ children, className = "", intensity = 7 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [ intensity, -intensity]), { stiffness: 320, damping: 32 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity,  intensity]), { stiffness: 320, damping: 32 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Spotlight card (cursor glow) ───────────────────────────────────────────── */
function SpotlightCard({ children, className = "", color = "rgba(6,247,227,0.08)" }: { children: React.ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, show: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, show: true });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(p => ({ ...p, show: false }))}
      className={`relative overflow-hidden ${className}`}
    >
      {pos.show && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${color} 0%, transparent 55%)` }}
        />
      )}
      {children}
    </div>
  );
}

/* ─── CountUp for stats bar ───────────────────────────────────────────────────── */
function CountUp({ to }: { to: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num    = parseFloat(to.replace(/[^\d.]/g, "")) || 0;
  const suffix = to.replace(/[\d.]/g, "");
  const [val, setVal] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    let start: number | null = null;
    const dur = 1800;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(ease * num));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Section heading helper ─────────────────────────────────────────────────── */
function SectionHead({ badge, badgeColor, title, desc, center = false }: {
  badge: string; badgeColor: string; title: React.ReactNode; desc?: string; center?: boolean;
}) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-70px" }} variants={stagger} className={center ? "text-center" : ""}>
      <motion.p variants={fadeUp} className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${badgeColor}`}>{badge}</motion.p>
      <motion.h2 variants={fadeUp} className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{title}</motion.h2>
      {desc && (
        <motion.p variants={fadeUp} className={`mt-4 text-[15px] leading-relaxed text-muted ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>{desc}</motion.p>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════ */
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setSending(true);
    const fd   = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    const { email, phone, name } = data as Record<string, string>;
    if (!name || name.length < 2)                                { setFormError("Ismingizni to'liq kiriting (kamida 2 harf)"); setSending(false); return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))     { setFormError("Email manzili noto'g'ri formatda"); setSending(false); return; }
    if (phone && !/^[\+\d\s\-\(\)]{7,20}$/.test(phone))         { setFormError("Telefon raqam noto'g'ri formatda"); setSending(false); return; }
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

      {/* ══ HERO ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,247,227,0.1)_0%,transparent_60%)]" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
          <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute right-1/4 top-1/2 h-56 w-56 rounded-full bg-accent/12 blur-[80px]" />
          <div className="absolute inset-0 hero-grid opacity-[0.38]" style={{ backgroundSize: "60px 60px" }} />
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
            className="absolute left-0 top-[42%] h-px w-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div variants={scaleIn} className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-accent" />
            <Sparkles className="h-3 w-3" />
            {t.hero.badge}
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            <span className="gradient-text">{t.hero.title.split(" IT ")[0]} IT </span>
            {t.hero.title.split(" IT ")[1]}
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-muted">
            {t.hero.desc}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/apply/startup" className="btn-ripple group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_55px_-5px_rgba(6,247,227,0.6)] sm:w-auto">
                {t.hero.apply}
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/#contact" className="w-full rounded-full border border-border bg-card px-8 py-3.5 text-center text-[13px] font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card-hover sm:w-auto">
                {t.hero.reach}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats bar with CountUp */}
        <motion.div initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-20 w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.label} className="group flex flex-col items-center justify-center px-4 py-7 text-center last:col-span-2 transition-all duration-300 hover:bg-card-hover sm:last:col-span-1">
                <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                  <CountUp to={s.value} />
                </span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ INFRASTRUCTURE ════════════════════════════════════════════════════════ */}
      <section id="about" className="relative border-t border-border-subtle px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(167,139,250,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 dot-grid opacity-[0.22]" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <SectionHead badge={t.infra.badge} badgeColor="text-accent" title={t.infra.title} desc={t.infra.desc} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.infra.items.map((item, i) => {
              const c = A[INFRA_COLORS[i]];
              const Icon = ICONS[i];
              return (
                <motion.div key={i} variants={fadeUp}>
                  <TiltCard intensity={6} className={`hover-gradient-border group h-full rounded-2xl border bg-card p-6 transition-all duration-400 ${c.border} ${c.glow}`}>
                    <motion.div whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }} transition={{ duration: 0.4 }}
                      className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${c.badge} border-current/20`}>
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <h3 className="text-[15px] font-bold">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ STARTUPS ══════════════════════════════════════════════════════════════ */}
      <section id="startups" className="relative border-t border-border-subtle bg-background px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_50%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />
          <motion.div animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
            className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent/30 via-violet-400/20 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <SectionHead badge={t.startups.badge} badgeColor="text-violet-400" title={t.startups.title} desc={t.startups.desc} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid gap-5 md:grid-cols-3">
            {t.startups.items.map((s, i) => {
              const accent = STARTUP_ACCENTS[i];
              const c = A[accent];
              const spotColor = accent === "accent" ? "rgba(6,247,227,0.07)" : accent === "violet" ? "rgba(167,139,250,0.07)" : "rgba(52,211,153,0.07)";
              return (
                <motion.div key={i} variants={fadeUp}>
                  <SpotlightCard color={spotColor} className={`hover-gradient-border flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 ${c.border} ${c.glow}`}>
                    <motion.span whileHover={{ scale: 1.05 }} className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${c.badge} border-current/20`}>
                      <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        className={`h-1.5 w-1.5 rounded-full ${c.text.replace("text-", "bg-")}`} />
                      {s.sector}
                    </motion.span>
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
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════════ */}
      <section id="how" className="relative border-t border-border-subtle px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(167,139,250,0.05)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <SectionHead badge={t.how.badge} badgeColor="text-violet-400" title={t.how.title} desc={t.how.desc} center />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.how.steps.map((item, i) => {
              const c = STEP_C[STEP_COLORS[i]];
              return (
                <motion.div key={item.step} variants={fadeUp} whileHover={{ y: -8, transition: { duration: 0.25 } }} className={`relative rounded-2xl border bg-card p-6 ${c.border}`}>
                  {i < 3 && (
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                      className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 origin-left bg-gradient-to-r from-border to-transparent lg:block" />
                  )}
                  <span className={`block text-[4.5rem] font-bold leading-none ${c.num}`}>{item.step}</span>
                  <h3 className={`mt-2 text-[16px] font-bold ${c.title}`}>{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/apply/startup" className="btn-ripple group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-black transition-all hover:shadow-[0_0_45px_-5px_rgba(6,247,227,0.55)]">
                {t.how.applyBtn} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/apply/investor" className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 px-8 py-3.5 text-[13px] font-semibold text-violet-400 transition-all hover:border-violet-400/55 hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.25)]">
                {t.how.investorBtn}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/education" className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-[13px] font-semibold text-muted transition-all hover:text-foreground">
                {t.how.educationBtn}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ NEWS ══════════════════════════════════════════════════════════════════ */}
      <section id="news" className="relative border-t border-border-subtle bg-card px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_60%,rgba(52,211,153,0.04)_0%,transparent_70%)]" />
          <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
            className="absolute left-0 bottom-[30%] h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16">
            <SectionHead badge={t.news.badge} badgeColor="text-emerald-400" title={t.news.title} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item, idx) => {
              const accent = ACCENTS[idx % 3];
              const c = A[accent];
              const spotColor = accent === "accent" ? "rgba(6,247,227,0.08)" : accent === "violet" ? "rgba(167,139,250,0.08)" : "rgba(52,211,153,0.08)";
              return (
                <motion.div key={item.id} variants={fadeUp}>
                  <SpotlightCard color={spotColor} className={`hover-gradient-border group flex h-full flex-col rounded-2xl border bg-background p-6 transition-all duration-500 hover:-translate-y-1.5 ${c.border} ${c.glow}`}>
                    <div className="flex items-center justify-between gap-3">
                      <motion.span whileHover={{ scale: 1.06 }} className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.badge} border-current/20`}>
                        {item.category}
                      </motion.span>
                      <time className="text-[11px] text-muted">{item.published_at?.slice(0, 10) || ""}</time>
                    </div>
                    <h3 className="mt-4 text-[15px] font-bold leading-snug">{item.title}</h3>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{item.summary}</p>
                    <motion.div className={`mt-5 flex items-center gap-1 text-[12px] font-semibold ${c.text}`} whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
                      {t.news.more} <ChevronRight className="h-3 w-3" />
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative border-t border-border-subtle px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(6,247,227,0.05)_0%,transparent_70%)]" />
          <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="mb-14 text-center">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.contact.badge}</motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">{t.contact.title}</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{t.contact.desc}</motion.p>
            <motion.div variants={fadeUp} className="mx-auto mt-6 flex flex-wrap justify-center gap-6 text-[13px] text-muted">
              {[
                { icon: "📍", text: "Istiqlol ko'chasi 15, Uychi, Namangan" },
                { icon: "📞", text: "+998 79 224 00 00" },
                { icon: "✉",  text: "info@uychi.uz" },
              ].map((c, i) => (
                <motion.span key={i} whileHover={{ scale: 1.04 }} className="flex cursor-default items-center gap-1.5">
                  <span className="text-accent">{c.icon}</span> {c.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-400">✓</motion.div>
              <h3 className="text-xl font-bold">{t.contact.successTitle}</h3>
              <p className="mt-2 text-[14px] text-muted">{t.contact.successDesc}</p>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
              {([
                { label: t.contact.fields.name,    name: "name",    type: "text",  placeholder: t.contact.fields.namePh,    span: 1 },
                { label: t.contact.fields.company, name: "company", type: "text",  placeholder: t.contact.fields.companyPh, span: 1 },
                { label: t.contact.fields.country, name: "country", type: "text",  placeholder: t.contact.fields.countryPh, span: 1 },
                { label: t.contact.fields.email,   name: "email",   type: "email", placeholder: t.contact.fields.emailPh,   span: 1 },
                { label: t.contact.fields.phone,   name: "phone",   type: "tel",   placeholder: t.contact.fields.phonePh,   span: 2 },
              ] as const).map((f) => (
                <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                  <label htmlFor={`c-${f.name}`} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                  <input id={`c-${f.name}`} name={f.name} type={f.type} placeholder={f.placeholder} required
                    className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-accent/40 focus:bg-card-hover focus:shadow-[0_0_20px_-4px_rgba(6,247,227,0.2)]" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.contact.fields.message}</label>
                <textarea id="c-message" name="message" rows={5} placeholder={t.contact.fields.messagePh} required
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-accent/40 focus:bg-card-hover focus:shadow-[0_0_20px_-4px_rgba(6,247,227,0.2)]" />
              </div>
              {formError && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="sm:col-span-2">
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-[13px] text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
                  </div>
                </motion.div>
              )}
              <div className="sm:col-span-2">
                <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn-ripple group w-full rounded-full bg-accent py-4 text-[14px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_45px_-5px_rgba(6,247,227,0.55)] disabled:opacity-60">
                  {sending ? t.contact.sending : (
                    <>{t.contact.send} <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="ml-2 inline-block">→</motion.span></>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
