"use client";

import { useState } from "react";

type MediaCategory = "all" | "events" | "startup" | "team" | "infra" | "drone";

const CATEGORY_LABELS: Record<MediaCategory, string> = {
  all: "Barchasi",
  events: "Tadbirlar",
  startup: "Startaplar",
  team: "Jamoa",
  infra: "Infratuzilma",
  drone: "Dron suratlar",
};

interface PhotoItem {
  id: string;
  title: string;
  category: Exclude<MediaCategory, "all">;
  date: string;
  photographer: string;
  accent: "cyan" | "violet" | "emerald";
  featured?: boolean;
}

const PHOTOS: PhotoItem[] = [
  { id: "1",  title: "Uychi Hackathon 2024 — Ochilish",            category: "events",  date: "2024-11-15", photographer: "Uychi IT Hub Media", accent: "cyan",    featured: true },
  { id: "2",  title: "AgroSmart AI demo namoyishi",                category: "startup", date: "2024-10-22", photographer: "Dilnoza Karimova",   accent: "emerald"              },
  { id: "3",  title: "IT Hub bino — tashqi ko'rinish",             category: "infra",   date: "2024-09-10", photographer: "Uychi IT Hub Media", accent: "cyan"                 },
  { id: "4",  title: "Google mentorlar bilan uchrashuv",           category: "events",  date: "2024-08-05", photographer: "Sarvar Toshmatov",   accent: "violet"               },
  { id: "5",  title: "EduCore dasturchi jamoasi",                  category: "startup", date: "2024-07-18", photographer: "Nilufar Yusupova",   accent: "violet"               },
  { id: "6",  title: "Uychi tumani aerosuratlari",                 category: "drone",   date: "2024-06-30", photographer: "DJI Pro UZ",         accent: "cyan",    featured: true },
  { id: "7",  title: "Bootcamp ishtirokchilari — 3-kun",           category: "events",  date: "2024-05-20", photographer: "Uychi IT Hub Media", accent: "emerald"              },
  { id: "8",  title: "Texnik laboratoriya jihozlari",              category: "infra",   date: "2024-04-15", photographer: "Aziz Nishonov",      accent: "cyan"                 },
  { id: "9",  title: "Jamoa bilan dam olish kuni",                 category: "team",    date: "2024-03-22", photographer: "Uychi IT Hub Media", accent: "violet"               },
  { id: "10", title: "NamLogist logistika texnologiyalari",        category: "startup", date: "2024-02-11", photographer: "Husan Mirzayev",     accent: "emerald"              },
  { id: "11", title: "Uychi IT Hub — dron panoramasi",            category: "drone",   date: "2024-01-28", photographer: "DJI Pro UZ",         accent: "cyan"                 },
  { id: "12", title: "IT Konferentsiya 2023 — panel muhokamasi",   category: "events",  date: "2023-12-14", photographer: "Sarvar Toshmatov",   accent: "violet"               },
  { id: "13", title: "Marketing jamoa fotosessiyasi",              category: "team",    date: "2023-11-08", photographer: "Uychi IT Hub Media", accent: "emerald"              },
  { id: "14", title: "Coworking zone — yangi jihozlar",           category: "infra",   date: "2023-10-01", photographer: "Aziz Nishonov",      accent: "violet"               },
  { id: "15", title: "TextileAI — to'qimachilik fabrikalari safari", category: "startup", date: "2023-09-17", photographer: "Dilnoza Karimova", accent: "emerald"             },
  { id: "16", title: "Uychi—Namangan yo'li aerosuratlari",         category: "drone",   date: "2023-08-05", photographer: "DJI Pro UZ",         accent: "cyan"                 },
];

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  date: string;
  thumb: string;
  accent: "cyan" | "violet" | "emerald";
}

const VIDEOS: VideoItem[] = [
  { id: "v1", title: "Uychi IT Hub — Tanishuv Video",         duration: "4:32", views: "12.4K", date: "2024-10-01", thumb: "🏢", accent: "cyan" },
  { id: "v2", title: "Hackathon 2024 — To'liq Repportaj",     duration: "18:15", views: "8.7K", date: "2024-11-20", thumb: "⚡", accent: "violet" },
  { id: "v3", title: "AgroSmart — Startap Tarixi",            duration: "7:48", views: "5.2K", date: "2024-09-15", thumb: "🌱", accent: "emerald" },
  { id: "v4", title: "Dron: Uychi Tumani 2024",               duration: "3:22", views: "21.1K", date: "2024-06-30", thumb: "🚁", accent: "cyan" },
  { id: "v5", title: "Google Mentorlik Dasturi",              duration: "12:05", views: "4.8K", date: "2024-08-10", thumb: "🔍", accent: "violet" },
  { id: "v6", title: "EduCore: Ta'lim Platformasi Demo",      duration: "6:17", views: "3.9K", date: "2024-07-22", thumb: "📚", accent: "emerald" },
];

