"use client";

import { useState } from "react";
import { useApi, apiPatch, apiDelete } from "@/lib/api";
import { Search, Trash2, Mail, Phone, Globe, X, Eye } from "lucide-react";

type Submission = Record<string, string | number | boolean>;

export default function AdminContact() {
  const { data: raw, loading } = useApi<Submission[]>("/contact/submissions/", []);
  const [local, setLocal]     = useState<Submission[] | null>(null);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [selected, setSelected] = useState<Submission | null>(null);

  const submissions = local ?? (Array.isArray(raw) ? raw : []);
  const filtered = submissions.filter(s => {
    if (filter === "unread" && s.is_read) return false;
    if (filter === "read" && !s.is_read) return false;
    if (search && !String(s.name).toLowerCase().includes(search.toLowerCase()) && !String(s.email).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function markRead(id: number) {
    await apiPatch(`/contact/submissions/${id}/`, { is_read: true });
    setLocal(submissions.map(s => s.id === id ? { ...s, is_read: true } : s));
  }

  async function deleteItem(id: number) {
    await apiDelete(`/contact/submissions/${id}/`);
    setLocal(submissions.filter(s => s.id !== id));
  }

  const unread = submissions.filter(s => !s.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Murojaat Xabarlari</h1>
          <p className="mt-1 text-[13px] text-muted">
            {loading ? "Yuklanmoqda..." : `${submissions.length} ta xabar`}
            {unread > 0 && <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent">{unread} yangi</span>}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidirish..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
          {[["all","Barchasi"],["unread","O'qilmagan"],["read","O'qilgan"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${filter === v ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Yuboruvchi</th>
              <th className="px-6 py-4">Kompaniya</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Telefon</th>
              <th className="px-6 py-4">Sana</th>
              <th className="px-6 py-4">Holat</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {(loading ? Array.from({ length: 5 }) : filtered).map((s, i) =>
              loading ? (
                <tr key={i}><td colSpan={7} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
              ) : (
                <tr key={String((s as Submission).id)} onClick={() => { setSelected(s as Submission); if (!(s as Submission).is_read) markRead(Number((s as Submission).id)); }} className="group cursor-pointer text-[13px] transition-colors hover:bg-accent/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!(s as Submission).is_read && <span className="h-2 w-2 rounded-full bg-accent shrink-0" />}
                      <p className={`font-medium ${!(s as Submission).is_read ? "text-foreground" : "text-muted"}`}>{String((s as Submission).name)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{String((s as Submission).company || "—")}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${String((s as Submission).email)}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-accent hover:underline"><Mail className="h-3 w-3" />{String((s as Submission).email)}</a>
                  </td>
                  <td className="px-6 py-4 text-muted">{String((s as Submission).phone || "—")}</td>
                  <td className="px-6 py-4 text-muted">{String((s as Submission).created_at || "").slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${(s as Submission).is_read ? "bg-card-hover text-muted" : "bg-accent/10 text-accent"}`}>
                      {(s as Submission).is_read ? "O'qilgan" : "Yangi"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button onClick={() => { setSelected(s as Submission); markRead(Number((s as Submission).id)); }} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => deleteItem(Number((s as Submission).id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              )
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-[13px] text-muted">Xabar topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            <h2 className="text-[18px] font-bold text-foreground">{String(selected.name)}</h2>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href={`mailto:${String(selected.email)}`} className="flex items-center gap-1.5 text-[13px] text-accent hover:underline"><Mail className="h-3.5 w-3.5" />{String(selected.email)}</a>
              {selected.phone && <a href={`tel:${String(selected.phone)}`} className="flex items-center gap-1.5 text-[13px] text-muted hover:text-foreground"><Phone className="h-3.5 w-3.5" />{String(selected.phone)}</a>}
              {selected.country && <span className="flex items-center gap-1.5 text-[13px] text-muted"><Globe className="h-3.5 w-3.5" />{String(selected.country)}</span>}
            </div>
            {selected.company && <p className="mt-2 text-[13px] text-muted">Kompaniya: <span className="text-foreground">{String(selected.company)}</span></p>}
            <div className="mt-5 rounded-xl border border-border bg-background p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">Xabar</p>
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-foreground">{String(selected.message)}</p>
            </div>
            <p className="mt-3 text-[12px] text-muted">{String(selected.created_at || "").slice(0, 19).replace("T", " ")}</p>
            <div className="mt-5 flex gap-3">
              <a href={`mailto:${String(selected.email)}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
                <Mail className="h-4 w-4" /> Javob Berish
              </a>
              <button onClick={() => { deleteItem(Number(selected.id)); setSelected(null); }} className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-[13px] text-red-400 hover:bg-red-500/5">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
