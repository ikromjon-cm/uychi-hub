"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useApi } from "@/lib/api";
import { staggerContainer, fadeUp } from "@/components/ui/animated-section";

type HStartup = {
  id: number;
  sector: string;
  tagline: string;
  problem: string;
  solution: string;
  tech_stack: string;
  accent: string;
  primary_metric_label: string;
  primary_metric_value: string;
  secondary_metric_label: string;
  secondary_metric_value: string;
  order: number;
};

type AccentKey = "cyan" | "violet" | "emerald" | "accent";

const accentMap: Record<string, {
  border: string; badge: string; badgeDot: string;
  glow: string; tag: string; metricText: string; learnMore: string;
}> = {
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-500/45",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    badgeDot: "bg-cyan-400",
    glow: "hover:shadow-[0_0_50px_-10px_rgba(6,247,227,0.22)]",
    tag: "bg-cyan-400/8 text-cyan-400/80 border-cyan-400/12",
    metricText: "text-cyan-400",
    learnMore: "text-cyan-400 hover:text-cyan-300",
  },
  accent: {
    border: "border-cyan-500/20 hover:border-cyan-500/45",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    badgeDot: "bg-cyan-400",
    glow: "hover:shadow-[0_0_50px_-10px_rgba(6,247,227,0.22)]",
    tag: "bg-cyan-400/8 text-cyan-400/80 border-cyan-400/12",
    metricText: "text-cyan-400",
    learnMore: "text-cyan-400 hover:text-cyan-300",
  },
  violet: {
    border: "border-violet-400/20 hover:border-violet-400/45",
    badge: "bg-violet-500/10 text-violet-400 border-violet-400/20",
    badgeDot: "bg-violet-400",
    glow: "hover:shadow-[0_0_50px_-10px_rgba(167,139,250,0.22)]",
    tag: "bg-violet-400/8 text-violet-400/80 border-violet-400/12",
    metricText: "text-violet-400",
    learnMore: "text-violet-400 hover:text-violet-300",
  },
  emerald: {
    border: "border-emerald-400/20 hover:border-emerald-400/45",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20",
    badgeDot: "bg-emerald-400",
    glow: "hover:shadow-[0_0_50px_-10px_rgba(52,211,153,0.22)]",
    tag: "bg-emerald-400/8 text-emerald-400/80 border-emerald-400/12",
    metricText: "text-emerald-400",
    learnMore: "text-emerald-400 hover:text-emerald-300",
  },
};

function StartupCard({ startup, className = "" }: { startup: HStartup; className?: string }) {
  const c = accentMap[startup.accent] || accentMap.cyan;
  const techTags = startup.tech_stack.split(",").map(t => t.trim()).filter(Boolean);

  return (
    <motion.div
      variants={fadeUp}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#0a0a0a] p-6 transition-all duration-400 hover:-translate-y-1 ${c.border} ${c.glow} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.025),transparent_65%)]" />
      <div className="relative z-10 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${c.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.badgeDot}`} />
            {startup.sector}
          </span>
          <Link href="/startups" className={`flex items-center gap-1 text-[11px] font-semibold opacity-0 transition-all duration-200 group-hover:opacity-100 ${c.learnMore}`}>
            Batafsil <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-white leading-snug">{startup.tagline}</h3>
        </div>
        <div className="flex flex-1 flex-col gap-3 text-[13px]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">Muammo</span>
            <p className="mt-1.5 leading-relaxed text-zinc-400">{startup.problem}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">Yechim</span>
            <p className="mt-1.5 leading-relaxed text-zinc-400">{startup.solution}</p>
          </div>
        </div>
        <div className="mt-auto pt-4 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {techTags.map((tech) => (
              <span key={tech} className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium ${c.tag}`}>{tech}</span>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/4 bg-white/2 px-4 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-700">{startup.primary_metric_label}</p>
              <p className={`mt-0.5 text-lg font-bold ${c.metricText}`}>{startup.primary_metric_value}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-700">{startup.secondary_metric_label}</p>
              <p className="mt-0.5 text-[15px] font-bold text-zinc-300">{startup.secondary_metric_value}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StartupsSection() {
  const { data: startups, loading } = useApi<HStartup[]>("/core/startups/", []);
  const sorted = [...startups].sort((a, b) => a.order - b.order);

  return (
    <section id="startups" className="relative border-t border-white/4 bg-[#070707] px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_50%,rgba(6,247,227,0.035)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16 max-w-xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Tanlangan Startaplar</p>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">
            Uychi&apos;da yaratildi.<br />Dunyo uchun tayyor.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
            Rezident startaplar global muammolarga AI yechimlar taqdim etmoqda. Uychi tumanining innovatsion ekotizimidan uchta yo&apos;nalish.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-white/5 bg-[#0a0a0a]" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {sorted.map((s) => <StartupCard key={s.id} startup={s} />)}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Link href="/apply/startup" className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-6 py-2.5 text-[13px] font-semibold text-zinc-400 transition-all hover:border-white/15 hover:text-white">
            Inkubatorga ariza topshirish <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/apply/investor" className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 px-6 py-2.5 text-[13px] font-semibold text-violet-400 transition-all hover:border-violet-400/40">
            Investor kirish <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
