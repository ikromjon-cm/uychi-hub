"use client";

import { useState } from "react";
import { useApi, apiDelete } from "@/lib/api";
import { Search, X, Loader2, Trash2, Mail, Phone, MessageSquare, Calendar } from "lucide-react";

type Lead = {
  id: number;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  message: string;
  lead_type: string;
  created_at: string;
};

const TYPE_BADGE: Record<string, string> = {
  contact: "bg-accent/10 text-accent border-accent/20",
  investor: "bg-violet-400/10 text-violet-400 border-violet-400/20",
  startup: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
};

const TYPE_LABEL: Record<string, string> = {
  contact: "Aloqa",
  investor: "Investor",
  startup: "Startup Ariza",
};

export default function AdminLeads() {
  const { data: raw, loading } = useApi<Lead[]>("/hub/admin/leads/", []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [local, setLocal] = useState<Lead[] | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);

  const items = local ?? raw;
  const filtered = items.filter((l) => {
    if (filter !== "all" && l.lead_type !== filter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function handleDelete(id: number) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    try {
      await apiDelete(`/hub/admin/leads/${id}/`);
      setLocal(items.filter((l) => l.id !== id));
      setSelected(null);
    } catch { /* silent */ }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Murojaatlar</h1>
        <p className="mt-1 text-[13px] text-muted">{loading ? "Yuklanmoqda..." : `${items.length} ta murojaat`}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none">
            <option value="all">Hammasi</option>
            <option value="contact">Aloqa</option>
            <option value="investor">Investor</option>
            <option value="startup">Startup</option>
          </select>
        </div>
        <span className="text-[12px] text-muted-foreground">{filtered.length} / {items.length}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl border border-border-subtle bg-card" />
        ))}
        {filtered.map((l) => (
          <div
            key={l.id}
            onClick={() => setSelected(l)}
            className="cursor-pointer rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_-5px_rgba(6,247,227,0.15)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-bold text-foreground">{l.name}</h3>
                <p className="truncate text-[13px] text-muted">{l.email}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${TYPE_BADGE[l.lead_type] || "bg-card-hover text-muted"}`}>
                {TYPE_LABEL[l.lead_type] || l.lead_type}
              </span>
            </div>
            {l.message && (
              <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{l.message}</p>
            )}
            <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{l.created_at?.slice(0, 10) || "—"}</span>
              {l.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{l.phone}</span>}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            <div className="flex items-start justify-between gap-3 pr-8">
              <div>
                <h2 className="text-xl font-bold text-foreground">{selected.name}</h2>
                <span className={`inline-block mt-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${TYPE_BADGE[selected.lead_type] || ""}`}>
                  {TYPE_LABEL[selected.lead_type] || selected.lead_type}
                </span>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <Detail icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={selected.email} />
              {selected.phone && <Detail icon={<Phone className="h-3.5 w-3.5" />} label="Telefon" value={selected.phone} />}
              {selected.company && <Detail icon={<MessageSquare className="h-3.5 w-3.5" />} label="Kompaniya" value={selected.company} />}
              {selected.country && <Detail icon={<MessageSquare className="h-3.5 w-3.5" />} label="Mamlakat" value={selected.country} />}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Xabar</span>
                <p className="mt-1.5 rounded-xl border border-border bg-background p-3 text-[13px] leading-relaxed text-muted whitespace-pre-wrap">{selected.message || "—"}</p>
              </div>
              <Detail icon={<Calendar className="h-3.5 w-3.5" />} label="Yuborilgan" value={selected.created_at?.slice(0, 16).replace("T", " ") || "—"} />
            </div>
            <div className="mt-6 flex gap-2 border-t border-border pt-5">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-bold text-black hover:bg-accent-dark">
                <Mail className="h-3.5 w-3.5" /> Javob yozish
              </a>
              <button onClick={() => handleDelete(selected.id)} className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-[13px] text-red-400 hover:bg-red-500/5">
                <Trash2 className="h-3.5 w-3.5" /> O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px]">
      <span className="text-muted">{icon}</span>
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
