"use client";

import { useState } from "react";
import React from "react";
import { Search, Plus, Trash2, Download, Image, Film, File, LayoutGrid, List } from "lucide-react";

interface MediaFile {
  id: number; name: string; type: 'image' | 'video' | 'document';
  size: string; url: string; uploadedBy: string; uploadedAt: string;
  category: string; ext: string;
}

const MEDIA_FILES: MediaFile[] = [
  { id: 1, name: 'hackathon-2026-opening.jpg', type: 'image', size: '2.4 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2026-07-15', category: 'Events', ext: 'jpg' },
  { id: 2, name: 'agroSmart-demo-day.jpg', type: 'image', size: '1.8 MB', url: '#', uploadedBy: 'sardor@uychi.uz', uploadedAt: '2026-06-22', category: 'Startups', ext: 'jpg' },
  { id: 3, name: 'uychi-hub-intro.mp4', type: 'video', size: '45.2 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2026-05-01', category: 'Promo', ext: 'mp4' },
  { id: 4, name: 'annual-report-2025.pdf', type: 'document', size: '3.1 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2026-01-10', category: 'Reports', ext: 'pdf' },
  { id: 5, name: 'drone-uychi-panorama.mp4', type: 'video', size: '120.5 MB', url: '#', uploadedBy: 'sardor@uychi.uz', uploadedAt: '2025-06-30', category: 'Drone', ext: 'mp4' },
  { id: 6, name: 'logo-full-color.png', type: 'image', size: '0.4 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2025-01-15', category: 'Brand', ext: 'png' },
  { id: 7, name: 'bootcamp-day3.jpg', type: 'image', size: '3.2 MB', url: '#', uploadedBy: 'zulfiya@uychi.uz', uploadedAt: '2026-05-20', category: 'Events', ext: 'jpg' },
  { id: 8, name: 'investor-deck-2026.pdf', type: 'document', size: '5.7 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2026-03-01', category: 'Documents', ext: 'pdf' },
  { id: 9, name: 'educore-platform-demo.mp4', type: 'video', size: '28.3 MB', url: '#', uploadedBy: 'dilorom@educore.uz', uploadedAt: '2026-04-22', category: 'Startups', ext: 'mp4' },
  { id: 10, name: 'team-photo-2026.jpg', type: 'image', size: '4.1 MB', url: '#', uploadedBy: 'sardor@uychi.uz', uploadedAt: '2026-03-22', category: 'Team', ext: 'jpg' },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  image: Image,
  video: Film,
  document: File,
};

const typeColors: Record<string, string> = {
  image: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  video: "bg-violet-400/10 text-violet-400 border-violet-400/20",
  document: "bg-orange-400/10 text-orange-400 border-orange-400/20",
};

export default function AdminMedia() {
  const [items, setItems] = useState<MediaFile[]>(MEDIA_FILES);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = items.filter((m) => {
    if (typeFilter !== "all" && m.type !== typeFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function deleteItem(id: number) {
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="mt-1 text-[13px] text-zinc-600">{items.length} assets total</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-cyan-400">
          <Plus className="h-4 w-4" /> Upload
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Images", value: items.filter((m) => m.type === "image").length.toString(), color: "text-blue-400" },
          { label: "Videos", value: items.filter((m) => m.type === "video").length.toString(), color: "text-violet-400" },
          { label: "Documents", value: items.filter((m) => m.type === "document").length.toString(), color: "text-orange-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-zinc-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2">
            <Search className="h-4 w-4 text-zinc-600" />
            <input type="text" placeholder="Search assets..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600" />
          </div>
          <div className="flex gap-1 rounded-xl border border-white/6 bg-white/2 p-1">
            {["all", "image", "video", "document"].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`rounded-lg px-3 py-1.5 text-[12px] font-medium capitalize transition-colors ${typeFilter === t ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-1 rounded-xl border border-white/6 bg-white/2 p-1">
          <button onClick={() => setView("grid")} className={`rounded-lg p-1.5 transition-colors ${view === "grid" ? "bg-white/10 text-white" : "text-zinc-600 hover:text-white"}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setView("list")} className={`rounded-lg p-1.5 transition-colors ${view === "list" ? "bg-white/10 text-white" : "text-zinc-600 hover:text-white"}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => {
            const Icon = typeIcons[m.type] || File;
            return (
              <div key={m.id} className="group relative rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 transition-all hover:border-white/10">
                <div className={`flex h-32 items-center justify-center rounded-xl border ${typeColors[m.type] || "bg-zinc-400/10 text-zinc-400 border-zinc-400/20"} bg-white/2`}>
                  <Icon className="h-10 w-10 opacity-50" />
                </div>
                <div className="mt-3">
                  <p className="truncate text-[13px] font-medium text-white" title={m.name}>{m.name}</p>
                  <p className="text-[12px] text-zinc-600">{m.size} · {m.category}</p>
                  <p className="text-[11px] text-zinc-700">{m.uploadedAt}</p>
                </div>
                <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-lg border border-white/6 bg-[#0a0a0a] p-1.5 text-zinc-500 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"><Download className="h-3.5 w-3.5" /></button>
                  <button onClick={() => deleteItem(m.id)} className="rounded-lg border border-white/6 bg-[#0a0a0a] p-1.5 text-zinc-500 transition-colors hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Uploaded By</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map((m) => (
                <tr key={m.id} className="group text-[13px] transition-colors hover:bg-white/2">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${typeColors[m.type] || "bg-zinc-400/10 text-zinc-400 border-zinc-400/20"}`}>
                        {React.createElement(typeIcons[m.type] || File, { className: "h-4 w-4" })}
                      </div>
                      <span className="font-medium text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-zinc-500">{m.type}</td>
                  <td className="px-6 py-4 text-zinc-500">{m.size}</td>
                  <td className="px-6 py-4 text-zinc-500">{m.category}</td>
                  <td className="px-6 py-4 text-zinc-500">{m.uploadedBy}</td>
                  <td className="px-6 py-4 text-zinc-500">{m.uploadedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg border border-white/6 bg-white/2 p-1.5 text-zinc-500 hover:border-cyan-500/30 hover:text-cyan-400"><Download className="h-3.5 w-3.5" /></button>
                      <button onClick={() => deleteItem(m.id)} className="rounded-lg border border-white/6 bg-white/2 p-1.5 text-zinc-500 hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
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
