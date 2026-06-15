"use client";

import { useState } from "react";
import { useApi, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { Search, Plus, X, Loader2, Trash2, Eye, Check, XCircle } from "lucide-react";

type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  options?: { label: string; value: string }[];
  span?: 1 | 2;
};

type Props = {
  endpoint: string;
  title: string;
  description: string;
  fields: FieldDef[];
  emptyForm: Record<string, string>;
};

export function AdminHubList({ endpoint, title, description, fields, emptyForm }: Props) {
  const { data: raw, loading } = useApi<Record<string, unknown>[]>(endpoint, []);
  const [search, setSearch] = useState("");
  const [local, setLocal] = useState<Record<string, unknown>[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const items = local ?? raw;
  const filtered = items.filter((item) =>
    fields.some((f) =>
      String(item[f.key] || "").toLowerCase().includes(search.toLowerCase()),
    ),
  );

  async function handleStatus(id: number, status: string) {
    try {
      const res = await apiPatch(`${endpoint}${id}/`, { status });
      setLocal(items.map((i) => (i.id === id ? { ...i, ...res } : i)));
      setSelected(null);
    } catch { /* silent */ }
  }

  function statusBadge(status: string) {
    if (status === "approved") return <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-semibold text-green-400">Approved</span>;
    if (status === "rejected") return <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-400">Rejected</span>;
    return <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-[11px] font-semibold text-yellow-400">Pending</span>;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = { ...form };
    for (const f of fields) {
      if (body[f.key] === "true") body[f.key] = true as unknown as string;
      if (body[f.key] === "false") body[f.key] = false as unknown as string;
    }
    try {
      const res = selected
        ? await apiPatch(`${endpoint}${selected.id}/`, body)
        : await apiPost(endpoint, body);
      if (selected) {
        setLocal(items.map((i) => (i.id === selected.id ? { ...i, ...res } : i)));
      } else {
        setLocal([{ ...form, id: Date.now() }, ...items]);
      }
      setShowAdd(false);
      setSelected(null);
      setForm({ ...emptyForm });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    try {
      await apiDelete(`${endpoint}${id}/`);
      setLocal(items.filter((i) => i.id !== id));
      setSelected(null);
    } catch { /* silent */ }
  }

  function openEdit(item: Record<string, unknown>) {
    setSelected(item);
    setForm(Object.fromEntries(fields.map((f) => [f.key, String(item[f.key] || "")])));
    setShowAdd(true);
  }

  const visibleFields = fields.filter((f) => f.key !== "id" && f.key !== "created_at");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-[13px] text-muted">
            {loading ? "Yuklanmoqda..." : `${items.length} ta`}
          </p>
        </div>
        <button
          onClick={() => {
            setSelected(null);
            setForm({ ...emptyForm });
            setShowAdd(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4" /> Qo&apos;shish
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Qidirish..."
            className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted"
          />
        </div>
        <span className="text-[12px] text-muted-foreground">
          {filtered.length} / {items.length}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl border border-border-subtle bg-card" />
          ))}
          {filtered.map((item) => {
          const first = fields[0]?.key || "id";
          const second = fields[1]?.key || first;
          const titleVal = String(item[first] || "—");
          const descVal = String(item[second] || "");
          return (
            <div
              key={String(item.id)}
              className="cursor-pointer rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_-5px_rgba(6,247,227,0.15)]"
              onClick={() => setSelected(item)}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-bold text-foreground">{titleVal}</h3>
                {item.status ? statusBadge(item.status as string) : null}
              </div>
              {descVal && (
                <p className="mt-1 text-[13px] text-muted line-clamp-2">{descVal}</p>
              )}
              <div className="mt-3 flex items-center gap-2 border-t border-border-subtle pt-3" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted hover:border-accent/30 hover:text-accent"
                >
                  <Eye className="h-3.5 w-3.5" /> Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(Number(item.id))}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted hover:border-red-500/30 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" /> O&apos;chirish
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail/Edit Modal */}
      {selected && !showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 text-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground">
              {String(selected[fields[0]?.key] || "Tafsilot")}
            </h2>
            <div className="mt-5 space-y-3">
              {fields
                .filter((f) => f.key !== "id")
                .map((f) => (
                  <div key={f.key}>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {f.label}
                    </span>
                    <p className="mt-1 text-[13px] text-foreground">
                      {String(selected[f.key] || "—")}
                    </p>
                  </div>
                ))}
            </div>
            {selected.status ? (
              <div className="mt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Status</span>
                <div className="mt-1">{statusBadge(selected.status as string)}</div>
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
              {(selected.status as string) === "pending" && (
                <>
                  <button
                    onClick={() => handleStatus(Number(selected.id), "approved")}
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-[13px] font-bold text-black hover:bg-green-400"
                  >
                    <Check className="h-4 w-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleStatus(Number(selected.id), "rejected")}
                    className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2.5 text-[13px] text-red-400 hover:bg-red-500/30"
                  >
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </>
              )}
              <button
                onClick={() => openEdit(selected)}
                className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark"
              >
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(Number(selected.id))}
                className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-[13px] text-red-400 hover:bg-red-500/5"
              >
                <Trash2 className="h-3.5 w-3.5" /> O&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">
                {selected ? "Tahrirlash" : "Yangi Qo'shish"}
              </h2>
              <button
                onClick={() => { setShowAdd(false); setSelected(null); }}
                className="text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {visibleFields.map((f) => {
                  const inputClass =
                    "w-full rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40";
                  return (
                    <div key={f.key} className={f.span === 2 ? "col-span-2" : ""}>
                      <label className="mb-1 block text-[11px] text-muted">{f.label}</label>
                      {f.type === "textarea" ? (
                        <textarea
                          value={form[f.key] || ""}
                          onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      ) : f.type === "select" && f.options ? (
                        <select
                          value={form[f.key] || ""}
                          onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                          className={inputClass}
                        >
                          {f.options.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          value={form[f.key] || ""}
                          onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                          required={!selected}
                          className={inputClass}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {error && <p className="text-[12px] text-red-400">{error}</p>}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowAdd(false); setSelected(null); }}
                  className="flex-1 rounded-xl border border-border py-2.5 text-[13px] text-muted hover:text-foreground"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
