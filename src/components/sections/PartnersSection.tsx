"use client";

import { motion } from "framer-motion";
import { useApi } from "@/lib/api";

type Partner = { id: number; name: string; country: string; category: string; tier: string };

const CATEGORY_BADGE: Record<string, string> = {
  "Government":   "border-accent/15 text-accent/60",
  "Corporate":    "border-emerald-400/15 text-emerald-400/60",
  "University":   "border-violet-400/15 text-violet-400/60",
  "Accelerator":  "border-amber-400/15 text-amber-400/60",
  "International":"border-pink-400/15 text-pink-400/60",
  "Tech Park":    "border-blue-400/15 text-blue-400/60",
};

const CATEGORY_LABEL: Record<string, string> = {
  "Government":   "Davlat",
  "Corporate":    "Korporatsiya",
  "University":   "Universitet",
  "Accelerator":  "Akselerator",
  "International":"Xalqaro",
  "Tech Park":    "Tech Park",
};

function PartnerLogo({ name, category }: { name: string; category: string }) {
  const badge = CATEGORY_BADGE[category] || "border-zinc-500/15 text-muted/60";
  const label = CATEGORY_LABEL[category] || category;
  return (
    <div className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-5 py-3 transition-all duration-300 hover:border-border hover:bg-card-hover">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-foreground/8 text-[10px] font-bold text-foreground">
        {name.charAt(0)}
      </div>
      <span className="whitespace-nowrap text-[13px] font-semibold text-muted transition-colors group-hover:text-foreground">
        {name}
      </span>
      <span className={`hidden rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:block ${badge}`}>
        {label}
      </span>
    </div>
  );
}

function Marquee({ items, reverse = false, speed = 35 }: { items: Partner[]; reverse?: boolean; speed?: number }) {
  if (items.length === 0) return null;
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
      <div className="flex gap-3 whitespace-nowrap" style={{ animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}` }}>
        {[...items, ...items].map((p, i) => (
          <PartnerLogo key={`${p.id}-${i}`} name={p.name} category={p.category} />
        ))}
      </div>
    </div>
  );
}

export function PartnersSection() {
  const { data: partners, loading } = useApi<Partner[]>("/partners/partners/", []);
  const row1 = partners.slice(0, Math.ceil(partners.length / 2));
  const row2 = partners.slice(Math.ceil(partners.length / 2));

  return (
    <section className="relative overflow-hidden border-t border-border-subtle bg-background px-0 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_50%,rgba(167,139,250,0.08)_0%,transparent_70%)]" />
      <div className="relative mx-auto mb-12 max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Ishonchli Hamkorlar</p>
          <h2 className="mt-2.5 text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-tight text-foreground">Global Hamkorlar Tarmog&apos;i</h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
            Yetakchi texnologiya kompaniyalari, davlat idoralari va xalqaro tashkilotlar bilan mustahkam hamkorlik.
          </p>
        </motion.div>
      </div>

      {loading ? (
        <div className="px-6 py-8 text-center text-[13px] text-muted">Yuklanmoqda...</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-3">
          <Marquee items={row1} speed={40} />
          <Marquee items={row2} reverse speed={32} />
        </motion.div>
      )}

      <div className="relative mx-auto mt-12 max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-muted">
          {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${CATEGORY_BADGE[key] || ""}`}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
