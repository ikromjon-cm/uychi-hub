"use client";

import { useState } from "react";
import React from "react";
import { Search, Plus, Trash2, Download, Image, Film, File, LayoutGrid, List } from "lucide-react";
import { useApi, apiDelete } from "@/lib/api";

interface MediaItem {
  id: number;
  name: string;
  media_type: "image" | "video" | "document" | "audio" | "vector";
  size: string;
  file: string;
  dimensions?: string;
  alt_text?: string;
  in_use?: boolean;
  uploaded_at: string;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  image: Image, video: Film, document: File, audio: File, vector: File,
};
const typeColors: Record<string, string> = {
  image:    "bg-blue-400/10 text-blue-400 border-blue-400/20",
  video:    "bg-violet-400/10 text-violet-400 border-violet-400/20",
  document: "bg-orange-400/10 text-orange-400 border-orange-400/20",
  audio:    "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  vector:   "bg-accent/10 text-accent border-accent/20",
};

const MOCK_MEDIA: MediaItem[] = [
  { id: 1, name: "hackathon-2026.jpg", media_type: "image", size: "2.4 MB", file: "#", uploaded_at: "2026-07-15" },
  { id: 2, name: "uychi-hub-intro.mp4", media_type: "video", size: "45.2 MB", file: "#", uploaded_at: "2026-05-01" },
  { id: 3, name: "annual-report-2025.pdf", media_type: "document", size: "3.1 MB", file: "#", uploaded_at: "2026-01-10" },
];

export default function AdminMedia() {
  const { data: rawItems, loading } = useApi<MediaItem[]>("/media/media-items/", [], MOCK_MEDIA);
  const [deleted, setDeleted] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const items = rawItems.filter(m => !deleted.has(m.id));
  const filtered = items.filter(m => {
    if (typeFilter !== "all" && m.media_type !== typeFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function handleDelete(id: number) {
    setDeleted(prev => new Set([...prev, id]));
    try { await apiDelete(`/media/media-items/${id}/`); } catch { /* silent */ }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="mt-1 text-[13px] text-muted">{loading ? "..." : items.length} assets total</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-accent-dark">
          <Plus className="h-4 w-4" /> Upload
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Images",    value: loading ? "..." : items.filter(m => m.media_type === "image").length.toString(),    color: "text-blue-400" },
          { label: "Videos",    value: loading ? "..." : items.filter(m => m.media_type === "video").length.toString(),    color: "text-violet-400" },
          { label: "Documents", value: loading ? "..." : items.filter(m => m.media_type === "document").length.toString(), color: "text-orange-400" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted" />
            <input type="text" placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
          </div>
          <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
            {["all", "image", "video", "document"].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-medium capitalize transition-colors ${typeFilter === t ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
          <button onClick={() => setView("grid")} className={`rounded-lg p-1.5 transition-colors ${view === "grid" ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setView("list")} className={`rounded-lg p-1.5 transition-colors ${view === "list" ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-52 animate-pulse rounded-2xl border border-border bg-card" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-card px-6 py-10 text-center text-[13px] text-muted">
          {items.length === 0 ? "Hali media fayl yuklanmagan." : "Media topilmadi."}
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map(m => {
            const Icon = typeIcons[m.media_type] || File;
            return (
              <div key={m.id} className="group relative rounded-2xl border border-border-subtle bg-card p-4 transition-all hover:border-border">
                <div className={`flex h-32 items-center justify-center rounded-xl border ${typeColors[m.media_type] || "bg-card-hover text-muted border-border"} bg-card`}>
                  <Icon className="h-10 w-10 opacity-50" />
                </div>
                <div className="mt-3">
                  <p className="truncate text-[13px] font-medium text-foreground" title={m.name}>{m.name}</p>
                  <p className="text-[12px] text-muted">{m.size || "—"} · {m.media_type}</p>
                  <p className="text-[11px] text-muted">{m.uploaded_at?.slice(0, 10)}</p>
                </div>
                <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {m.file && m.file !== "#" && (
                    <a href={m.file} target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Download className="h-3.5 w-3.5" /></a>
                  )}
                  <button onClick={() => handleDelete(m.id)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map(m => (
                <tr key={m.id} className="group text-[13px] transition-colors hover:bg-card">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${typeColors[m.media_type] || "bg-card-hover text-muted border-border"}`}>
                        {React.createElement(typeIcons[m.media_type] || File, { className: "h-4 w-4" })}
                      </div>
                      <span className="font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-muted">{m.media_type}</td>
                  <td className="px-6 py-4 text-muted">{m.size || "—"}</td>
                  <td className="px-6 py-4 text-muted">{m.uploaded_at?.slice(0, 10)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {m.file && m.file !== "#" && (
                        <a href={m.file} target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Download className="h-3.5 w-3.5" /></a>
                      )}
                      <button onClick={() => handleDelete(m.id)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
