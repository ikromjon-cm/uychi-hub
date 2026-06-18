"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { Search, Plus, Edit3, Trash2, X, Loader2, Star, GitBranch, Trophy } from "lucide-react";

type Student = Record<string, string | number | boolean | string[]>;

const ROLE_COLORS: Record<string, string> = {
  student:  "bg-accent/10 text-accent",
  graduate: "bg-violet-400/10 text-violet-400",
  mentor:   "bg-emerald-400/10 text-emerald-400",
};

const EMPTY: Record<string, string | boolean> = {
  full_name: "", email: "", role: "student", bio: "", course: "",
  specialization: "", score: "0", projects_count: "0", certificates_count: "0",
  github_url: "", linkedin_url: "", portfolio_url: "",
  accent: "cyan", is_featured: false, is_active: true,
};

export default function AdminStudents() {
  const { data: rawStudents, loading } = useApi<Student[]>("/students/profiles/", []);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [local, setLocal]     = useState<Student[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm]       = useState({ ...EMPTY });
  const [saving, setSaving]   = useState(false);

  const students = local ?? (Array.isArray(rawStudents) ? rawStudents : []);
  const filtered = students.filter(s => {
    if (filter !== "all" && s.role !== filter) return false;
    if (search && !String(s.full_name).toLowerCase().includes(search.toLowerCase()) && !String(s.email).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function openEdit(s: Student) {
    setEditing(s);
    setForm({
      full_name: String(s.full_name || ""), email: String(s.email || ""),
      role: String(s.role || "student"), bio: String(s.bio || ""),
      course: String(s.course || ""), specialization: String(s.specialization || ""),
      score: String(s.score || "0"), projects_count: String(s.projects_count || "0"),
      certificates_count: String(s.certificates_count || "0"),
      github_url: String(s.github_url || ""), linkedin_url: String(s.linkedin_url || ""),
      portfolio_url: String(s.portfolio_url || ""), accent: String(s.accent || "cyan"),
      is_featured: Boolean(s.is_featured), is_active: Boolean(s.is_active !== false),
    });
    setShowAdd(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form, score: Number(form.score),
      projects_count: Number(form.projects_count),
      certificates_count: Number(form.certificates_count),
      skills: [], rank: 0,
    };
    try {
      if (editing) {
        await apiPatch(`/students/profiles/${editing.id}/`, payload);
        setLocal(students.map(s => s.id === editing.id ? { ...s, ...payload } : s));
      } else {
        await apiPost("/students/profiles/", payload);
        setLocal([{ ...payload, id: Date.now(), achievements: [] } as Student, ...students]);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setSaving(false);
      setShowAdd(false);
      setEditing(null);
      setForm({ ...EMPTY });
    }
  }

  async function deleteStudent(id: number) {
    try {
      await apiDelete(`/students/profiles/${id}/`);
      setLocal(students.filter(s => s.id !== id));
    } catch { /* silent */ }
  }

  async function toggleFeatured(id: number, current: boolean) {
    await apiPatch(`/students/profiles/${id}/`, { is_featured: !current });
    setLocal(students.map(s => s.id === id ? { ...s, is_featured: !current } : s));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Talabalar Boshqaruvi</h1>
          <p className="mt-1 text-[13px] text-muted">{loading ? "Yuklanmoqda..." : `${students.length} ta profil`}</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ ...EMPTY }); setShowAdd(true); }} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
          <Plus className="h-4 w-4" /> Yangi Profil
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidirish..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
          {["all", "student", "graduate", "mentor"].map(r => (
            <button key={r} onClick={() => setFilter(r)} className={`rounded-lg px-3 py-1.5 text-[12px] font-medium capitalize transition-colors ${filter === r ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>
              {r === "all" ? "Barchasi" : r === "student" ? "Talaba" : r === "graduate" ? "Bitiruvchi" : "Mentor"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {(loading ? Array.from({ length: 6 }) : filtered).map((s, i) =>
          loading ? (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="h-5 w-3/5 animate-pulse rounded bg-card-hover" />
              <div className="h-3 w-full animate-pulse rounded bg-card-hover" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-card-hover" />
              <div className="flex gap-2">
                <div className="h-8 w-full animate-pulse rounded-xl bg-card-hover" />
                <div className="h-8 w-full animate-pulse rounded-xl bg-card-hover" />
              </div>
            </div>
          ) : (
            <div key={String((s as Student).id)} className="group rounded-2xl border border-border bg-card p-5 space-y-3 transition-colors hover:bg-accent/[0.02]">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{String((s as Student).full_name)}</p>
                  <p className="truncate text-[12px] text-muted">{String((s as Student).email)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${ROLE_COLORS[String((s as Student).role)] || "bg-card-hover text-muted"}`}>{String((s as Student).role)}</span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{Number((s as Student).score)}
                </span>
                <span className="text-muted">{(s as Student).course ? String((s as Student).course) : "—"}</span>
                <span className="truncate text-muted">{(s as Student).specialization ? String((s as Student).specialization) : "—"}</span>
              </div>

              <div className="flex gap-3 text-[12px] text-muted-foreground">
                <span>Loyiha: {Number((s as Student).projects_count)}</span>
                <span>Sertifikat: {Number((s as Student).certificates_count)}</span>
              </div>

              <div className="flex items-center gap-2">
                {(s as Student).github_url ? (
                  <a href={String((s as Student).github_url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] text-accent hover:underline">
                    <GitBranch className="h-3.5 w-3.5" />GitHub
                  </a>
                ) : <span className="text-[12px] text-muted">—</span>}
              </div>

              {(s as Student).bio ? (
                <p className="line-clamp-2 text-[12px] leading-relaxed text-muted">{String((s as Student).bio)}</p>
              ) : null}

              <div className="flex items-center justify-between gap-2 pt-1">
                <button onClick={() => toggleFeatured(Number((s as Student).id), Boolean((s as Student).is_featured))} className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${(s as Student).is_featured ? "border-yellow-400/30 text-yellow-400 bg-yellow-400/10" : "border-border text-muted hover:border-yellow-400/30"}`}>
                  <Trophy className="h-3 w-3" />{(s as Student).is_featured ? "Ha" : "Yo'q"}
                </button>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => openEdit(s as Student)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
                  <button onClick={() => deleteStudent(Number((s as Student).id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">{editing ? "Profilni Tahrirlash" : "Yangi Profil"}</h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] text-muted">Ism Familya</label>
                  <input value={String(form.full_name)} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] text-muted">Email</label>
                  <input type="email" value={String(form.email)} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Rol</label>
                  <select value={String(form.role)} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    <option value="student">Talaba</option>
                    <option value="graduate">Bitiruvchi</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Ball</label>
                  <input type="number" value={String(form.score)} onChange={e => setForm(f => ({ ...f, score: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Kurs</label>
                  <input value={String(form.course)} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Ixtisoslik</label>
                  <input value={String(form.specialization)} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Loyihalar</label>
                  <input type="number" value={String(form.projects_count)} onChange={e => setForm(f => ({ ...f, projects_count: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Sertifikatlar</label>
                  <input type="number" value={String(form.certificates_count)} onChange={e => setForm(f => ({ ...f, certificates_count: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] text-muted">GitHub URL</label>
                  <input value={String(form.github_url)} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] text-muted">Bio</label>
                  <textarea value={String(form.bio)} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={2} className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={Boolean(form.is_featured)} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="h-4 w-4 accent-accent" />
                <span className="text-[13px] text-muted">Featured (asosiy sahifada ko&apos;rsatish)</span>
              </label>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => { setShowAdd(false); setEditing(null); }} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] text-muted hover:text-foreground">Bekor</button>
                <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark disabled:opacity-60">
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}{editing ? "Saqlash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
