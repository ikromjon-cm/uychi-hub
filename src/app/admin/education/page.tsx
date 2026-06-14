"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { Search, Plus, Edit3, Trash2, ChevronDown, X, Loader2, BookOpen, Users, Star } from "lucide-react";

type Course = Record<string, string | number | boolean | string[]>;
type Application = Record<string, string | number>;

const STATUS_COLORS: Record<string, string> = {
  active:   "bg-emerald-400/10 text-emerald-400",
  draft:    "bg-yellow-400/10 text-yellow-400",
  archived: "bg-card-hover text-muted",
};
const APP_STATUS_COLORS: Record<string, string> = {
  pending:  "bg-yellow-400/10 text-yellow-400",
  approved: "bg-emerald-400/10 text-emerald-400",
  rejected: "bg-red-400/10 text-red-400",
};

const EMPTY_COURSE = { title: "", instructor: "", category: "frontend", level: "beginner", duration: "3 oy", lessons: "40", price: "0", is_free: true, lang: "uz", description: "", status: "active" };

export default function AdminEducation() {
  const { data: rawCourses, loading: loadC } = useApi<Course[]>("/education/courses/", []);
  const { data: rawApps, loading: loadA }    = useApi<Application[]>("/education/applications/", []);

  const [tab, setTab]           = useState<"courses" | "applications">("courses");
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [localC, setLocalC]     = useState<Course[] | null>(null);
  const [localA, setLocalA]     = useState<Application[] | null>(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [editing, setEditing]   = useState<Course | null>(null);
  const [form, setForm]         = useState({ ...EMPTY_COURSE });
  const [saving, setSaving]     = useState(false);

  const courses = localC ?? (Array.isArray(rawCourses) ? rawCourses : []);
  const apps    = localA ?? (Array.isArray(rawApps) ? rawApps : []);

  const filteredC = courses.filter(c => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search && !String(c.title).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const filteredA = apps.filter(a =>
    !search || String(a.full_name).toLowerCase().includes(search.toLowerCase()) || String(a.email).toLowerCase().includes(search.toLowerCase())
  );

  function openEdit(c: Course) {
    setEditing(c);
    setForm({
      title: String(c.title || ""), instructor: String(c.instructor || ""),
      category: String(c.category || "frontend"), level: String(c.level || "beginner"),
      duration: String(c.duration || ""), lessons: String(c.lessons || "0"),
      price: String(c.price || "0"), is_free: Boolean(c.is_free),
      lang: String(c.lang || "uz"), description: String(c.description || ""),
      status: String(c.status || "active"),
    });
    setShowAdd(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, lessons: Number(form.lessons), price: Number(form.price) };
    try {
      if (editing) {
        await apiPatch(`/education/courses/${editing.id}/`, payload);
        setLocalC(courses.map(c => c.id === editing.id ? { ...c, ...payload } : c));
      } else {
        const slug = String(form.title).toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-") + "-" + Date.now();
        await apiPost("/education/courses/", { ...payload, slug, enrolled_count: 0, rating: "4.5", accent: "cyan", tags: [] });
        setLocalC([{ ...payload, id: Date.now(), slug, enrolled_count: 0, rating: "4.5" } as Course, ...courses]);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setSaving(false);
      setShowAdd(false);
      setEditing(null);
      setForm({ ...EMPTY_COURSE });
    }
  }

  async function deleteCourse(id: number) {
    try {
      await apiDelete(`/education/courses/${id}/`);
      setLocalC(courses.filter(c => c.id !== id));
    } catch { /* silent */ }
  }

  async function updateAppStatus(id: number, status: string) {
    await apiPatch(`/education/applications/${id}/`, { status });
    setLocalA(apps.map(a => a.id === id ? { ...a, status } : a));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ta&apos;lim Boshqaruvi</h1>
          <p className="mt-1 text-[13px] text-muted">{loadC ? "Yuklanmoqda..." : `${courses.length} kurs · ${apps.length} ariza`}</p>
        </div>
        {tab === "courses" && (
          <button onClick={() => { setEditing(null); setForm({ ...EMPTY_COURSE }); setShowAdd(true); }} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
            <Plus className="h-4 w-4" /> Yangi Kurs
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1 w-fit">
        {(["courses", "applications"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${tab === t ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>
            {t === "courses" ? `Kurslar (${courses.length})` : `Arizalar (${apps.length})`}
            {t === "applications" && apps.filter(a => a.status === "pending").length > 0 && (
              <span className="ml-2 rounded-full bg-yellow-400/20 px-1.5 py-0.5 text-[10px] font-bold text-yellow-400">{apps.filter(a => a.status === "pending").length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={tab === "courses" ? "Kurs qidirish..." : "Ariza qidirish..."} className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        {tab === "courses" && (
          <div className="relative">
            <select value={filter} onChange={e => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none">
              <option value="all">Barchasi</option>
              <option value="active">Aktiv</option>
              <option value="draft">Qoralama</option>
              <option value="archived">Arxiv</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          </div>
        )}
      </div>

      {/* Courses Table */}
      {tab === "courses" && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Kurs</th>
                <th className="px-6 py-4">O&apos;qituvchi</th>
                <th className="px-6 py-4">Daraja</th>
                <th className="px-6 py-4">Narx</th>
                <th className="px-6 py-4">O&apos;quvchilar</th>
                <th className="px-6 py-4">Reyting</th>
                <th className="px-6 py-4">Holat</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {(loadC ? Array.from({ length: 5 }) : filteredC).map((c, i) =>
                loadC ? (
                  <tr key={i}><td colSpan={8} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
                ) : (
                  <tr key={String((c as Course).id)} className="group text-[13px] transition-colors hover:bg-accent/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10"><BookOpen className="h-4 w-4 text-accent" /></div>
                        <div>
                          <p className="font-medium text-foreground">{String((c as Course).title)}</p>
                          <p className="text-[12px] text-muted">{String((c as Course).category)} · {String((c as Course).lang)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">{String((c as Course).instructor)}</td>
                    <td className="px-6 py-4 capitalize text-muted">{String((c as Course).level)}</td>
                    <td className="px-6 py-4 text-muted">{(c as Course).is_free ? <span className="text-emerald-400 font-semibold">Bepul</span> : `${Number((c as Course).price).toLocaleString()} so'm`}</td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted"><Users className="h-3 w-3" />{Number((c as Course).enrolled_count).toLocaleString()}</span></td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-yellow-400"><Star className="h-3 w-3 fill-yellow-400" />{String((c as Course).rating)}</span></td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String((c as Course).status)] || "bg-card-hover text-muted"}`}>{String((c as Course).status)}</span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => openEdit(c as Course)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => deleteCourse(Number((c as Course).id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Applications Table */}
      {tab === "applications" && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Ariza Beruvchi</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Telefon</th>
                <th className="px-6 py-4">Kurs</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4">Holat</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {(loadA ? Array.from({ length: 5 }) : filteredA).map((a, i) =>
                loadA ? (
                  <tr key={i}><td colSpan={7} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
                ) : (
                  <tr key={String((a as Application).id)} className="group text-[13px] transition-colors hover:bg-accent/5">
                    <td className="px-6 py-4 font-medium text-foreground">{String((a as Application).full_name)}</td>
                    <td className="px-6 py-4 text-muted">{String((a as Application).email)}</td>
                    <td className="px-6 py-4 text-muted">{String((a as Application).phone || "—")}</td>
                    <td className="px-6 py-4 text-muted">{String((a as Application).course_title || (a as Application).course || "—")}</td>
                    <td className="px-6 py-4 text-muted">{String((a as Application).created_at || "").slice(0, 10)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${APP_STATUS_COLORS[String((a as Application).status)] || "bg-card-hover text-muted"}`}>{String((a as Application).status)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {["approved", "pending", "rejected"].map(st => (
                          <button key={st} onClick={() => updateAppStatus(Number((a as Application).id), st)}
                            className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${String((a as Application).status) === st ? (APP_STATUS_COLORS[st] || "") + " border-current" : "border-border text-muted hover:border-accent/30"}`}>
                            {st === "approved" ? "✓" : st === "rejected" ? "✗" : "⏳"}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">{editing ? "Kursni Tahrirlash" : "Yangi Kurs"}</h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] text-muted">Kurs nomi</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] text-muted">O&apos;qituvchi</label>
                  <input value={form.instructor} onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Kategoriya</label>
                  <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Daraja</label>
                  <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    <option value="beginner">Boshlang&apos;ich</option>
                    <option value="intermediate">O&apos;rta</option>
                    <option value="advanced">Yuqori</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Til</label>
                  <select value={form.lang} onChange={e => setForm(f => ({ ...f, lang: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    <option value="uz">O&apos;zbek</option>
                    <option value="ru">Rus</option>
                    <option value="en">Ingliz</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Davomiyligi</label>
                  <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="3 oy" className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Darslar soni</label>
                  <input type="number" value={form.lessons} onChange={e => setForm(f => ({ ...f, lessons: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Narx (so&apos;m)</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value, is_free: Number(e.target.value) === 0 }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Holat</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    <option value="active">Aktiv</option>
                    <option value="draft">Qoralama</option>
                    <option value="archived">Arxiv</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted">Tavsif</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
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
