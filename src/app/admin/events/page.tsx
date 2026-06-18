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

  async function confirmRegistration(id: number) {
    try {
      await apiPatch(`/events/registrations/${id}/`, { status: "confirmed" });
      setLocalR(regs.map(r => r.id === id ? { ...r, status: "confirmed" } : r));
    } catch { /* silent */ }
  }

  async function cancelRegistration(id: number) {
    try {
      await apiPatch(`/events/registrations/${id}/`, { status: "cancelled" });
      setLocalR(regs.map(r => r.id === id ? { ...r, status: "cancelled" } : r));
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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(loadE ? Array.from({ length: 6 }) : filteredE).map((e, i) =>
            loadE ? (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-card-hover" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-card-hover" />
                <div className="h-3 w-full animate-pulse rounded bg-card-hover" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-card-hover" />
              </div>
            ) : (
              <div key={String((e as Event).id)} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground truncate">{String((e as Event).title)}</h3>
                    <span className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String((e as Event).status)] || "bg-card-hover text-muted"}`}>{String((e as Event).status)}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openEdit(e as Event)} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => deleteEvent(Number((e as Event).id))} className="rounded-lg border border-border bg-card p-1.5 text-muted hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <span className="rounded-full bg-accent/10 text-accent self-start px-2.5 py-0.5 text-[10px] font-bold uppercase">{String((e as Event).event_type)}</span>
                <div className="flex items-center gap-4 text-[12px] text-muted flex-wrap">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{String((e as Event).date)}{(e as Event).end_date ? ` — ${String((e as Event).end_date)}` : ""}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3 shrink-0" />{String((e as Event).location)}</span>
                </div>
                {(e as Event).speaker && <p className="text-[12px] text-muted"><span className="text-foreground">Speaker:</span> {String((e as Event).speaker)}</p>}
                <div className="flex items-center gap-1 text-[12px] text-muted"><Users className="h-3 w-3" />{Number((e as Event).registered_count)} / {Number((e as Event).seats)} o&apos;rin</div>
                {(e as Event).description && <p className="text-[12px] text-muted line-clamp-2">{String((e as Event).description)}</p>}
              </div>
            )
          )}
        </div>
      )}

      {tab === "registrations" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(loadR ? Array.from({ length: 6 }) : filteredR).map((r, i) =>
            loadR ? (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="h-5 w-2/3 animate-pulse rounded bg-card-hover" />
                <div className="h-3 w-full animate-pulse rounded bg-card-hover" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-card-hover" />
              </div>
            ) : (
              <div key={String((r as Registration).id)} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground truncate">{String((r as Registration).full_name)}</h3>
                    <p className="text-[12px] text-muted truncate">{String((r as Registration).email)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase shrink-0 ${String((r as Registration).status) === "pending" ? "bg-yellow-400/10 text-yellow-400" : String((r as Registration).status) === "confirmed" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>{String((r as Registration).status)}</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] text-muted flex-wrap">
                  {String((r as Registration).phone) && <span>{String((r as Registration).phone)}</span>}
                  {String((r as Registration).company) && <span>{String((r as Registration).company)}</span>}
                </div>
                <p className="text-[12px] text-muted"><span className="text-foreground">Tadbir:</span> {String((r as Registration).event_title || (r as Registration).event || "—")}</p>
                <p className="text-[12px] text-muted">{String((r as Registration).created_at || "").slice(0, 10)}</p>
                {String((r as Registration).status) === "pending" && (
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => confirmRegistration(Number((r as Registration).id))} className="flex-1 rounded-lg bg-emerald-400/10 py-1.5 text-[11px] font-bold text-emerald-400 hover:bg-emerald-400/20">Tasdiqlash</button>
                    <button onClick={() => cancelRegistration(Number((r as Registration).id))} className="flex-1 rounded-lg bg-red-400/10 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-400/20">Bekor qilish</button>
                  </div>
                )}
              </div>
            )
          )}
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
