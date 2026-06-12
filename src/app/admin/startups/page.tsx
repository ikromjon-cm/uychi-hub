"use client";

import { useState } from "react";
import { useApi, apiPatch, apiPost } from "@/lib/api";
import { Search, ChevronDown, Eye, CheckCircle, XCircle, MessageSquare, Plus, X, Loader2 } from "lucide-react";

type Startup = Record<string, string | number>;

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-emerald-400/10 text-emerald-400",
  pending:  "bg-yellow-400/10 text-yellow-400",
  review:   "bg-blue-400/10 text-blue-400",
  rejected: "bg-red-400/10 text-red-400",
};
const SECTOR_COLORS: Record<string, string> = {
  "MedTech AI": "text-cyan-400", "AgriTech AI": "text-emerald-400",
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
    try {
      const created = await apiPost("/startups/startup-applications/", form) as Startup;
      setLocal([created, ...startups]);
      setShowAdd(false);
      setForm({ ...EMPTY });
    } catch { /* silent */ }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Startup Management</h1>
          <p className="mt-1 text-[13px] text-zinc-600">
            {loading ? "Yuklanmoqda..." : `${startups.length} ta ariza — Django bazasidan`}
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-[13px] font-bold text-black hover:bg-cyan-300">
          <Plus className="h-4 w-4" /> Add Startup
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-600" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search startups..." className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600" />
        </div>
        <div className="relative">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="appearance-none rounded-xl border border-white/6 bg-white/2 px-4 py-2 pr-8 text-[13px] text-zinc-400 outline-none">
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="review">In Review</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
        </div>
        <span className="text-[12px] text-zinc-700">{filtered.length} of {startups.length}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-white/5 bg-[#0a0a0a] h-48" />
        ))}
        {filtered.map(s => (
          <div key={String(s.id)} className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-5 transition-all hover:border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-white">{String(s.startup_name)}</h3>
                <p className={`text-[12px] font-medium ${SECTOR_COLORS[String(s.sector)] || "text-zinc-500"}`}>{String(s.sector)}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String(s.status)] || "bg-zinc-400/10 text-zinc-400"}`}>
                {String(s.status)}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/4 pt-4 text-[13px]">
              <div><span className="text-zinc-600">Stage</span><p className="font-medium text-white">{String(s.stage)}</p></div>
              <div><span className="text-zinc-600">Funding</span><p className="font-medium text-white">{String(s.funding_needed || "—")}</p></div>
              <div><span className="text-zinc-600">Founder</span><p className="font-medium text-white">{String(s.founder_name)}</p></div>
              <div><span className="text-zinc-600">Team</span><p className="font-medium text-white">{String(s.team_size)} ta</p></div>
              <div className="col-span-2"><span className="text-zinc-600">Email</span><p className="font-medium text-white">{String(s.email)}</p></div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-white/4 pt-4">
              <button onClick={() => updateStatus(Number(s.id), "approved")} className="flex items-center gap-1.5 rounded-lg border border-white/6 px-3 py-1.5 text-[12px] text-zinc-500 hover:border-emerald-500/30 hover:text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> Approve</button>
              <button onClick={() => updateStatus(Number(s.id), "rejected")} className="flex items-center gap-1.5 rounded-lg border border-white/6 px-3 py-1.5 text-[12px] text-zinc-500 hover:border-red-500/30 hover:text-red-400"><XCircle className="h-3.5 w-3.5" /> Reject</button>
              <button onClick={() => updateStatus(Number(s.id), "review")} className="flex items-center gap-1.5 rounded-lg border border-white/6 px-3 py-1.5 text-[12px] text-zinc-500 hover:border-blue-500/30 hover:text-blue-400"><MessageSquare className="h-3.5 w-3.5" /></button>
              <button className="ml-auto flex items-center rounded-lg border border-white/6 p-1.5 text-zinc-500 hover:border-cyan-500/30 hover:text-cyan-400"><Eye className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/8 bg-[#0d0d0d] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-white">Yangi Startup Qo&apos;shish</h2>
              <button onClick={() => setShowAdd(false)} className="text-zinc-600 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {([["startup_name","Startup nomi"],["founder_name","Asoschisi"],["email","Email"],["sector","Sektor"],["funding_needed","Moliyalashtirish"]] as [keyof typeof EMPTY, string][]).map(([k,l]) => (
                  <div key={k} className={k === "email" || k === "startup_name" ? "col-span-2" : ""}>
                    <label className="mb-1 block text-[11px] text-zinc-600">{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required className="w-full rounded-xl border border-white/8 bg-white/3 px-3 py-2 text-[13px] text-white outline-none focus:border-cyan-500/40" />
                  </div>
                ))}
                <div>
                  <label className="mb-1 block text-[11px] text-zinc-600">Bosqich</label>
                  <select value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))} className="w-full rounded-xl border border-white/8 bg-white/3 px-3 py-2 text-[13px] text-white outline-none">
                    {["Idea","Pre-Seed","MVP","Seed","Series A"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-zinc-600">Jamoa</label>
                  <input type="number" min="1" value={form.team_size} onChange={e => setForm(f => ({ ...f, team_size: e.target.value }))} className="w-full rounded-xl border border-white/8 bg-white/3 px-3 py-2 text-[13px] text-white outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-zinc-600">Tavsif</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full rounded-xl border border-white/8 bg-white/3 px-3 py-2 text-[13px] text-white outline-none resize-none" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-white/8 py-2.5 text-[13px] text-zinc-500 hover:text-white">Bekor</button>
                <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 py-2.5 text-[13px] font-bold text-black hover:bg-cyan-300 disabled:opacity-60">
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
