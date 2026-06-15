"use client";

import { useState } from "react";
import { useApi, apiUpload, apiPost, apiDelete } from "@/lib/api";
import { Loader2, Upload, Link2, Trash2, Check } from "lucide-react";

type HeroVideo = { id: number; video_url: string; video_file: string | null; is_active: boolean };

export default function Page() {
  const { data: videos, loading } = useApi<HeroVideo[]>("/hub/admin/hero-video/", []);
  const [list, setList] = useState<HeroVideo[] | null>(null);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const items = list ?? videos;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setDone(false);
    try {
      let created: HeroVideo;
      if (mode === "file") {
        if (!file) { setError("Fayl tanlanmadi"); setSaving(false); return; }
        const fd = new FormData();
        fd.append("video_file", file);
        fd.append("is_active", "true");
        created = await apiUpload("/hub/admin/hero-video/", fd);
      } else {
        if (!url.trim()) { setError("URL kiriting"); setSaving(false); return; }
        created = await apiPost("/hub/admin/hero-video/", { video_url: url.trim(), is_active: true }) as unknown as HeroVideo;
      }
      setList([created, ...items]);
      setUrl(""); setFile(null); setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yuklashda xatolik");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    try {
      await apiDelete(`/hub/admin/hero-video/${id}/`);
      setList(items.filter((v) => v.id !== id));
    } catch { /* silent */ }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hero Video</h1>
        <p className="mt-1 text-[13px] text-muted">
          Bosh sahifadagi video. Qurilmadan fayl yuklang yoki URL kiriting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex gap-2">
          <button type="button" onClick={() => setMode("file")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all ${mode === "file" ? "bg-accent text-black" : "border border-border text-muted hover:text-foreground"}`}>
            <Upload className="h-4 w-4" /> Qurilmadan
          </button>
          <button type="button" onClick={() => setMode("url")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all ${mode === "url" ? "bg-accent text-black" : "border border-border text-muted hover:text-foreground"}`}>
            <Link2 className="h-4 w-4" /> URL
          </button>
        </div>

        {mode === "file" ? (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-4 py-10 text-center transition-colors hover:border-accent/40">
            <Upload className="h-7 w-7 text-muted" />
            <span className="text-[13px] font-semibold text-foreground">
              {file ? file.name : "Video faylni tanlang"}
            </span>
            <span className="text-[11px] text-muted">MP4, WebM — bosib tanlang yoki sudrab tashlang</span>
            <input type="file" accept="video/*" className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        ) : (
          <input value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://... .mp4"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
        )}

        {error && <p className="text-[12px] text-red-400">{error}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark disabled:opacity-60">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Yuklash
          </button>
          {done && <span className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-400"><Check className="h-4 w-4" /> Yuklandi</span>}
        </div>
      </form>

      <div>
        <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-muted">Mavjud videolar ({items.length})</h2>
        {loading ? (
          <div className="h-24 animate-pulse rounded-2xl border border-border bg-card" />
        ) : items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-[13px] text-muted">Hali video yo&apos;q</p>
        ) : (
          <div className="space-y-2">
            {items.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-foreground">{v.video_url || v.video_file || "—"}</p>
                  <span className={`text-[11px] ${v.is_active ? "text-emerald-400" : "text-muted"}`}>
                    {v.is_active ? "Faol" : "Nofaol"}
                  </span>
                </div>
                <button onClick={() => handleDelete(v.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted hover:border-red-500/30 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" /> O&apos;chirish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
