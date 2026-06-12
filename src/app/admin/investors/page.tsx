"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch } from "@/lib/api";
import { Search, ChevronDown, Eye, MessageSquare, Building2, Globe, Calendar, Plus, X } from "lucide-react";

type Investor = {
  id: number; company: string; country: string; investor_type: string;
  ticket_size: string; sectors: string; status: string;
  contact_name: string; email: string; notes: string; created_at: string;
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-400/10 text-emerald-400",
  negotiation: "bg-cyan-400/10 text-cyan-400",
  due_diligence: "bg-yellow-400/10 text-yellow-400",
  closed: "bg-zinc-400/10 text-zinc-400",
};

const emptyForm = { company: "", country: "O'zbekiston", investor_type: "VC Fund", ticket_size: "", sectors: "", contact_name: "", email: "" };

export default function AdminInvestors() {
  const { data: rawInvestors, loading } = useApi<Investor[]>("/investors/investors/", []);
  const [overrides, setOverrides] = useState<Record<number, Partial<Investor>>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const investors = rawInvestors.map(i => ({ ...i, ...overrides[i.id] }));

  const filtered = investors.filter((inv) => {
    if (filter !== "all" && inv.status !== filter) return false;
    if (search && !inv.company.toLowerCase().includes(search.toLowerCase()) && !inv.contact_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function updateStatus(id: number, status: string) {
    setOverrides(prev => ({ ...prev, [id]: { ...prev[id], status } }));
    await apiPatch(`/investors/investors/${id}/`, { status });
  }

  async function handleAdd() {
    setSaving(true);
    try {
      await apiPost("/investors/investors/", { ...form, status: "active" });
      window.location.reload();
    } catch { /* silent */ }
    setSaving(false);
    setShowModal(false);
  }

  const activeCount = investors.filter(i => i.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Investor Management</h1>
          <p className="mt-1 text-[13px] text-zinc-600">Investor munosabatlarini kuzatish va boshqarish.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-cyan-400">
          <Plus className="h-4 w-4" /> Add Investor
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Active Investors", value: activeCount.toString(), color: "text-emerald-400" },
          { label: "Negotiation", value: investors.filter(i => i.status === "negotiation").length.toString(), color: "text-cyan-400" },
          { label: "Due Diligence", value: investors.filter(i => i.status === "due_diligence").length.toString(), color: "text-yellow-400" },
          { label: "Total Registered", value: investors.length.toString(), color: "text-white" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-zinc-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-600" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search investors..." className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600" />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none rounded-xl border border-white/6 bg-white/2 px-4 py-2 pr-8 text-[13px] text-zinc-400 outline-none transition-colors hover:border-white/10">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="negotiation">Negotiation</option>
            <option value="due_diligence">Due Diligence</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] px-6 py-10 text-center text-[13px] text-zinc-600">Yuklanmoqda...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((inv) => (
            <div key={inv.id} className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-5 transition-all hover:border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/6 bg-white/2 text-cyan-400"><Building2 className="h-5 w-5" /></div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{inv.company}</h3>
                    <p className="flex items-center gap-1 text-[12px] text-zinc-600"><Globe className="h-3 w-3" />{inv.country}</p>
                  </div>
                </div>
                <select
                  value={inv.status}
                  onChange={(e) => updateStatus(inv.id, e.target.value)}
                  className={`shrink-0 appearance-none rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none ${statusColors[inv.status] || "bg-zinc-400/10 text-zinc-400"}`}
                >
                  {["active", "negotiation", "due_diligence", "closed"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/4 pt-4 text-[13px]">
                <div><span className="text-zinc-600">Type</span><p className="font-medium text-white">{inv.investor_type}</p></div>
                <div><span className="text-zinc-600">Ticket Size</span><p className="font-medium text-white">{inv.ticket_size || "—"}</p></div>
                <div><span className="text-zinc-600">Contact</span><p className="font-medium text-white">{inv.contact_name || "—"}</p></div>
                <div><span className="text-zinc-600">Sectors</span><p className="font-medium text-cyan-400">{inv.sectors || "—"}</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] text-zinc-600">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{inv.created_at?.slice(0, 10) || "—"}</span>
                <div className="flex gap-1">
                  {inv.email && <a href={`mailto:${inv.email}`} className="rounded-lg border border-white/6 p-1.5 text-zinc-500 transition-colors hover:border-blue-500/30 hover:text-blue-400"><MessageSquare className="h-3.5 w-3.5" /></a>}
                  <button className="rounded-lg border border-white/6 p-1.5 text-zinc-500 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"><Eye className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 rounded-2xl border border-white/5 bg-[#0a0a0a] px-6 py-10 text-center text-[13px] text-zinc-600">Investor topilmadi.</div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-white">Add Investor</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "company", label: "Company / Organization", placeholder: "Navoiy Investitsiya Fondi" },
                { key: "country", label: "Country", placeholder: "O'zbekiston" },
                { key: "contact_name", label: "Contact Name", placeholder: "Ismi Sharifi" },
                { key: "email", label: "Email", placeholder: "contact@fund.uz" },
                { key: "ticket_size", label: "Ticket Size", placeholder: "$100K–$1M" },
                { key: "sectors", label: "Sectors", placeholder: "AgriTech, EdTech, AI" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-[12px] text-zinc-500">{label}</label>
                  <input value={(form as Record<string, string>)[key] || ""} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-[13px] text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/40" />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-[12px] text-zinc-500">Investor Type</label>
                <select value={form.investor_type} onChange={(e) => setForm(f => ({ ...f, investor_type: e.target.value }))} className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-[13px] text-zinc-400 outline-none focus:border-cyan-500/40">
                  {["VC Fund", "Corporate VC", "Accelerator", "Development VC", "Angel", "Strategic", "Development", "Corporate"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="rounded-xl border border-white/6 px-4 py-2.5 text-[13px] text-zinc-400 hover:border-white/10 hover:text-white">Cancel</button>
              <button onClick={handleAdd} disabled={saving} className="rounded-xl bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-cyan-400 disabled:opacity-60">{saving ? "Saving..." : "Add Investor"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
