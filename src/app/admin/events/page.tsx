"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { Search, Plus, Edit3, Trash2, ChevronDown, X, Loader2, Calendar, MapPin, Users } from "lucide-react";

type Event = Record<string, string | number | string[]>;
type Registration = Record<string, string | number>;

const STATUS_COLORS: Record<string, string> = {
  upcoming:  "bg-accent/10 text-accent",
  ongoing:   "bg-emerald-400/10 text-emerald-400",
  past:      "bg-card-hover text-muted",
  cancelled: "bg-red-400/10 text-red-400",
};

const EMPTY_EVENT = {
  title: "", event_type: "Meetup", date: "", end_date: "", location: "Uychi IT Hub",
  description: "", speaker: "", prize: "", seats: "50", status: "upcoming",
};

export default function AdminEvents() {
  const { data: rawEvents, loading: loadE } = useApi<Event[]>("/events/events/", []);
  const { data: rawRegs, loading: loadR }   = useApi<Registration[]>("/events/registrations/", []);

  const [tab, setTab]         = useState<"events" | "registrations">("events");
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [localE, setLocalE]   = useState<Event[] | null>(null);
  const [localR, setLocalR]   = useState<Registration[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm]       = useState({ ...EMPTY_EVENT });
  const [saving, setSaving]   = useState(false);

  const events = localE ?? (Array.isArray(rawEvents) ? rawEvents : []);
  const regs   = localR ?? (Array.isArray(rawRegs) ? rawRegs : []);

  const filteredE = events.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (search && !String(e.title).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const filteredR = regs.filter(r =>
    !search || String(r.full_name).toLowerCase().includes(search.toLowerCase())
  );

  function openEdit(e: Event) {
    setEditing(e);
    setForm({
      title: String(e.title || ""), event_type: String(e.event_type || "Meetup"),
      date: String(e.date || ""), end_date: String(e.end_date || ""),
      location: String(e.location || ""), description: String(e.description || ""),
      speaker: String(e.speaker || ""), prize: String(e.prize || ""),
      seats: String(e.seats || "50"), status: String(e.status || "upcoming"),
    });
    setShowAdd(true);
  }

  async function handleSave(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    const payload = { ...form, seats: Number(form.seats), end_date: form.end_date || "" };
    try {
      if (editing) {
        await apiPatch(`/events/events/${editing.id}/`, payload);
        setLocalE(events.map(e => e.id === editing.id ? { ...e, ...payload } : e));
      } else {
        const slug = String(form.title).toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-") + "-" + Date.now();
        await apiPost("/events/events/", { ...payload, slug, registered_count: 0, accent: "cyan", tags: [] });
        setLocalE([{ ...payload, end_date: form.end_date || "", id: Date.now(), slug, registered_count: 0 } as Event, ...events]);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setSaving(false);
      setShowAdd(false);
      setEditing(null);
      setForm({ ...EMPTY_EVENT });
    }
  }

  async function deleteEvent(id: number) {
    try {
      await apiDelete(`/events/events/${id}/`);
      setLocalE(events.filter(e => e.id !== id));
    } catch { /* silent */ }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tadbirlar Boshqaruvi</h1>
          <p className="mt-1 text-[13px] text-muted">{loadE ? "Yuklanmoqda..." : `${events.length} tadbir · ${regs.length} ro'yxatdan o'tish`}</p>
        </div>
        {tab === "events" && (
          <button onClick={() => { setEditing(null); setForm({ ...EMPTY_EVENT }); setShowAdd(true); }} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
            <Plus className="h-4 w-4" /> Yangi Tadbir
          </button>
        )}
      </div>

      <div className="flex gap-1 rounded-xl border border-border bg-card p-1 w-fit">
        {(["events", "registrations"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${tab === t ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>
            {t === "events" ? `Tadbirlar (${events.length})` : `Ro'yxatdan O'tishlar (${regs.length})`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidirish..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        {tab === "events" && (
          <div className="relative">
            <select value={filter} onChange={e => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none">
              <option value="all">Barchasi</option>
              <option value="upcoming">Kelayotgan</option>
              <option value="ongoing">Davom etmoqda</option>
              <option value="past">O&apos;tgan</option>
              <option value="cancelled">Bekor qilingan</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          </div>
        )}
      </div>

      {tab === "events" && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Tadbir</th>
                <th className="px-6 py-4">Tur</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4">Joylashuv</th>
                <th className="px-6 py-4">O&apos;rinlar</th>
                <th className="px-6 py-4">Holat</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {(loadE ? Array.from({ length: 5 }) : filteredE).map((e, i) =>
                loadE ? (
                  <tr key={i}><td colSpan={7} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
                ) : (
                  <tr key={String((e as Event).id)} className="group text-[13px] transition-colors hover:bg-accent/5">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{String((e as Event).title)}</p>
                      {(e as Event).speaker && <p className="text-[12px] text-muted">{String((e as Event).speaker)}</p>}
                    </td>
                    <td className="px-6 py-4 text-muted">{String((e as Event).event_type)}</td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted"><Calendar className="h-3 w-3" />{String((e as Event).date)}</span></td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted truncate max-w-[150px]"><MapPin className="h-3 w-3 shrink-0" />{String((e as Event).location)}</span></td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted"><Users className="h-3 w-3" />{Number((e as Event).registered_count)}/{Number((e as Event).seats)}</span></td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String((e as Event).status)] || "bg-card-hover text-muted"}`}>{String((e as Event).status)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => openEdit(e as Event)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => deleteEvent(Number((e as Event).id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "registrations" && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Ism</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Telefon</th>
                <th className="px-6 py-4">Kompaniya</th>
                <th className="px-6 py-4">Tadbir</th>
                <th className="px-6 py-4">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {(loadR ? Array.from({ length: 5 }) : filteredR).map((r, i) =>
                loadR ? (
                  <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
                ) : (
                  <tr key={String((r as Registration).id)} className="text-[13px] transition-colors hover:bg-accent/5">
                    <td className="px-6 py-4 font-medium text-foreground">{String((r as Registration).full_name)}</td>
                    <td className="px-6 py-4 text-muted">{String((r as Registration).email)}</td>
                    <td className="px-6 py-4 text-muted">{String((r as Registration).phone || "—")}</td>
                    <td className="px-6 py-4 text-muted">{String((r as Registration).company || "—")}</td>
                    <td className="px-6 py-4 text-muted">{String((r as Registration).event_title || (r as Registration).event || "—")}</td>
                    <td className="px-6 py-4 text-muted">{String((r as Registration).created_at || "").slice(0, 10)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">{editing ? "Tadbirni Tahrirlash" : "Yangi Tadbir"}</h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] text-muted">Tadbir nomi</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Tur</label>
                  <select value={form.event_type} onChange={e => setForm(f => ({ ...f, event_type: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    {["Hackathon","Meetup","Bootcamp","Conference","Training","Workshop"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Holat</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    <option value="upcoming">Kelayotgan</option>
                    <option value="ongoing">Davom etmoqda</option>
                    <option value="past">O&apos;tgan</option>
                    <option value="cancelled">Bekor</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Boshlanish sanasi</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Tugash sanasi</label>
                  <input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] text-muted">Joylashuv</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Ma&apos;ruzachi</label>
                  <input value={form.speaker} onChange={e => setForm(f => ({ ...f, speaker: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">O&apos;rinlar soni</label>
                  <input type="number" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
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
