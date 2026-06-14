"use client";

import { useState } from "react";
import { useApi, apiPost, apiDelete } from "@/lib/api";
import { Search, Plus, ChevronDown, Globe, Handshake, ExternalLink, Trash2, X } from "lucide-react";

type Partner = {
  id: number; name: string; country: string; category: string;
  tier: string; website: string; logo: string; description?: string;
};

const categoryColors: Record<string, string> = {
  Government: "bg-violet-400/10 text-violet-400",
  University: "bg-blue-400/10 text-blue-400",
  International: "bg-accent/10 text-accent",
  Corporate: "bg-emerald-400/10 text-emerald-400",
  Accelerator: "bg-yellow-400/10 text-yellow-400",
  "Tech Park": "bg-pink-400/10 text-pink-400",
};

const CATEGORY_LABELS: Record<string, string> = {
  Government: "Davlat", University: "Universitet", International: "Xalqaro",
  Corporate: "Korporatsiya", Accelerator: "Akselerator", "Tech Park": "Tech Park",
};

const emptyForm = { name: "", country: "O'zbekiston", category: "Corporate", tier: "regional", website: "", logo: "" };

export default function AdminPartners() {
  const { data: rawPartners, loading } = useApi<Partner[]>("/partners/partners/", []);
  const [deleted, setDeleted] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [added, setAdded] = useState<Partner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Partner | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const partners = [...added, ...rawPartners.filter(p => !deleted.has(p.id))];
  const filtered = partners.filter((p) => {
    if (filter !== "all" && p.category !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.country.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function deleteItem(id: number) {
    setDeleted(prev => new Set([...prev, id]));
    await apiDelete(`/partners/partners/${id}/`);
  }

  async function handleAdd() {
    setSaving(true);
    setSaveError("");
    try {
      await apiPost("/partners/partners/", form);
      setAdded(prev => [{ ...form, id: Date.now() } as Partner, ...prev]);
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Partner Management</h1>
          <p className="mt-1 text-[13px] text-muted">Hamkorlar tarmog'ini boshqarish.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-accent-dark">
          <Plus className="h-4 w-4" /> Add Partner
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Partners", value: partners.length.toString(), color: "text-foreground" },
          { label: "Corporate", value: partners.filter(p => p.category === "Corporate").length.toString(), color: "text-emerald-400" },
          { label: "International", value: partners.filter(p => p.category === "International").length.toString(), color: "text-accent" },
          { label: "Government", value: partners.filter(p => p.category === "Government").length.toString(), color: "text-violet-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search partners..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none transition-colors hover:border-border">
            <option value="all">All Categories</option>
            {Object.keys(CATEGORY_LABELS).map(k => <option key={k} value={k}>{CATEGORY_LABELS[k]}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        {loading ? (
          <div className="px-6 py-10 text-center text-[13px] text-muted">Yuklanmoqda...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Tier</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((p) => (
                <tr key={p.id} onClick={() => setSelected(p)} className="group cursor-pointer text-[13px] transition-colors hover:bg-accent/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted"><Handshake className="h-4 w-4" /></div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-muted"><Globe className="h-3 w-3" />{p.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[p.category] || "bg-card-hover text-muted"}`}>{CATEGORY_LABELS[p.category] || p.category}</span>
                  </td>
                  <td className="px-6 py-4 text-muted capitalize">{p.tier}</td>
                  <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><ExternalLink className="h-3.5 w-3.5" /></a>}
                      <button onClick={() => deleteItem(p.id)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-[13px] text-muted">Hamkor topilmadi.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative my-8 w-full max-w-xl rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>

            {/* Header */}
            <div className="flex items-center gap-4 pr-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent">
                <Handshake className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-[20px] font-bold text-foreground">{selected.name}</h2>
                <p className="flex items-center gap-1 text-[13px] text-muted"><Globe className="h-3.5 w-3.5" />{selected.country}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${categoryColors[selected.category] || "bg-card-hover text-muted"}`}>
                {CATEGORY_LABELS[selected.category] || selected.category}
              </span>
            </div>

            {/* Info grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-background p-4">
              {[
                { label: "Kategoriya", value: CATEGORY_LABELS[selected.category] || selected.category },
                { label: "Tier", value: selected.tier || "—" },
                { label: "Davlat", value: selected.country || "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</span>
                  <p className="mt-0.5 text-[13px] font-medium capitalize text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {selected.description && (
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Tavsif</p>
                <p className="text-[13px] leading-relaxed text-muted">{selected.description}</p>
              </div>
            )}

            {/* Website */}
            {selected.website && (
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Vebsayt</p>
                <a href={selected.website} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] text-accent hover:border-accent/30">
                  <ExternalLink className="h-4 w-4" />{selected.website}
                </a>
              </div>
            )}

            {/* Delete */}
            <div className="mt-6 flex justify-end border-t border-border pt-5">
              <button onClick={() => { deleteItem(selected.id); setSelected(null); }}
                className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2 text-[13px] text-red-400 hover:bg-red-500/5">
                <Trash2 className="h-4 w-4" /> O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">Add Partner</h2>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "name", label: "Partner Name", placeholder: "IT Park O'zbekiston" },
                { key: "country", label: "Country", placeholder: "O'zbekiston" },
                { key: "website", label: "Website", placeholder: "https://itpark.uz" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-[12px] text-muted">{label}</label>
                  <input value={(form as Record<string, string>)[key]} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted focus:border-accent/40" />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-[12px] text-muted">Tier</label>
                <select value={form.tier} onChange={(e) => setForm(f => ({ ...f, tier: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] text-muted outline-none focus:border-accent/40">
                  <option value="regional">Regional</option>
                  <option value="global">Global</option>
                  <option value="strategic">Strategic</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-muted">Category</label>
                <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] text-muted outline-none focus:border-accent/40">
                  {Object.keys(CATEGORY_LABELS).map(k => <option key={k} value={k}>{CATEGORY_LABELS[k]}</option>)}
                </select>
              </div>
            </div>
            {saveError && <p className="text-[12px] text-red-400 mt-2">{saveError}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="rounded-xl border border-border px-4 py-2.5 text-[13px] text-muted hover:border-border hover:text-foreground">Cancel</button>
              <button onClick={handleAdd} disabled={saving} className="rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-accent-dark disabled:opacity-60">{saving ? "Saving..." : "Add Partner"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
