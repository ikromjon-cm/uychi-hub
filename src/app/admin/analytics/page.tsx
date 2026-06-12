"use client";

import { useState } from "react";
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react";

const ANALYTICS_MONTHLY = [
  { month: 'Yan', visitors: 1200, pageviews: 4800, signups: 45 },
  { month: 'Fev', visitors: 1800, pageviews: 7200, signups: 62 },
  { month: 'Mar', visitors: 2400, pageviews: 9600, signups: 88 },
  { month: 'Apr', visitors: 3100, pageviews: 12400, signups: 105 },
  { month: 'May', visitors: 4200, pageviews: 16800, signups: 143 },
  { month: 'Iyn', visitors: 5800, pageviews: 23200, signups: 198 },
  { month: 'Iyl', visitors: 7200, pageviews: 28800, signups: 234 },
  { month: 'Avg', visitors: 8900, pageviews: 35600, signups: 287 },
  { month: 'Sen', visitors: 10200, pageviews: 40800, signups: 312 },
  { month: 'Okt', visitors: 12500, pageviews: 50000, signups: 398 },
  { month: 'Noy', visitors: 15000, pageviews: 60000, signups: 445 },
  { month: 'Dek', visitors: 18400, pageviews: 73600, signups: 512 },
];

const TOP_PAGES = [
  { page: '/', title: 'Bosh sahifa', views: 28400, bounce: '34%' },
  { page: '/startups', title: 'Startaplar', views: 12800, bounce: '28%' },
  { page: '/news', title: 'Yangiliklar', views: 10200, bounce: '42%' },
  { page: '/ai-center', title: 'AI Markaz', views: 8600, bounce: '31%' },
  { page: '/events', title: 'Tadbirlar', views: 7400, bounce: '38%' },
  { page: '/education', title: "Ta'lim", views: 6800, bounce: '35%' },
  { page: '/jobs', title: 'Ish & Stajyorlik', views: 5600, bounce: '29%' },
  { page: '/investors', title: 'Investorlar', views: 4200, bounce: '25%' },
];

const RANGES: Record<string, number> = { "3m": 3, "6m": 6, "1y": 12 };

export default function AdminAnalytics() {
  const [range, setRange] = useState("6m");

  const months = ANALYTICS_MONTHLY.slice(-(RANGES[range] ?? 6));
  const maxVisitors = Math.max(...months.map((m) => m.visitors));
  const totalVisitors = months.reduce((s, m) => s + m.visitors, 0);
  const totalPageviews = months.reduce((s, m) => s + m.pageviews, 0);
  const totalSignups = months.reduce((s, m) => s + m.signups, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="mt-1 text-[13px] text-muted">Website performance and user engagement metrics.</p>
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
          {Object.keys(RANGES).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${range === r ? "bg-card-hover text-foreground" : "text-muted hover:text-foreground"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Visitors", value: totalVisitors.toLocaleString(), change: "+28.4%", icon: Users, color: "text-accent" },
          { label: "Total Pageviews", value: totalPageviews.toLocaleString(), change: "+32.1%", icon: Eye, color: "text-violet-400" },
          { label: "New Signups", value: totalSignups.toLocaleString(), change: "+18.6%", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Avg. Session", value: "4m 12s", change: "+8.3%", icon: MousePointer, color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card"><s.icon className={`h-4 w-4 ${s.color}`} /></div>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
                <TrendingUp className="h-3 w-3" />{s.change}
              </span>
            </div>
            <p className="mt-3 text-[12px] text-muted">{s.label}</p>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border-subtle bg-card p-6">
        <h2 className="mb-6 text-[14px] font-bold text-foreground">Monthly Visitors</h2>
        <div className="flex items-end gap-1.5 border-b border-border-subtle pb-2" style={{ height: 180 }}>
          {months.map((m) => {
            const barH = maxVisitors > 0 ? Math.max(6, Math.round((m.visitors / maxVisitors) * 148)) : 6;
            return (
              <div key={m.month} className="group flex flex-1 flex-col items-center gap-1">
                <span className="mb-1 text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">{m.visitors.toLocaleString()}</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/60 to-cyan-400/20 transition-all group-hover:from-cyan-500/80 group-hover:to-cyan-400/40"
                  style={{ height: barH }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-1.5">
          {months.map((m) => (
            <div key={m.month} className="flex-1 text-center text-[9px] text-muted">{m.month}</div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border-subtle bg-card p-6">
          <h2 className="mb-6 text-[14px] font-bold text-foreground">Monthly Signups</h2>
          <div className="flex items-end gap-1.5 border-b border-border-subtle pb-2" style={{ height: 120 }}>
            {months.map((m) => {
              const maxSU = Math.max(...months.map((x) => x.signups));
              const barH = maxSU > 0 ? Math.max(4, Math.round((m.signups / maxSU) * 92)) : 4;
              return (
                <div key={m.month} className="group flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-violet-500/60 to-violet-400/20 transition-all group-hover:from-violet-500/80"
                    style={{ height: barH }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-1.5">
            {months.map((m) => (
              <div key={m.month} className="flex-1 text-center text-[9px] text-muted">{m.month}</div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-card p-6">
          <h2 className="mb-4 text-[14px] font-bold text-foreground">Top Pages</h2>
          <div className="space-y-3">
            {TOP_PAGES.map((p) => {
              const maxViews = TOP_PAGES[0].views;
              const pct = Math.round((p.views / maxViews) * 100);
              return (
                <div key={p.page}>
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span className="font-mono text-accent">{p.page}</span>
                    <span className="text-muted">{p.views.toLocaleString()} · {p.bounce} bounce</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-card-hover">
                    <div className="h-full rounded-full bg-accent/60 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
