"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useApi } from "@/lib/api";

type StatItem = { id: number; label: string; value: string; suffix: string; order: number };

const ACCENTS = ["cyan", "violet", "emerald", "cyan", "violet"] as const;
type AccentKey = "cyan" | "violet" | "emerald";

const accentClasses: Record<AccentKey, { num: string; bg: string; border: string; glow: string }> = {
  cyan:    { num: "text-accent",    bg: "bg-accent/5",    border: "border-accent/15",    glow: "hover:shadow-[0_0_30px_-8px_rgba(6,247,227,0.3)]" },
  violet:  { num: "text-violet-400",  bg: "bg-violet-400/5",  border: "border-violet-400/15",  glow: "hover:shadow-[0_0_30px_-8px_rgba(167,139,250,0.3)]" },
  emerald: { num: "text-emerald-400", bg: "bg-emerald-400/5", border: "border-emerald-400/15", glow: "hover:shadow-[0_0_30px_-8px_rgba(52,211,153,0.3)]" },
};

function CountUp({ to, suffix, active }: { to: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(0, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(v) { setCount(Math.round(v)); },
    });
    return () => controls.stop();
  }, [active, to]);
  const isThousands = to >= 1000;
  const display = isThousands
    ? count >= 1000 ? `${(count / 1000).toFixed(1).replace(".0", "")}K` : count.toString()
    : count.toString();
  return <span>{display}{suffix}</span>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: stats, loading } = useApi<StatItem[]>("/core/stats/", []);

  const sorted = [...stats].sort((a, b) => a.order - b.order);

  return (
    <section className="relative border-t border-border-subtle bg-card px-6 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">/ Jonli Statistika</p>
          <h2 className="mt-2.5 text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-tight text-foreground">Uychi IT Hub Raqamlarda</h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-muted">
            Uychi AI & IT Hub ekotizimidagi haqiqiy ko&apos;rsatkichlar.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-background" />
              ))
            : sorted.map((stat, i) => {
                const accent = ACCENTS[i % ACCENTS.length] as AccentKey;
                const c = accentClasses[accent];
                const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, "")) || 0;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${c.bg} ${c.border} ${c.glow}`}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />
                    <div className={`text-2xl font-bold tracking-tight md:text-3xl ${c.num}`}>
                      <CountUp to={numericValue} suffix={stat.suffix} active={inView} />
                    </div>
                    <div className="mt-2 text-[13px] font-semibold text-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
