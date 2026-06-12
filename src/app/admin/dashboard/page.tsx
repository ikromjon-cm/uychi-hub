"use client";

import { useApi } from "@/lib/api";
import {
  Users, Rocket, TrendingUp, Globe, Newspaper,
  ArrowUpRight, Activity, Loader2,
} from "lucide-react";

const LOG_COLORS: Record<string, string> = {
  success: "bg-emerald-400/10 text-emerald-400",
  info:    "bg-blue-400/10 text-blue-400",
  warning: "bg-yellow-400/10 text-yellow-400",
  error:   "bg-red-400/10 text-red-400",
};

type Row = Record<string, unknown>;

export default function AdminDashboard() {
  const { data: startups, loading: l1 } = useApi<Row[]>("/startups/startup-applications/", []);
  const { data: investors }              = useApi<Row[]>("/investors/investors/", []);
  const { data: partners }               = useApi<Row[]>("/partners/partners/", []);
  const { data: news }                   = useApi<Row[]>("/news/articles/", []);
  const { data: jobs }                   = useApi<Row[]>("/careers/job-postings/", []);
  const { data: logs }                   = useApi<Row[]>("/logs/system-logs/", []);

  const pending    = startups.filter(x => x.status === "pending").length;
  const approved   = startups.filter(x => x.status === "approved").length;
  const activeInv  = investors.filter(x => x.status === "active").length;
  const published  = news.filter(x => x.status === "published").length;
  const drafts     = news.filter(x => x.status === "draft").length;
  const activeJobs = jobs.filter(x => x.status === "active").length;

  const STATS = [
    { label: "Startup Applications", value: startups.length,  change: `${approved} approved`,  icon: Rocket,    color: "text-violet-400",  bg: "bg-violet-400/8 border-violet-400/15" },
    { label: "Investors",            value: investors.length,  change: `${activeInv} active`,   icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/8 border-emerald-400/15" },
    { label: "Partners",             value: partners.length,   change: "global network",         icon: Globe,      color: "text-yellow-400",  bg: "bg-yellow-400/8 border-yellow-400/15" },
    { label: "News Articles",        value: news.length,       change: `${published} published`, icon: Newspaper,  color: "text-pink-400",    bg: "bg-pink-400/8 border-pink-400/15" },
    { label: "Job Postings",         value: jobs.length,       change: `${activeJobs} active`,  icon: Activity,   color: "text-orange-400",  bg: "bg-orange-400/8 border-orange-400/15" },
    { label: "System Logs",          value: logs.length,       change: "last events",            icon: Users,      color: "text-cyan-400",    bg: "bg-cyan-400/8 border-cyan-400/15" },
  ];

  const recentLogs = logs.slice(0, 8);

  const QUICK = [
    { label: "Pending Startups",  count: pending,   href: "/admin/startups", color: "text-yellow-400" },
    { label: "Active Jobs",       count: activeJobs, href: "/admin/careers",  color: "text-cyan-400" },
    { label: "Draft Articles",    count: drafts,     href: "/admin/news",     color: "text-violet-400" },
    { label: "Active Partners",   count: partners.filter(p => p.status === "active").length, href: "/admin/partners", color: "text-emerald-400" },
    { label: "Recent Logs",       count: recentLogs.length, href: "/admin/logs", color: "text-zinc-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-[13px] text-zinc-600">Django backend — real ma&apos;lumotlar</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
          {l1
            ? <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
            : <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          }
          <span className="text-[12px] font-medium text-emerald-400">
            {l1 ? "Yuklanmoqda" : "API Ulangan"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#0a0a0a] p-5">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-zinc-600">{s.label}</p>
              <p className="mt-0.5 text-xl font-bold text-white">
                {l1 ? <span className="text-zinc-700">—</span> : s.value}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />{s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#0a0a0a]">
          <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-white">So&apos;ngi Faollik</h2>
            <a href="/admin/logs" className="text-[12px] text-cyan-400 hover:underline">Barchasi →</a>
          </div>
          <div className="divide-y divide-white/4">
            {recentLogs.length === 0 && (
              <div className="px-6 py-8 text-center text-[13px] text-zinc-600">
                {l1 ? "Yuklanmoqda..." : "Faollik topilmadi"}
              </div>
            )}
            {recentLogs.map((log, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${LOG_COLORS[String(log.level)] || "bg-zinc-400/10 text-zinc-400"}`}>
                  {String(log.level || "info")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-white">{String(log.action || "")}</p>
                  <p className="truncate text-[12px] text-zinc-600">{String(log.user || "")} · {String(log.module || "")}</p>
                </div>
                <span className="shrink-0 text-[11px] text-zinc-700">
                  {String(log.timestamp || "").slice(0, 16).replace("T", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-5">
            <h2 className="mb-4 text-[14px] font-bold text-white">Tezkor Harakatlar</h2>
            <div className="space-y-2">
              {QUICK.map((m) => (
                <a key={m.label} href={m.href} className="flex items-center justify-between rounded-xl border border-white/4 bg-white/2 px-4 py-3 text-[13px] transition-all hover:border-white/8 hover:bg-white/4">
                  <span className="text-zinc-400">{m.label}</span>
                  <span className={`rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-bold ${m.color}`}>{m.count}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-5">
            <h2 className="mb-4 text-[14px] font-bold text-white">Tizim Holati</h2>
            <div className="space-y-3">
              {[
                { label: "Django API",   val: "Online :8000",      ok: true },
                { label: "SQLite DB",    val: "Connected",          ok: true },
                { label: "Next.js",      val: "Running :3001",      ok: true },
                { label: "JWT Auth",     val: "Active",             ok: true },
                { label: "Startups API", val: l1 ? "Loading..." : `${startups.length} records`, ok: !l1 },
                { label: "News API",     val: l1 ? "Loading..." : `${news.length} records`,     ok: !l1 },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-[13px]">
                  <span className="text-zinc-500">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={s.ok ? "text-emerald-400" : "text-zinc-600"}>{s.val}</span>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.ok ? "bg-emerald-400" : "bg-zinc-600"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
