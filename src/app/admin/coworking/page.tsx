"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { Search, Plus, Edit3, Trash2, X, Loader2, Building2, Calendar, Clock } from "lucide-react";

type Space = Record<string, string | number | boolean | string[]>;
type Booking = Record<string, string | number>;

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-400/10 text-yellow-400",
  confirmed: "bg-emerald-400/10 text-emerald-400",
  cancelled: "bg-red-400/10 text-red-400",
  completed: "bg-card-hover text-muted",
};
const TYPE_LABELS: Record<string, string> = {
  desk: "Ish Stoli", meeting_room: "Yig'ilish Xonasi",
  private_office: "Xususiy Ofis", lab: "Laboratoriya", conference_hall: "Konferens Zal",
};

const EMPTY_SPACE = {
  name: "", space_type: "desk", capacity: "10", price_per_hour: "15000",
  price_per_day: "100000", description: "", is_active: true,
};

export default function AdminCoworking() {
  const { data: rawSpaces, loading: loadS } = useApi<Space[]>("/coworking/coworking-spaces/", []);
  const { data: rawBookings, loading: loadB } = useApi<Booking[]>("/coworking/bookings/", []);

  const [tab, setTab]         = useState<"spaces" | "bookings">("spaces");
  const [search, setSearch]   = useState("");
  const [localS, setLocalS]   = useState<Space[] | null>(null);
  const [localB, setLocalB]   = useState<Booking[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Space | null>(null);
  const [form, setForm]       = useState({ ...EMPTY_SPACE });
  const [saving, setSaving]   = useState(false);

  const spaces   = localS ?? (Array.isArray(rawSpaces) ? rawSpaces : []);
  const bookings = localB ?? (Array.isArray(rawBookings) ? rawBookings : []);

  const filteredS = spaces.filter(s => !search || String(s.name).toLowerCase().includes(search.toLowerCase()));
  const filteredB = bookings.filter(b => !search || String(b.full_name).toLowerCase().includes(search.toLowerCase()) || String(b.email).toLowerCase().includes(search.toLowerCase()));

  function openEdit(s: Space) {
    setEditing(s);
    setForm({
      name: String(s.name || ""), space_type: String(s.space_type || "desk"),
      capacity: String(s.capacity || "10"), price_per_hour: String(s.price_per_hour || "15000"),
      price_per_day: String(s.price_per_day || "100000"),
      description: String(s.description || ""), is_active: Boolean(s.is_active),
    });
    setShowAdd(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form, capacity: Number(form.capacity),
      price_per_hour: Number(form.price_per_hour),
      price_per_day: Number(form.price_per_day),
    };
    try {
      if (editing) {
        await apiPatch(`/coworking/coworking-spaces/${editing.id}/`, payload);
        setLocalS(spaces.map(s => s.id === editing.id ? { ...s, ...payload } : s));
      } else {
        const slug = String(form.name).toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-") + "-" + Date.now();
        await apiPost("/coworking/coworking-spaces/", { ...payload, slug, accent: "cyan", amenities: [] });
        setLocalS([{ ...payload, id: Date.now(), slug, amenities: [] } as Space, ...spaces]);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setSaving(false);
      setShowAdd(false);
      setEditing(null);
      setForm({ ...EMPTY_SPACE });
    }
  }

  async function deleteSpace(id: number) {
    await apiDelete(`/coworking/coworking-spaces/${id}/`);
    setLocalS(spaces.filter(s => s.id !== id));
  }

  async function updateBookingStatus(id: number, status: string) {
    await apiPatch(`/coworking/bookings/${id}/`, { status });
    setLocalB(bookings.map(b => b.id === id ? { ...b, status } : b));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Coworking Boshqaruvi</h1>
          <p className="mt-1 text-[13px] text-muted">{loadS ? "Yuklanmoqda..." : `${spaces.length} joy · ${bookings.length} bron`}</p>
        </div>
        {tab === "spaces" && (
          <button onClick={() => { setEditing(null); setForm({ ...EMPTY_SPACE }); setShowAdd(true); }} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
            <Plus className="h-4 w-4" /> Yangi Joy
          </button>
        )}
      </div>

      <div className="flex gap-1 rounded-xl border border-border bg-card p-1 w-fit">
        {(["spaces", "bookings"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${tab === t ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>
            {t === "spaces" ? `Joylar (${spaces.length})` : `Bronlar (${bookings.length})`}
            {t === "bookings" && bookings.filter(b => b.status === "pending").length > 0 && (
              <span className="ml-2 rounded-full bg-yellow-400/20 px-1.5 py-0.5 text-[10px] font-bold text-yellow-400">{bookings.filter(b => b.status === "pending").length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 w-fit">
        <Search className="h-4 w-4 text-muted" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidirish..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
      </div>

      {tab === "spaces" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(loadS ? Array.from({ length: 6 }) : filteredS).map((s, i) =>
            loadS ? (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-border bg-card" />
            ) : (
              <div key={String((s as Space).id)} className="rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:border-accent/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10"><Building2 className="h-5 w-5 text-accent" /></div>
                    <div>
                      <h3 className="text-[14px] font-bold text-foreground">{String((s as Space).name)}</h3>
                      <p className="text-[12px] text-muted">{TYPE_LABELS[String((s as Space).space_type)] || String((s as Space).space_type)}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${(s as Space).is_active ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                    {(s as Space).is_active ? "Aktiv" : "Yopiq"}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border-subtle pt-4 text-[13px]">
                  <div><p className="text-muted text-[11px]">Sig&apos;im</p><p className="font-semibold text-foreground">{String((s as Space).capacity)} kishi</p></div>
                  <div><p className="text-muted text-[11px]">Soatlik</p><p className="font-semibold text-foreground">{Number((s as Space).price_per_hour).toLocaleString()} so&apos;m</p></div>
                  <div className="col-span-2"><p className="text-muted text-[11px]">Kunlik</p><p className="font-semibold text-foreground">{Number((s as Space).price_per_day).toLocaleString()} so&apos;m</p></div>
                </div>
                <div className="mt-4 flex gap-2 border-t border-border-subtle pt-4">
                  <button onClick={() => openEdit(s as Space)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2 text-[12px] text-muted hover:border-accent/30 hover:text-accent">
                    <Edit3 className="h-3.5 w-3.5" /> Tahrirlash
                  </button>
                  <button onClick={() => deleteSpace(Number((s as Space).id))} className="flex items-center justify-center rounded-xl border border-border p-2 text-muted hover:border-red-500/30 hover:text-red-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {tab === "bookings" && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Mijoz</th>
                <th className="px-6 py-4">Joy</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4">Vaqt</th>
                <th className="px-6 py-4">Holat</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {(loadB ? Array.from({ length: 5 }) : filteredB).map((b, i) =>
                loadB ? (
                  <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="h-4 animate-pulse rounded bg-card-hover" /></td></tr>
                ) : (
                  <tr key={String((b as Booking).id)} className="group text-[13px] transition-colors hover:bg-accent/5">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{String((b as Booking).full_name)}</p>
                      <p className="text-[12px] text-muted">{String((b as Booking).email)}</p>
                    </td>
                    <td className="px-6 py-4 text-muted">{String((b as Booking).space_name || (b as Booking).space || "—")}</td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted"><Calendar className="h-3 w-3" />{String((b as Booking).date)}</span></td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted"><Clock className="h-3 w-3" />{String((b as Booking).start_time)} – {String((b as Booking).end_time)}</span></td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[String((b as Booking).status)] || "bg-card-hover text-muted"}`}>{String((b as Booking).status)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {["confirmed", "pending", "cancelled", "completed"].map(st => (
                          <button key={st} onClick={() => updateBookingStatus(Number((b as Booking).id), st)}
                            className={`rounded-lg border px-2 py-1 text-[10px] font-semibold transition-all ${String((b as Booking).status) === st ? (STATUS_COLORS[st] || "") + " border-current" : "border-border text-muted hover:border-accent/30"}`}>
                            {st === "confirmed" ? "✓" : st === "cancelled" ? "✗" : st === "completed" ? "✔✔" : "⏳"}
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

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">{editing ? "Joyni Tahrirlash" : "Yangi Joy"}</h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] text-muted">Joy nomi</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Tur</label>
                  <select value={form.space_type} onChange={e => setForm(f => ({ ...f, space_type: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none">
                    {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Sig&apos;im (kishi)</label>
                  <input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Soatlik narx (so&apos;m)</label>
                  <input type="number" value={form.price_per_hour} onChange={e => setForm(f => ({ ...f, price_per_hour: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-muted">Kunlik narx (so&apos;m)</label>
                  <input type="number" value={form.price_per_day} onChange={e => setForm(f => ({ ...f, price_per_day: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-muted">Tavsif</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={Boolean(form.is_active)} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="h-4 w-4 accent-accent" />
                <span className="text-[13px] text-muted">Faol (bronlash mumkin)</span>
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
