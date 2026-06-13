"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { MOCK_STARTUPS, PARTNERS_LIST, MOCK_JOBS } from "@/lib/mock-data";
import {
  Users, Rocket, TrendingUp, Globe, Newspaper,
  ArrowUpRight, Activity, Loader2, X,
} from "lucide-react";

const LOG_COLORS: Record<string, string> = {
  success: "bg-emerald-400/10 text-emerald-400",
  info:    "bg-blue-400/10 text-blue-400",
  warning: "bg-yellow-400/10 text-yellow-400",
  error:   "bg-red-400/10 text-red-400",
};

type Row = Record<string, unknown>;

export default function AdminDashboard() {
  const mockStartups: Row[] = MOCK_STARTUPS.map(s => ({ ...s, status: "approved" }));
  const mockPartners: Row[] = PARTNERS_LIST.map(p => ({ ...p, status: "active" }));
  const mockJobs: Row[] = MOCK_JOBS.map(j => ({ ...j }));
  const mockNews: Row[] = [
    { id: 1, title: "Uychi AI Hub yangi startaplarni qabul qilmoqda", status: "published", created_at: "2026-06-10" },
    { id: 2, title: "PaxtaSoft AI Seed bosqichida $150K yig'di", status: "published", created_at: "2026-06-08" },
  ];
  const mockLogs: Row[] = [
    { level: "info", action: "Admin panelga kirish", user: "admin", module: "Auth", timestamp: "2026-06-13T10:00:00", ip_address: "127.0.0.1" },
    { level: "success", action: "Yangi startup qo'shildi", user: "admin", module: "Startups", timestamp: "2026-06-13T09:30:00", ip_address: "127.0.0.1" },
  ];
  const mockInvestors: Row[] = [
    { id: 1, name: "Akmal Rahimov", status: "active" },
  ];

  const { data: startups, loading: l1, error: err1 } = useApi<Row[]>("/startups/startup-applications/", [], mockStartups);
  const { data: investors, error: err2 }              = useApi<Row[]>("/investors/investors/", [], mockInvestors);
  const { data: partners, error: err3 }               = useApi<Row[]>("/partners/partners/", [], mockPartners);
  const { data: news, error: err4 }                   = useApi<Row[]>("/news/articles/", [], mockNews);
  const { data: jobs, error: err5 }                   = useApi<Row[]>("/careers/job-postings/", [], mockJobs);
  const { data: logs, error: err6 }                   = useApi<Row[]>("/logs/system-logs/", [], mockLogs);

  const apiError = err1 || err2 || err3 || err4 || err5 || err6;

  const pending    = startups.filter(x => x.status === "pending").length;
  const approved   = startups.filter(x => x.status === "approved").length;
  const activeInv  = investors.filter(x => x.status === "active").length;
  const published  = news.filter(x => x.status === "published").length;
  const drafts     = news.filter(x => x.status === "draft").length;
  const activeJobs = jobs.filter(x => x.status === "active").length;

  const STATS = [
    { label: "Startup Applications", value: startups.length,  change: `${approved} approved`,  icon: Rocket,    color: "text-violet-400",  bg: "bg-violet-400/8 border-violet-400/15",  href: "/admin/startups" },
    { label: "Investors",            value: investors.length,  change: `${activeInv} active`,   icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/8 border-emerald-400/15", href: "/admin/investors" },
    { label: "Partners",             value: partners.length,   change: "global network",         icon: Globe,      color: "text-yellow-400",  bg: "bg-yellow-400/8 border-yellow-400/15",  href: "/admin/partners" },
    { label: "News Articles",        value: news.length,       change: `${published} published`, icon: Newspaper,  color: "text-pink-400",    bg: "bg-pink-400/8 border-pink-400/15",      href: "/admin/news" },
    { label: "Job Postings",         value: jobs.length,       change: `${activeJobs} active`,  icon: Activity,   color: "text-orange-400",  bg: "bg-orange-400/8 border-orange-400/15",  href: "/admin/careers" },
    { label: "System Logs",          value: logs.length,       change: "last events",            icon: Users,      color: "text-accent",      bg: "bg-accent/8 border-cyan-400/15",        href: "/admin/logs" },
  ];

  const recentLogs = logs.slice(0, 8);
  const [selectedLog, setSelectedLog] = useState<Row | null>(null);

  const QUICK = [
    { label: "Pending Startups",  count: pending,   href: "/admin/startups", color: "text-yellow-400" },
    { label: "Active Jobs",       count: activeJobs, href: "/admin/careers",  color: "text-accent" },
    { label: "Draft Articles",    count: drafts,     href: "/admin/news",     color: "text-violet-400" },
    { label: "Active Partners",   count: partners.filter(p => p.status === "active").length, href: "/admin/partners", color: "text-emerald-400" },
    { label: "Recent Logs",       count: recentLogs.length, href: "/admin/logs", color: "text-muted" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-[13px] text-muted">Django backend — real ma&apos;lumotlar</p>
        </div>
        <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${apiError ? "border-red-500/20 bg-red-500/5" : "border-emerald-500/20 bg-emerald-500/5"}`}>
          {l1
            ? <Loader2 className="h-3.5 w-3.5 animate-spin text-muted" />
            : <span className={`h-1.5 w-1.5 rounded-full ${apiError ? "bg-red-400" : "bg-emerald-400 animate-pulse"}`} />
          }
          <span className={`text-[12px] font-medium ${apiError ? "text-red-400" : "text-emerald-400"}`}>
            {l1 ? "Yuklanmoqda" : apiError ? "Backend Ulanmagan" : "API Ulangan"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {STATS.map((s) => (
          <a key={s.label} href={s.href} className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_-5px_rgba(6,247,227,0.12)] cursor-pointer">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-muted">{s.label}</p>
              <p className="mt-0.5 text-xl font-bold text-foreground">
                {l1 ? <span className="text-muted-foreground">—</span> : s.value}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />{s.change}
            </div>
          </a>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border-subtle bg-card">
          <div className="border-b border-border-subtle px-6 py-4 flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-foreground">So&apos;ngi Faollik</h2>
            <a href="/admin/logs" className="text-[12px] text-accent hover:underline">Barchasi →</a>
          </div>
          <div className="divide-y divide-border-subtle">
            {recentLogs.length === 0 && (
              <div className="px-6 py-8 text-center text-[13px] text-muted">
                {l1 ? "Yuklanmoqda..." : "Faollik topilmadi"}
              </div>
            )}
            {recentLogs.map((log, i) => (
              <div key={i} onClick={() => setSelectedLog(log)} className="flex cursor-pointer items-center gap-4 px-6 py-3.5 transition-colors hover:bg-accent/5">
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${LOG_COLORS[String(log.level)] || "bg-card-hover text-muted"}`}>
                  {String(log.level || "info")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{String(log.action || "")}</p>
                  <p className="truncate text-[12px] text-muted">{String(log.user || "")} · {String(log.module || "")}</p>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {String(log.timestamp || "").slice(0, 16).replace("T", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border-subtle bg-card p-5">
            <h2 className="mb-4 text-[14px] font-bold text-foreground">Tezkor Harakatlar</h2>
            <div className="space-y-2">
              {QUICK.map((m) => (
                <a key={m.label} href={m.href} className="flex items-center justify-between rounded-xl border border-border-subtle bg-card px-4 py-3 text-[13px] transition-all hover:border-border hover:bg-card-hover">
                  <span className="text-muted">{m.label}</span>
                  <span className={`rounded-full bg-card-hover px-2 py-0.5 text-[11px] font-bold ${m.color}`}>{m.count}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-card p-5">
            <h2 className="mb-4 text-[14px] font-bold text-foreground">Tizim Holati</h2>
            <div className="space-y-3">
              {[
                { label: "Django API",   val: "Online :8000",      ok: true },
                { label: "PostgreSQL",   val: "Connected",          ok: true },
                { label: "Next.js",      val: "Running :3001",      ok: true },
                { label: "JWT Auth",     val: "Active",             ok: true },
                { label: "Startups API", val: l1 ? "Loading..." : `${startups.length} records`, ok: !l1 },
                { label: "News API",     val: l1 ? "Loading..." : `${news.length} records`,     ok: !l1 },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-[13px]">
                  <span className="text-muted">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={s.ok ? "text-emerald-400" : "text-muted"}>{s.val}</span>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.ok ? "bg-emerald-400" : "bg-muted-foreground"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelectedLog(null)}>
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedLog(null)} className="absolute right-5 top-5 text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            <div className="flex items-center gap-3 pr-8">
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${LOG_COLORS[String(selectedLog.level)] || "bg-card-hover text-muted"}`}>
                {String(selectedLog.level || "info")}
              </span>
              <span className="text-[12px] text-muted">{String(selectedLog.module || "—")}</span>
            </div>
            <h2 className="mt-4 text-[17px] font-bold text-foreground">{String(selectedLog.action || "—")}</h2>
            <div className="mt-5 space-y-3 rounded-xl border border-border bg-background p-4 text-[13px]">
              {[
                { label: "Foydalanuvchi", value: String(selectedLog.user || "—") },
                { label: "Modul", value: String(selectedLog.module || "—") },
                { label: "Vaqt", value: String(selectedLog.timestamp || "—").slice(0, 19).replace("T", " ") },
                { label: "IP Manzil", value: String(selectedLog.ip_address || "—") },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="text-muted">{label}</span>
                  <span className="font-medium text-foreground text-right">{value}</span>
                </div>
              ))}
            </div>
            {selectedLog.details != null && (
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Tafsilotlar</p>
                <p className="whitespace-pre-line rounded-xl border border-border bg-background p-3 text-[12px] text-muted">{String(selectedLog.details)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
