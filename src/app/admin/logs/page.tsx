"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { Search, ChevronDown, AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";

type SystemLog = {
  id: number; action: string; user: string; role: string;
  ip_address: string; level: string; module: string; timestamp: string;
};

const levelColors: Record<string, string> = {
  info: "bg-blue-400/10 text-blue-400",
  success: "bg-emerald-400/10 text-emerald-400",
  warning: "bg-yellow-400/10 text-yellow-400",
  error: "bg-red-400/10 text-red-400",
};

const levelIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle,
};

export default function AdminLogs() {
  const { data: logs, loading } = useApi<SystemLog[]>("/logs/system-logs/", []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<SystemLog | null>(null);

  const filtered = logs.filter((log) => {
    if (filter !== "all" && log.level !== filter) return false;
    if (search && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.user.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const errorCount = logs.filter(l => l.level === "error").length;
  const warningCount = logs.filter(l => l.level === "warning").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Logs</h1>
          <p className="mt-1 text-[13px] text-muted">Barcha tizim faoliyatining audit jurnali.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Events", value: logs.length.toString(), color: "text-foreground" },
          { label: "Errors", value: errorCount.toString(), color: "text-red-400" },
          { label: "Warnings", value: warningCount.toString(), color: "text-yellow-400" },
          { label: "Success Events", value: logs.filter(l => l.level === "success").length.toString(), color: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none transition-colors hover:border-border">
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </div>
        <span className="text-[12px] text-muted-foreground">{filtered.length} events</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        {loading ? (
          <div className="px-6 py-10 text-center text-[13px] text-muted">Yuklanmoqda...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((log) => {
                const Icon = levelIcons[log.level] || Info;
                return (
                  <tr key={log.id} onClick={() => setSelected(log)} className="cursor-pointer text-[13px] transition-colors hover:bg-accent/5">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${levelColors[log.level]}`}>
                        <Icon className="h-3 w-3" />{log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="font-medium text-foreground">{log.action}</span></td>
                    <td className="px-6 py-4 text-muted">{log.user || "—"}</td>
                    <td className="px-6 py-4 text-muted">{log.module}</td>
                    <td className="px-6 py-4 font-mono text-[12px] text-muted">{log.ip_address || "—"}</td>
                    <td className="px-6 py-4 text-muted">{log.timestamp?.slice(0, 19).replace("T", " ") || "—"}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-[13px] text-muted">Log yozuvlari topilmadi.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {selected && (() => {
        const Icon = levelIcons[selected.level] || Info;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>

              {/* Level badge */}
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${levelColors[selected.level] || "bg-card-hover text-muted"}`}>
                <Icon className="h-3.5 w-3.5" />{selected.level}
              </span>

              {/* Action */}
              <h2 className="mt-4 text-[18px] font-bold text-foreground">{selected.action}</h2>

              {/* Details grid */}
              <div className="mt-5 space-y-3 rounded-xl border border-border bg-background p-4 text-[13px]">
                {[
                  { label: "Foydalanuvchi", value: selected.user || "—" },
                  { label: "Rol", value: selected.role || "—" },
                  { label: "Modul", value: selected.module || "—" },
                  { label: "IP Manzil", value: selected.ip_address || "—" },
                  { label: "Vaqt", value: selected.timestamp?.slice(0, 19).replace("T", " ") || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-muted">{label}</span>
                    <span className="font-mono text-[12px] font-medium text-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
