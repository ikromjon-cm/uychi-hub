"use client";

import { useState } from "react";
import { Search, Edit3, CheckCircle, XCircle, ExternalLink, RefreshCw, X } from "lucide-react";

interface SeoPage {
  id: number;
  path: string;
  title: string;
  desc: string;
  keywords: string;
  score: number;
  issues: number;
}

const INITIAL_SEO_PAGES: SeoPage[] = [
  { id: 1, path: "/", title: "Uychi AI & IT Hub — AI & Digital Innovation in Uzbekistan", desc: "World-class AI ecosystem in Uzbekistan attracting global investors...", keywords: "AI Uzbekistan, Tech Hub, Digital Innovation", score: 92, issues: 2 },
  { id: 2, path: "/ai-features", title: "AI Features — Uychi Hub", desc: "Explore our suite of AI-powered tools and services for business...", keywords: "AI tools, chatbot, business AI", score: 88, issues: 3 },
  { id: 3, path: "/schedule", title: "Schedule a Meeting — Uychi Hub", desc: "Book a meeting with our partnerships team to explore...", keywords: "meeting, book, Uychi, partnership", score: 85, issues: 4 },
  { id: 4, path: "/apply/startup", title: "Startup Application — Uychi Hub", desc: "Apply to join our incubator program and accelerate...", keywords: "startup, apply, incubator, Uzbekistan", score: 90, issues: 2 },
  { id: 5, path: "/apply/investor", title: "Investor Application — Uychi Hub", desc: "Register your interest in investing in Uzbekistan's...", keywords: "investor, apply, investment, Uzbekistan", score: 87, issues: 3 },
  { id: 6, path: "/careers", title: "Careers at Uychi Hub", desc: "Join our team and help build the future of AI in Central Asia...", keywords: "careers, jobs, AI, Uychi", score: 76, issues: 5 },
  { id: 7, path: "/news", title: "News — Uychi AI & IT Hub", desc: "Latest news and updates from Uychi AI & IT Hub ecosystem...", keywords: "news, Uychi, updates, AI", score: 82, issues: 3 },
];

const scoreColor = (score: number) => score >= 90 ? "text-emerald-400" : score >= 80 ? "text-yellow-400" : "text-red-400";
const scoreBg = (score: number) => score >= 90 ? "bg-emerald-400/10 border-emerald-400/20" : score >= 80 ? "bg-yellow-400/10 border-yellow-400/20" : "bg-red-400/10 border-red-400/20";

export default function AdminSEO() {
  const [pages, setPages] = useState<SeoPage[]>(INITIAL_SEO_PAGES);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<SeoPage>>({});
  const [sitemapStatus, setSitemapStatus] = useState<"idle" | "running" | "done">("idle");

  const filtered = pages.filter((p) =>
    p.path.includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore = Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length);
  const totalIssues = pages.reduce((s, p) => s + p.issues, 0);

  function openEdit(page: SeoPage) {
    setEditId(page.id);
    setEditForm({ title: page.title, desc: page.desc, keywords: page.keywords });
  }

  function saveEdit() {
    if (editId === null) return;
    setPages((prev) => prev.map((p) => p.id === editId ? { ...p, ...editForm } : p));
    setEditId(null);
  }

  function regenerateSitemap() {
    setSitemapStatus("running");
    setTimeout(() => setSitemapStatus("done"), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SEO Management</h1>
          <p className="mt-1 text-[13px] text-muted">Optimize meta data and search performance for all pages.</p>
        </div>
        <button onClick={regenerateSitemap} disabled={sitemapStatus === "running"} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-[13px] text-muted transition-colors hover:border-border hover:text-foreground disabled:opacity-50">
          <RefreshCw className={`h-4 w-4 ${sitemapStatus === "running" ? "animate-spin" : ""}`} />
          {sitemapStatus === "done" ? "Sitemap Updated" : sitemapStatus === "running" ? "Regenerating..." : "Regenerate Sitemap"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Pages Tracked", value: pages.length.toString(), color: "text-foreground" },
          { label: "Avg. SEO Score", value: avgScore.toString(), color: "text-accent" },
          { label: "Total Issues", value: totalIssues.toString(), color: "text-yellow-400" },
          { label: "Critical (< 80)", value: pages.filter((p) => p.score < 80).length.toString(), color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-subtle bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border-subtle bg-card p-5">
        <h2 className="mb-3 text-[14px] font-bold text-foreground">Sitemap & Robots</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[12px] text-muted">Sitemap URL</p>
            <p className="mt-1 font-mono text-[13px] text-accent">https://uychi.uz/sitemap.xml</p>
            <p className="mt-1 text-[11px] text-muted">Last generated: Today 00:00 UTC</p>
          </div>
          <div>
            <p className="text-[12px] text-muted">robots.txt preview</p>
            <pre className="mt-1 rounded-lg border border-border bg-card p-3 text-[11px] text-muted">
{`User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://uychi.uz/sitemap.xml`}
            </pre>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input type="text" placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((page) => (
          <div key={page.id} className="rounded-2xl border border-border-subtle bg-card p-5 transition-all hover:border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] text-muted">{page.path}</span>
                  <a href={page.path} className="text-muted hover:text-accent"><ExternalLink className="h-3 w-3" /></a>
                </div>
                <h3 className="mt-1 text-[15px] font-bold text-foreground">{page.title}</h3>
                <p className="mt-1 text-[13px] text-muted">{page.desc}</p>
                <p className="mt-1 text-[12px] text-muted">Keywords: <span className="text-muted">{page.keywords}</span></p>
              </div>
              <div className={`ml-4 flex shrink-0 flex-col items-center rounded-xl border px-4 py-2 ${scoreBg(page.score)}`}>
                <span className={`text-xl font-bold ${scoreColor(page.score)}`}>{page.score}</span>
                <span className="text-[10px] text-muted">Score</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 border-t border-border-subtle pt-4">
              <div className="flex items-center gap-2 text-[12px]">
                <span className="text-muted">Issues:</span>
                <span className={page.issues > 0 ? "text-yellow-400" : "text-emerald-400"}>{page.issues}</span>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[12px] text-emerald-400"><CheckCircle className="h-3 w-3" />Meta Title</span>
                <span className="flex items-center gap-1 text-[12px] text-emerald-400"><CheckCircle className="h-3 w-3" />Description</span>
                {page.score < 80 && <span className="flex items-center gap-1 text-[12px] text-red-400"><XCircle className="h-3 w-3" />Keywords</span>}
              </div>
              <button onClick={() => openEdit(page)} className="ml-auto rounded-lg border border-border p-1.5 text-muted transition-colors hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {editId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-foreground">Edit SEO — {pages.find((p) => p.id === editId)?.path}</h2>
              <button onClick={() => setEditId(null)} className="text-muted hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] text-muted">Meta Title</label>
                <input value={editForm.title ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
                <p className="mt-1 text-[11px] text-muted">{(editForm.title ?? "").length}/60 chars recommended</p>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-muted">Meta Description</label>
                <textarea value={editForm.desc ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, desc: e.target.value }))} rows={3} className="w-full resize-none rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
                <p className="mt-1 text-[11px] text-muted">{(editForm.desc ?? "").length}/160 chars recommended</p>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-muted">Keywords (comma-separated)</label>
                <input value={editForm.keywords ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, keywords: e.target.value }))} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[13px] text-foreground outline-none focus:border-accent/40" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditId(null)} className="rounded-xl border border-border px-4 py-2.5 text-[13px] text-muted hover:border-border hover:text-foreground">Cancel</button>
              <button onClick={saveEdit} className="rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-accent-dark">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
