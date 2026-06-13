"use client";

import { useState } from "react";
import React from "react";
import { Database, Download, RotateCw, Play, CheckCircle, XCircle, Clock, X } from "lucide-react";

interface Backup {
  id: number;
  name: string;
  type: string;
  size: string;
  status: "completed" | "failed" | "running";
  date: string;
  duration: string;
}

const BACKUPS: Backup[] = [
  { id: 1, name: "full-backup-2026-06-11", type: "Full", size: "4.2 GB", status: "completed", date: "Jun 11, 2026 03:00", duration: "12m 34s" },
  { id: 2, name: "db-backup-2026-06-10", type: "Database", size: "1.8 GB", status: "completed", date: "Jun 10, 2026 03:00", duration: "8m 12s" },
  { id: 3, name: "media-backup-2026-06-10", type: "Media", size: "3.5 GB", status: "completed", date: "Jun 10, 2026 04:00", duration: "15m 45s" },
  { id: 4, name: "full-backup-2026-06-09", type: "Full", size: "4.1 GB", status: "completed", date: "Jun 9, 2026 03:00", duration: "11m 50s" },
  { id: 5, name: "db-backup-2026-06-09", type: "Database", size: "1.8 GB", status: "failed", date: "Jun 9, 2026 03:00", duration: "—" },
];

const statusColors: Record<string, string> = {
  completed: "bg-emerald-400/10 text-emerald-400",
  failed: "bg-red-400/10 text-red-400",
  running: "bg-blue-400/10 text-blue-400",
};

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  completed: CheckCircle,
  failed: XCircle,
  running: RotateCw,
};

const STORAGE_NODES = [
  { name: "PostgreSQL", used: "12.4 GB / 50 GB", usage: 25 },
  { name: "Redis Cache", used: "1.2 GB / 8 GB", usage: 15 },
  { name: "Media Assets (S3)", used: "28.7 GB / 100 GB", usage: 29 },
  { name: "Backup Archive", used: "42.5 GB / 200 GB", usage: 21 },
  { name: "Config & Secrets", used: "0.8 GB / 5 GB", usage: 16 },
];

export default function AdminBackup() {
  const [backups, setBackups] = useState<Backup[]>(BACKUPS);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<Backup | null>(null);

  function handleBackup() {
    setRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setRunning(false);
          const newBackup: Backup = {
            id: Date.now(),
            name: `full-backup-${new Date().toISOString().split("T")[0]}`,
            type: "Full",
            size: "4.3 GB",
            status: "completed",
            date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
            duration: "13m 02s",
          };
          setBackups((prev) => [newBackup, ...prev]);
          return 100;
        }
        return p + 8;
      });
    }, 200);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Backup Center</h1>
          <p className="mt-1 text-[13px] text-muted">Manage automated and manual system backups.</p>
        </div>
        <button onClick={handleBackup} disabled={running} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-accent-dark disabled:opacity-50">
          <RotateCw className={`h-4 w-4 ${running ? "animate-spin" : ""}`} /> {running ? `Backing up... ${progress}%` : "Backup Now"}
        </button>
      </div>

      {running && (
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
          <div className="mb-2 flex items-center justify-between text-[13px]">
            <span className="text-accent">Full backup in progress...</span>
            <span className="text-accent">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-card-hover">
            <div className="h-full rounded-full bg-accent transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Backups", value: backups.length.toString(), color: "text-foreground" },
          { label: "Storage Used", value: "42.5 GB", color: "text-accent" },
          { label: "Last Backup", value: "Today 03:00", color: "text-emerald-400" },
          { label: "Success Rate", value: `${Math.round((backups.filter((b) => b.status === "completed").length / backups.length) * 100)}%`, color: "text-violet-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
            <div className="border-b border-border-subtle px-6 py-4">
              <h2 className="text-[14px] font-bold text-foreground">Backup History</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {backups.map((b) => {
                  const Icon = statusIcons[b.status] || CheckCircle;
                  return (
                    <tr key={b.id} onClick={() => setSelected(b)} className="group cursor-pointer text-[13px] transition-colors hover:bg-accent/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted"><Database className="h-4 w-4" /></div>
                          <span className="font-medium text-foreground">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-bold text-muted">{b.type}</span>
                      </td>
                      <td className="px-6 py-4 text-muted">{b.size}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColors[b.status]}`}>
                          <Icon className="h-3 w-3" />{b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted">{b.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button className="rounded-lg border border-border bg-card p-1.5 text-muted transition-colors hover:border-accent/30 hover:text-accent"><Download className="h-3.5 w-3.5" /></button>
                          <button className="rounded-lg border border-border bg-card p-1.5 text-muted transition-colors hover:border-blue-500/30 hover:text-blue-400"><Play className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border-subtle bg-card p-5">
            <h2 className="mb-4 text-[14px] font-bold text-foreground">Storage Nodes</h2>
            <div className="space-y-4">
              {STORAGE_NODES.map((node) => (
                <div key={node.name}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-muted">{node.name}</span>
                    </div>
                    <span className="text-muted">{node.used}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-card-hover">
                    <div className="h-full rounded-full bg-accent/60" style={{ width: `${node.usage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-card p-5">
            <h2 className="mb-4 text-[14px] font-bold text-foreground">Schedule</h2>
            <div className="space-y-3 text-[13px]">
              {[
                { label: "Daily Full Backup", sub: "Every day at 03:00 UTC", color: "text-accent" },
                { label: "Database Snapshot", sub: "Every 6 hours", color: "text-emerald-400" },
                { label: "Media Sync", sub: "Every 12 hours", color: "text-violet-400" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <Clock className={`h-4 w-4 ${s.color}`} />
                  <div><p className="text-foreground">{s.label}</p><p className="text-muted">{s.sub}</p></div>
                </div>
              ))}
              <div className="mt-3 border-t border-border-subtle pt-3">
                <p className="text-muted">Retention: <span className="text-foreground">30 days</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${statusColors[selected.status]}`}>
              {React.createElement(statusIcons[selected.status] || CheckCircle, { className: "h-3.5 w-3.5" })}
              {selected.status}
            </span>
            <h2 className="mt-4 font-mono text-[16px] font-bold text-foreground">{selected.name}</h2>
            <div className="mt-5 space-y-3 rounded-xl border border-border bg-background p-4 text-[13px]">
              {[
                { label: "Tur", value: selected.type },
                { label: "Hajm", value: selected.size },
                { label: "Sana", value: selected.date },
                { label: "Davomiyligi", value: selected.duration },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-muted">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-[13px] text-muted hover:text-foreground">
                <Download className="h-4 w-4" /> Yuklab olish
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-[13px] text-muted hover:text-foreground">
                <Play className="h-4 w-4" /> Tiklash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