const A = {
  cyan:    { bg: "bg-accent/10",   text: "text-accent",    border: "border-accent/20" },
  violet:  { bg: "bg-violet-500/10", text: "text-violet-400",  border: "border-violet-400/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-400/20" },
};

export default function MediaPage() {
  const [photoFilter, setPhotoFilter] = useState<MediaCategory>("all");
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const filteredPhotos = PHOTOS.filter(
    (p) => photoFilter === "all" || p.category === photoFilter
  );

  const featuredPhoto = PHOTOS.find((p) => p.featured && (photoFilter === "all" || p.category === photoFilter));
  const gridPhotos = filteredPhotos.filter((p) => !p.featured || p !== featuredPhoto);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.05)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Media Galereya</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Uychi IT Hub
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Ko&apos;rgazmasi
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Tadbirlar, startaplar, infratuzilma va Uychi IT ekotizimidan foto va video materiallar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Jami rasmlar", value: String(PHOTOS.length), color: "text-violet-400" },
              { label: "Videolar", value: String(VIDEOS.length), color: "text-accent" },
              { label: "Dron suratlar", value: String(PHOTOS.filter((p) => p.category === "drone").length), color: "text-emerald-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card px-5 py-3 text-center">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[88px] z-30 border-b border-border-subtle bg-background/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1">
            {(["photos", "videos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-4 text-[13px] font-semibold transition-colors ${activeTab === tab ? "text-violet-400" : "text-muted hover:text-foreground"}`}
              >
                {tab === "photos" ? "📷 Rasmlar" : "🎬 Videolar"}
                {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400 rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {activeTab === "photos" && (
          <div>
            {/* Category filter */}
            <div className="mb-8 flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_LABELS) as MediaCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPhotoFilter(cat)}
                  className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition-all ${photoFilter === cat ? "border-violet-400/40 bg-violet-500/10 text-violet-400" : "border-border bg-card text-muted hover:text-foreground"}`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Featured photo */}
            {featuredPhoto && (
              <div className="mb-5 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex h-72 items-center justify-center bg-gradient-to-br from-background via-background to-card">
                  <div className="text-center">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl ${A[featuredPhoto.accent].border} ${A[featuredPhoto.accent].bg}`}>
                      📸
                    </div>
                    <p className={`mt-3 text-sm font-semibold ${A[featuredPhoto.accent].text}`}>Asosiy rasm</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-foreground">{featuredPhoto.title}</h3>
                      <p className="mt-1 text-[12px] text-muted">{featuredPhoto.photographer} · {featuredPhoto.date}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-bold ${A[featuredPhoto.accent].border} ${A[featuredPhoto.accent].bg} ${A[featuredPhoto.accent].text}`}>
                      {CATEGORY_LABELS[featuredPhoto.category]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Photo grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {gridPhotos.map((photo) => {
                const c = A[photo.accent];
                return (
                  <div key={photo.id} className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border">
                    {/* Photo placeholder */}
                    <div className={`flex h-40 items-center justify-center ${c.bg}`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl`}>
                        {photo.category === "drone" ? "🚁" :
                         photo.category === "events" ? "🎉" :
                         photo.category === "startup" ? "🚀" :
                         photo.category === "team" ? "👥" : "🏢"}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[13px] font-semibold leading-snug text-foreground">{photo.title}</p>
                      <p className="mt-1 text-[11px] text-muted">{photo.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {VIDEOS.map((video) => {
              const c = A[video.accent];
              return (
                <div key={video.id} className={`group cursor-pointer overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-0.5 ${c.border}`}>
                  {/* Video thumbnail placeholder */}
                  <div className={`relative flex h-48 items-center justify-center ${c.bg}`}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card text-3xl backdrop-blur-sm transition-transform group-hover:scale-110">
                      {video.thumb}
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black">
                        <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Duration badge */}
                    <span className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2 py-0.5 text-[11px] font-bold text-foreground backdrop-blur-sm">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[14px] font-bold leading-snug text-foreground">{video.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[11px] text-muted">{video.date}</p>
                      <p className={`text-[11px] font-semibold ${c.text}`}>{video.views} ko&apos;rishlar</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Press kit CTA */}
        <div className="mt-16 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-background to-card p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">/ Press Kit</p>
              <h3 className="mt-1 text-xl font-bold text-foreground">Media Materiallar Paketi</h3>
              <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-muted">
                Logotiplar, brendbuk, press-relizlar va yuqori sifatli rasmlar to&apos;plamini yuklab oling.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 text-[13px] font-bold text-violet-400 transition-all hover:bg-violet-500/15 whitespace-nowrap">
                Press Kit (ZIP)
              </button>
              <button className="rounded-xl border border-border px-6 py-3 text-[13px] font-semibold text-muted transition-all hover:border-border hover:text-foreground whitespace-nowrap">
                Media So&apos;rovi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
