"use client";

import { useState } from "react";
import { useApi, apiPatch, apiPost } from "@/lib/api";
import { Search, ChevronDown, Eye, CheckCircle, XCircle, MessageSquare, Plus, X, Loader2, Globe, Mail, Phone, Users, DollarSign, Code2, MapPin, Calendar } from "lucide-react";

type Startup = Record<string, string | number>;

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-emerald-400/10 text-emerald-400",
  pending:  "bg-yellow-400/10 text-yellow-400",
  review:   "bg-blue-400/10 text-blue-400",
  rejected: "bg-red-400/10 text-red-400",
};
const SECTOR_COLORS: Record<string, string> = {
  "MedTech AI": "text-accent", "AgriTech AI": "text-emerald-400",
  "FinTech AI": "text-violet-400", "EdTech AI": "text-blue-400",
  "Logistics AI": "text-orange-400", "Cybersecurity": "text-red-400",
  "GreenTech AI": "text-green-400", "Industry AI": "text-amber-400",
  "GovTech": "text-pink-400",
};

const EMPTY = { startup_name: "", sector: "", stage: "Pre-Seed", founder_name: "", email: "", team_size: "2", funding_needed: "", description: "" };

export default function AdminStartups() {
  const { data: raw, loading } = useApi<Startup[]>("/startups/startup-applications/", []);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [local, setLocal]       = useState<Startup[] | null>(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [selected, setSelected] = useState<Startup | null>(null);
  const [form, setForm]         = useState({ ...EMPTY });
  const [saving, setSaving]     = useState(false);

  const startups = local ?? (Array.isArray(raw) ? raw : []);
  const filtered = startups.filter(s => {
    if (filter !== "all" && s.status !== filter) return false;
    if (search && !String(s.startup_name).toLowerCase().includes(search.toLowerCase()) && !String(s.founder_name).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function updateStatus(id: number, status: string) {
    try {
      await apiPatch(`/startups/startup-applications/${id}/`, { status });
      setLocal(startups.map(s => s.id === id ? { ...s, status } : s));
    } catch { /* silent */ }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await apiPost("/startups/startup-applications/", form);
    setLocal([{ ...form, id: Date.now(), status: "pending" } as Startup, ...startups]);
    setShowAdd(false);
    setForm({ ...EMPTY });
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Startup Management</h1>
          <p className="mt-1 text-[13px] text-muted">
            {loading ? "Yuklanmoqda..." : `${startups.length} ta ariza — Django bazasidan`}
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
          <Plus className="h-4 w-4" /> Add Startup
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search startups..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="relative">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none">
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="review">In Review</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </div>
        <span className="text-[12px] text-muted-foreground">{filtered.length} of {startups.length}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-border-subtle bg-card h-48" />
        ))}
        {filtered.map(s => (
          <div key={String(s.id)} onClick={() => setSelected(s)} className="cursor-pointer rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_-5px_rgba(6,247,227,0.15)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-foreground">{String(s.startup_name)}</h3>
                <p className={`text-[12px] font-medium ${SECTOR_COLORS[String(s.sector)] || "text-muted"}`}>{String(s.sector)}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String(s.status)] || "bg-card-hover text-muted"}`}>
                {String(s.status)}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border-subtle pt-4 text-[13px]">
              <div><span className="text-muted">Stage</span><p className="font-medium text-foreground">{String(s.stage)}</p></div>
              <div><span className="text-muted">Funding</span><p className="font-medium text-foreground">{String(s.funding_needed || "—")}</p></div>
              <div><span className="text-muted">Founder</span><p className="font-medium text-foreground">{String(s.founder_name)}</p></div>
              <div><span className="text-muted">Team</span><p className="font-medium text-foreground">{String(s.team_size)} ta</p></div>
              <div className="col-span-2"><span className="text-muted">Email</span><p className="font-medium text-foreground">{String(s.email)}</p></div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-border-subtle pt-4" onClick={e => e.stopPropagation()}>
              <button onClick={() => updateStatus(Number(s.id), "approved")} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted hover:border-emerald-500/30 hover:text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> Approve</button>
              <button onClick={() => updateStatus(Number(s.id), "rejected")} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted hover:border-red-500/30 hover:text-red-400"><XCircle className="h-3.5 w-3.5" /> Reject</button>
              <button onClick={() => updateStatus(Number(s.id), "review")} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted hover:border-blue-500/30 hover:text-blue-400"><MessageSquare className="h-3.5 w-3.5" /></button>
              <button onClick={() => setSelected(s)} className="ml-auto flex items-center rounded-lg border border-border p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Eye className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>

            {/* Header */}
            <div className="flex items-start gap-4 pr-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-[18px] font-bold text-accent">
                {String(selected.startup_name)[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-foreground">{String(selected.startup_name)}</h2>
                <p className={`text-[13px] font-medium ${SECTOR_COLORS[String(selected.sector)] || "text-muted"}`}>{String(selected.sector)}</p>
              </div>
              <span className={`ml-auto shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase ${STATUS_COLORS[String(selected.status)] || "bg-card-hover text-muted"}`}>
                {String(selected.status)}
              </span>
            </div>

            {/* Key info grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-background p-4 sm:grid-cols-3">
              {[
                { icon: <DollarSign className="h-3.5 w-3.5" />, label: "Bosqich", value: String(selected.stage || "—") },
                { icon: <Users className="h-3.5 w-3.5" />, label: "Jamoa", value: `${String(selected.team_size || "—")} kishi` },
                { icon: <DollarSign className="h-3.5 w-3.5" />, label: "Moliyalashtirish", value: String(selected.funding_needed || "—") },
                { icon: <MapPin className="h-3.5 w-3.5" />, label: "Mamlakat", value: String(selected.country || "—") },
                { icon: <Calendar className="h-3.5 w-3.5" />, label: "Ariza sanasi", value: String(selected.created_at || "").slice(0, 10) || "—" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{icon}{label}</span>
                  <span className="text-[13px] font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-5 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Asoschisi</p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-[13px] text-foreground">
                  <Users className="h-3.5 w-3.5 text-muted" />{String(selected.founder_name || "—")}
                </span>
                {selected.email && (
                  <a href={`mailto:${String(selected.email)}`} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-[13px] text-accent hover:border-accent/30">
                    <Mail className="h-3.5 w-3.5" />{String(selected.email)}
                  </a>
                )}
                {selected.phone && (
                  <a href={`tel:${String(selected.phone)}`} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-[13px] text-foreground hover:border-accent/30">
                    <Phone className="h-3.5 w-3.5 text-muted" />{String(selected.phone)}
                  </a>
                )}
                {selected.website && (
                  <a href={String(selected.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-[13px] text-foreground hover:border-accent/30">
                    <Globe className="h-3.5 w-3.5 text-muted" />{String(selected.website)}
                  </a>
                )}
              </div>
            </div>

            {/* Tech stack */}
            {selected.tech_stack && (
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted"><Code2 className="mr-1 inline h-3 w-3" />Texnologiyalar</p>
                <div className="flex flex-wrap gap-2">
                  {String(selected.tech_stack).split(/[,;]/).map(t => t.trim()).filter(Boolean).map(tech => (
                    <span key={tech} className="rounded-lg border border-border bg-background px-2.5 py-1 text-[12px] text-foreground">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {selected.description && (
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Tavsif</p>
                <p className="text-[13px] leading-relaxed text-muted">{String(selected.description)}</p>
              </div>
            )}

            {/* Status actions */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
              <p className="w-full text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Statusni o'zgartirish</p>
              {["approved", "review", "rejected", "pending"].map(st => (
                <button key={st} onClick={() => { updateStatus(Number(selected.id), st); setSelected({ ...selected, status: st }); }}
                  className={`rounded-lg border px-4 py-2 text-[12px] font-semibold transition-all ${String(selected.status) === st ? STATUS_COLORS[st] + " border-current" : "border-border text-muted hover:border-accent/30 hover:text-foreground"}`}>
                  {st === "approved" ? "✓ Tasdiqlash" : st === "rejected" ? "✗ Rad etish" : st === "review" ? "Ko'rib chiqish" : "Kutilmoqda"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">Yangi Startup Qo&apos;shish</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {([["startup_name","Startup nomi"],["founder_name","Asoschisi"],["email","Email"],["sector","Sektor"],["funding_needed","Moliyalashtirish"]] as [keyof typeof EMPTY, string][]).map(([k,l]) => (
                  <div key={k} className={k === "email" || k === "startup_name" ? "col-span-2" : ""}>
                    <label className="mb-1 block text-[11px] text-muted">{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                  </div>
                ))}
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Bosqich</label>
                  <select value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    {["Idea","Pre-Seed","MVP","Seed","Series A"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Jamoa</label>
                  <input type="number" min="1" value={form.team_size} onChange={e => setForm(f => ({ ...f, team_size: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted">Tavsif</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none resize-none" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] text-muted hover:text-foreground">Bekor</button>
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
