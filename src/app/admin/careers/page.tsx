"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { Search, Plus, Trash2, ChevronDown, MapPin, X } from "lucide-react";

type Job = {
  id: number; title: string; department: string; employment_type: string;
  location: string; status: string; salary_range: string; description: string;
  requirements: string; applicants_count: number; posted_at: string | null;
};

const typeColors: Record<string, string> = {
  "Full-time": "bg-emerald-400/10 text-emerald-400",
  "Part-time": "bg-blue-400/10 text-blue-400",
  "Internship": "bg-violet-400/10 text-violet-400",
  "Contract": "bg-cyan-400/10 text-cyan-400",
};

const statusBadge: Record<string, string> = {
  active: "bg-emerald-400/10 text-emerald-400",
  paused: "bg-yellow-400/10 text-yellow-400",
  draft: "bg-zinc-400/10 text-zinc-400",
  closed: "bg-red-400/10 text-red-400",
};

const emptyForm = { title: "", department: "", employment_type: "Full-time", location: "Uychi, Namangan viloyat", salary_range: "", description: "", requirements: "" };

export default function AdminCareers() {
  const { data: rawJobs, loading } = useApi<Job[]>("/careers/job-postings/", []);
  const [overrides, setOverrides] = useState<Record<number, Partial<Job>>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState<Set<number>>(new Set());

  const jobs = rawJobs
    .filter(j => !deleted.has(j.id))
    .map(j => ({ ...j, ...overrides[j.id] }));

  const filtered = jobs.filter((j) => {
    if (filter !== "all" && j.status !== filter) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function updateStatus(id: number, status: string) {
    setOverrides(prev => ({ ...prev, [id]: { ...prev[id], status } }));
    await apiPatch(`/careers/job-postings/${id}/`, { status });
  }

  async function deleteItem(id: number) {
    setDeleted(prev => new Set([...prev, id]));
    await apiDelete(`/careers/job-postings/${id}/`);
  }

  async function handleAdd() {
    setSaving(true);
    try {
      await apiPost("/careers/job-postings/", { ...form, status: "draft" });
      window.location.reload();
    } catch { /* show error if needed */ }
    setSaving(false);
    setShowModal(false);
  }

  const activeCount = jobs.filter(j => j.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Career Management</h1>
          <p className="mt-1 text-[13px] text-zinc-600">Ish o'rinlarini boshqarish.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-cyan-400">
          <Plus className="h-4 w-4" /> New Position
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Active Positions", value: activeCount.toString(), color: "text-emerald-400" },
          { label: "Total Listings", value: jobs.length.toString(), color: "text-cyan-400" },
          { label: "Applicants", value: jobs.reduce((s, j) => s + (j.applicants_count || 0), 0).toString(), color: "text-violet-400" },
          { label: "Draft", value: jobs.filter(j => j.status === "draft").length.toString(), color: "text-yellow-400" },
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
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search positions..." className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600" />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none rounded-xl border border-white/6 bg-white/2 px-4 py-2 pr-8 text-[13px] text-zinc-400 outline-none transition-colors hover:border-white/10">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]">
        {loading ? (
          <div className="px-6 py-10 text-center text-[13px] text-zinc-600">Yuklanmoqda...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map((j) => (
                <tr key={j.id} className="group text-[13px] transition-colors hover:bg-white/2">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{j.title}</p>
                      <p className="text-[12px] text-zinc-600">{j.salary_range}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{j.department}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-zinc-500"><MapPin className="h-3 w-3" />{j.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${typeColors[j.employment_type] || "bg-zinc-400/10 text-zinc-400"}`}>{j.employment_type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={j.status}
                      onChange={(e) => updateStatus(j.id, e.target.value)}
                      className={`appearance-none rounded-full px-2.5 py-0.5 text-[10px] font-bold outline-none cursor-pointer ${statusBadge[j.status] || "bg-zinc-400/10 text-zinc-400"}`}
                    >
                      {["active", "paused", "draft", "closed"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button onClick={() => deleteItem(j.id)} className="rounded-lg border border-white/6 bg-white/2 p-1.5 text-zinc-500 hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-[13px] text-zinc-600">Ish o'rni topilmadi.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-white">New Job Posting</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "title", label: "Job Title", placeholder: "React Developer" },
                { key: "department", label: "Department", placeholder: "Engineering" },
                { key: "location", label: "Location", placeholder: "Uychi, Namangan viloyat" },
                { key: "salary_range", label: "Salary Range", placeholder: "5,000,000–9,000,000 so'm" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-[12px] text-zinc-500">{label}</label>
                  <input value={(form as Record<string, string>)[key]} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-[13px] text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/40" />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-[12px] text-zinc-500">Employment Type</label>
                <select value={form.employment_type} onChange={(e) => setForm(f => ({ ...f, employment_type: e.target.value }))} className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-[13px] text-zinc-400 outline-none focus:border-cyan-500/40">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-zinc-500">Description</label>
                <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Lavozim tavsifi..." className="w-full resize-none rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-[13px] text-white outline-none placeholder:text-zinc-600 focus:border-cyan-500/40" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="rounded-xl border border-white/6 px-4 py-2.5 text-[13px] text-zinc-400 hover:border-white/10 hover:text-white">Cancel</button>
              <button onClick={handleAdd} disabled={saving} className="rounded-xl bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-cyan-400 disabled:opacity-60">{saving ? "Saving..." : "Add Position"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
