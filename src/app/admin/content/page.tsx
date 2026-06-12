"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { Search, Plus, Edit3, Trash2, Eye, ChevronDown } from "lucide-react";

interface Page {
  title: string;
  slug: string;
  status: "published" | "draft";
  updated: string;
  author: string;
}

const PAGES: Page[] = [
  { title: "Homepage", slug: "/", status: "published", updated: "2 hours ago", author: "Super Admin" },
  { title: "AI Center", slug: "/ai-center", status: "published", updated: "1 day ago", author: "Super Admin" },
  { title: "AI Features", slug: "/ai-features", status: "published", updated: "3 days ago", author: "Super Admin" },
  { title: "Schedule", slug: "/schedule", status: "published", updated: "5 days ago", author: "Super Admin" },
  { title: "Startup Apply", slug: "/apply/startup", status: "published", updated: "1 week ago", author: "Super Admin" },
  { title: "Investor Apply", slug: "/apply/investor", status: "published", updated: "1 week ago", author: "Super Admin" },
  { title: "Jobs", slug: "/jobs", status: "draft", updated: "2 weeks ago", author: "Super Admin" },
  { title: "News", slug: "/news", status: "published", updated: "2 weeks ago", author: "Super Admin" },
  { title: "Privacy", slug: "/privacy", status: "published", updated: "1 month ago", author: "Super Admin" },
  { title: "Startups", slug: "/startups", status: "published", updated: "1 month ago", author: "Super Admin" },
];

export default function AdminContent() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>(PAGES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { data: newsArticles } = useApi<{ id: number; status: string }[]>("/news/articles/", []);
  const { data: startupApps } = useApi<{ id: number; status: string }[]>("/startups/startup-applications/", []);

  const filtered = pages.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function deletePage(slug: string) {
    setPages((prev) => prev.filter((p) => p.slug !== slug));
  }

  const publishedNews = newsArticles.filter((a) => a.status === "published").length;
  const approvedStartups = startupApps.filter((s) => s.status === "approved").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
          <p className="mt-1 text-[13px] text-muted">Manage all pages and landing content from one place.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-accent-dark">
          <Plus className="h-4 w-4" /> New Page
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Pages", value: pages.length.toString(), color: "text-foreground", href: null },
          { label: "Published News", value: publishedNews.toString(), color: "text-accent", href: "/admin/news" },
          { label: "Approved Startups", value: approvedStartups.toString(), color: "text-violet-400", href: "/admin/startups" },
          { label: "Draft Pages", value: pages.filter((p) => p.status === "draft").length.toString(), color: "text-yellow-400", href: null },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border border-border-subtle bg-card p-4 text-center ${s.href ? "cursor-pointer transition-colors hover:border-border" : ""}`} onClick={() => s.href && router.push(s.href)}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a href="/admin/news" className="rounded-2xl border border-border-subtle bg-card p-4 transition-all hover:border-accent/30 hover:bg-accent/5">
          <h3 className="text-[14px] font-bold text-foreground">News Articles</h3>
          <p className="mt-1 text-[12px] text-muted">{newsArticles.length} total · {publishedNews} published</p>
          <p className="mt-2 text-[12px] text-accent">Manage →</p>
        </a>
        <a href="/admin/startups" className="rounded-2xl border border-border-subtle bg-card p-4 transition-all hover:border-violet-500/30 hover:bg-violet-500/5">
          <h3 className="text-[14px] font-bold text-foreground">Startup Profiles</h3>
          <p className="mt-1 text-[12px] text-muted">{startupApps.length} total · {approvedStartups} approved</p>
          <p className="mt-2 text-[12px] text-violet-400">Manage →</p>
        </a>
        <a href="/admin/seo" className="rounded-2xl border border-border-subtle bg-card p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5">
          <h3 className="text-[14px] font-bold text-foreground">SEO Settings</h3>
          <p className="mt-1 text-[12px] text-muted">Meta titles, descriptions, sitemap</p>
          <p className="mt-2 text-[12px] text-emerald-400">Manage →</p>
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input type="text" placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
        </div>
        <div className="relative">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-[13px] text-muted outline-none transition-colors hover:border-border focus:border-accent/40">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </div>
        <span className="text-[12px] text-muted-foreground">{filtered.length} pages</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Page</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Updated</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((page) => (
              <tr key={page.slug} className="group text-[13px] transition-colors hover:bg-card">
                <td className="px-6 py-4 font-medium text-foreground">{page.title}</td>
                <td className="px-6 py-4 font-mono text-[12px] text-muted">{page.slug}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${page.status === "published" ? "bg-emerald-400/10 text-emerald-400" : "bg-yellow-400/10 text-yellow-400"}`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">{page.updated}</td>
                <td className="px-6 py-4 text-muted">{page.author}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded-lg border border-border bg-card p-2 text-muted transition-colors hover:border-accent/30 hover:text-accent"><Eye className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg border border-border bg-card p-2 text-muted transition-colors hover:border-accent/30 hover:text-accent"><Edit3 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => deletePage(page.slug)} className="rounded-lg border border-border bg-card p-2 text-muted transition-colors hover:border-red-500/30 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
