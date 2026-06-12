"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";

type Partner = { id: number; name: string; country: string; category: string; tier: string; website: string; logo: string };

const CATEGORY_COLORS: Record<string, string> = {
  "Government":    "text-cyan-400 border-cyan-500/20 bg-cyan-500/8",
  "University":    "text-violet-400 border-violet-400/20 bg-violet-500/8",
  "International": "text-amber-400 border-amber-400/20 bg-amber-500/8",
  "Corporate":     "text-emerald-400 border-emerald-400/20 bg-emerald-500/8",
  "Accelerator":   "text-pink-400 border-pink-400/20 bg-pink-500/8",
  "Tech Park":     "text-blue-400 border-blue-400/20 bg-blue-500/8",
};

const CATEGORY_LABELS: Record<string, string> = {
  "Government":    "Davlat",
  "University":    "Universitetlar",
  "International": "Xalqaro",
  "Corporate":     "Korporatsiya",
  "Accelerator":   "Akselerator",
  "Tech Park":     "Tech Park",
};

const COUNTRY_FLAGS: Record<string, string> = {
  "O'zbekiston": "🇺🇿", "AQSh": "🇺🇸", "Qozog'iston": "🇰🇿", "Rossiya": "🇷🇺",
  "Filippin": "🇵🇭", "Janubiy Koreya": "🇰🇷", "Xitoy": "🇨🇳", "Singapur": "🇸🇬",
  "Malayziya": "🇲🇾", "Germaniya": "🇩🇪", "Yaponiya": "🇯🇵",
};

const FILTER_OPTIONS = [
  { key: "all", label: "Barchasi" },
  { key: "Government", label: "Davlat" },
  { key: "University", label: "Universitetlar" },
  { key: "International", label: "Xalqaro" },
  { key: "Corporate", label: "Korporatsiya" },
  { key: "Accelerator", label: "Akselerator" },
];

export default function PartnersPage() {
  const { data: partners, loading } = useApi<Partner[]>("/partners/partners/", []);
  const [filter, setFilter] = useState("all");

  const filtered = partners.filter(p => filter === "all" || p.category === filter);
  const countByCategory = Object.fromEntries(
    FILTER_OPTIONS.slice(1).map(f => [f.key, partners.filter(p => p.category === f.key).length])
  );

  return (
    <div className="min-h-screen bg-[#030303]">
      <section className="relative border-b border-white/4 px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Hamkorlar Tarmog&apos;i</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
            Global Hamkorlik,<br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Mahalliy Ta&apos;sir</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Uychi IT Hub — hukumat idoralari, yetakchi universitetlar, xalqaro tashkilotlar va texnologiya kompaniyalari bilan mustahkam hamkorlikda ishlaydi.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {FILTER_OPTIONS.slice(1).map((cat) => (
              <div key={cat.key} className="rounded-xl border border-white/5 bg-[#0a0a0a] px-5 py-3">
                <p className="text-xl font-bold text-white">{loading ? "—" : countByCategory[cat.key] || 0}</p>
                <p className="mt-0.5 text-[11px] font-medium text-zinc-600">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition-all ${filter === f.key ? "border-violet-400/40 bg-violet-500/10 text-violet-400" : "border-white/8 bg-white/3 text-zinc-500 hover:text-zinc-300"}`}>
              {f.label}
              {f.key !== "all" && <span className="ml-1.5 opacity-60">{countByCategory[f.key] || 0}</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl border border-white/5 bg-[#0a0a0a]" />)}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((partner) => {
              const colorClass = CATEGORY_COLORS[partner.category] || "text-zinc-400 border-zinc-400/20 bg-zinc-500/8";
              return (
                <div key={partner.id} className="group flex flex-col rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-lg font-bold text-white">
                    {partner.name.charAt(0)}
                  </div>
                  <div className="mt-4 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-bold leading-snug text-white">{partner.name}</h3>
                      <span className="mt-0.5 shrink-0 text-base">{COUNTRY_FLAGS[partner.country] || "🌍"}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-zinc-600">{partner.country}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${colorClass}`}>
                      {CATEGORY_LABELS[partner.category] || partner.category}
                    </span>
                    {partner.website ? (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-[11px] text-zinc-600 hover:text-violet-400">Sayt →</a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-[#0d0a1a] to-[#0a0a0a] p-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Hamkorlik Taklifi</p>
          <h3 className="mt-3 text-3xl font-bold text-white">Hamkorlarimiz Qatoriga Qo&apos;shiling</h3>
          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-zinc-500">
            Uychi IT Hub bilan hamkorlik orqali Namangan viloyatidagi 24+ startap va IT kompaniyalarga bevosita kirish imkoniyatiga ega bo&apos;ling.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:partners@uychi.uz" className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-8 py-3.5 text-[14px] font-bold text-black hover:bg-violet-300">
              Hamkorlik Arizasi
            </a>
            <a href="/schedule" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-[14px] font-semibold text-zinc-400 hover:border-white/20 hover:text-white">
              Uchrashuv Belgilash
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
