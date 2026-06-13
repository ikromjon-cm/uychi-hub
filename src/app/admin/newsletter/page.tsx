"use client";

import { useState } from "react";
import { useApi, apiPatch, apiDelete } from "@/lib/api";
import { Search, Trash2, Mail } from "lucide-react";

type Subscriber = Record<string, string | number | boolean>;

export default function AdminNewsletter() {
  const { data: raw, loading } = useApi<Subscriber[]>("/newsletter/subscribers/", []);
  const [local, setLocal]     = useState<Subscriber[] | null>(null);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");

  const subscribers = local ?? (Array.isArray(raw) ? raw : []);
  const filtered = subscribers.filter(s => {
    if (filter === "active" && !s.is_active) return false;
    if (filter === "inactive" && s.is_active) return false;
    if (search && !String(s.email).toLowerCase().includes(search.toLowerCase()) && !String(s.name).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function toggleActive(id: number, current: boolean) {
    await apiPatch(`/newsletter/subscribers/${id}/`, { is_active: !current });
    setLocal(subscribers.map(s => s.id === id ? { ...s, is_active: !current } : s));
  }

  async function deleteItem(id: number) {
    await apiDelete(`/newsletter/subscribers/${id}/`);
    setLocal(subscribers.filter(s => s.id !== id));
  }

  const active = subscribers.filter(s => s.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Newsletter Obunalari</h1>
          <p className="mt-1 text-[13px] text-muted">
            {loading ? "Yuklanmoqda..." : `${subscribers.length} jami · ${active} faol`}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Jami Obunachi", value: subscribers.length, color: "text-foreground" },
          { label: "Faol", value: active, color: "text-emerald-400" },
          { label: "Nofaol", value: subscribers.length - active, color: "text-muted" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Email yoki ism..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
          {[["all","Barchasi"],["active","Faol"],["inactive","Nofaol"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${filter === v ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
        <span className="text-[12px] text-muted-foreground">{filtered.length} ta</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Ism</th>
              <th className="px-6 py-4">Obuna sanasi</th>
              <th className="px-6 py-4">Holat</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {(loading ? Array.from({ length: 8 }) : filtered).map((s, i) =>
              loading ? (
                <tr key={i}><td colSpan={5} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
              ) : (
                <tr key={String((s as Subscriber).id)} className="group text-[13px] transition-colors hover:bg-accent/5">
                  <td className="px-6 py-4">
                    <a href={`mailto:${String((s as Subscriber).email)}`} className="flex items-center gap-2 text-accent hover:underline">
                      <Mail className="h-3.5 w-3.5" />{String((s as Subscriber).email)}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-muted">{String((s as Subscriber).name || "—")}</td>
                  <td className="px-6 py-4 text-muted">{String((s as Subscriber).subscribed_at || "").slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleActive(Number((s as Subscriber).id), Boolean((s as Subscriber).is_active))}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase transition-all ${(s as Subscriber).is_active ? "bg-emerald-400/10 text-emerald-400 hover:bg-red-400/10 hover:text-red-400" : "bg-card-hover text-muted hover:bg-emerald-400/10 hover:text-emerald-400"}`}>
                      {(s as Subscriber).is_active ? "Faol" : "Nofaol"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                      <button onClick={() => deleteItem(Number((s as Subscriber).id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              )
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-[13px] text-muted">Obunachi topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
