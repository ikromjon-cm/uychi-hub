"use client";

import { useState } from "react";
import { useApi, apiPatch, apiPost, apiDelete } from "@/lib/api";
import { Search, Plus, Edit3, Trash2, Eye, ChevronDown, Calendar, X, Loader2 } from "lucide-react";

type Article = Record<string, string | number>;

const STATUS_COLORS: Record<string, string> = {
  published: "bg-emerald-400/10 text-emerald-400",
  draft:     "bg-yellow-400/10 text-yellow-400",
  review:    "bg-blue-400/10 text-blue-400",
  archived:  "bg-card-hover text-muted",
};

const EMPTY = { title: "", category: "Hamkorlik", author: "", excerpt: "" };

export default function AdminNews() {
  const { data: raw, loading } = useApi<Article[]>("/news/articles/", []);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [local, setLocal]     = useState<Article[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]       = useState({ ...EMPTY });
  const [saving, setSaving]   = useState(false);

  const articles = local ?? (Array.isArray(raw) ? raw : []);
  const filtered = articles.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !String(a.title).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function togglePublish(id: number, currentStatus: string) {
    const next = currentStatus === "published" ? "draft" : "published";
    try {
      await apiPatch(`/news/articles/${id}/`, { status: next });
      setLocal(articles.map(a => a.id === id ? { ...a, status: next } : a));
    } catch { /* silent */ }
  }

  async function deleteItem(id: number) {
    try {
      await apiDelete(`/news/articles/${id}/`);
      setLocal(articles.filter(a => a.id !== id));
    } catch { /* silent */ }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await apiPost("/news/articles/", { ...form, status: "draft" }) as Article;
      setLocal([created, ...articles]);
      setShowModal(false);
      setForm({ ...EMPTY });
    } catch { /* silent */ }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">News Management</h1>
          <p className="mt-1 text-[13px] text-muted">
            {loading ? "Yuklanmoqda..." : `${articles.length} ta maqola — Django bazasidan`}
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
          <Plus className="h-4 w-4" /> New Article
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="relative">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
            <option value="archived">Archived</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </div>
        <span className="text-[12px] text-muted-foreground">{filtered.length} articles</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Views</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {loading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={7} className="px-6 py-4">
                  <div className="h-4 animate-pulse rounded bg-card-hover" />
                </td>
              </tr>
            ))}
            {filtered.map(a => (
              <tr key={String(a.id)} className="group text-[13px] transition-colors hover:bg-card">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{String(a.title)}</p>
                  <p className="mt-0.5 max-w-xs truncate text-[12px] text-muted">{String(a.excerpt || "")}</p>
                </td>
                <td className="px-6 py-4 text-muted">{String(a.category || "—")}</td>
                <td className="px-6 py-4 text-muted">{String(a.author || "—")}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String(a.status)] || "bg-card-hover text-muted"}`}>
                    {String(a.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">{Number(a.views || 0).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-muted">
                    <Calendar className="h-3 w-3" />{String(a.published_at || a.created_at || "").slice(0, 10)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button onClick={() => togglePublish(Number(a.id), String(a.status))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-emerald-500/30 hover:text-emerald-400" title="Toggle publish"><Eye className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => deleteItem(Number(a.id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">Yangi Maqola</h2>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] text-muted">Sarlavha</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Maqola sarlavhasi..." className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted">Muallif</label>
                <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Muallif ismi..." className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted">Kategoriya</label>
                <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Hamkorlik, Yutuq..." className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted">Qisqacha</label>
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={3} placeholder="Qisqacha tavsif..." className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] text-muted hover:text-foreground">Bekor</button>
                <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark disabled:opacity-60">
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
