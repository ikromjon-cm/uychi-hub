"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Newspaper, Rocket, TrendingUp,
  Handshake, Briefcase, Image, Search, BarChart2, Shield,
  Key, ScrollText, Database, Menu, X, Bell, Settings, LogOut,
} from "lucide-react";
import { logout, isAuthenticated } from "@/lib/api";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Startups", href: "/admin/startups", icon: Rocket },
  { label: "Investors", href: "/admin/investors", icon: TrendingUp },
  { label: "Partners", href: "/admin/partners", icon: Handshake },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { label: "User Roles", href: "/admin/roles", icon: Shield },
  { label: "Permissions", href: "/admin/permissions", icon: Key },
  { label: "System Logs", href: "/admin/logs", icon: ScrollText },
  { label: "Backup Center", href: "/admin/backup", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [pathname, isLoginPage, router]);

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
          <Link href="/" className="text-[15px] font-bold tracking-[0.15em] text-foreground">
            UYCHI<span className="text-accent">.</span>ADMIN
          </Link>
          <button onClick={() => setSidebarOpen(false)} aria-label="Yopish" className="text-muted hover:text-foreground lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Main</div>
          <ul className="space-y-0.5">
            {NAV.slice(0, 6).map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${pathname === href ? "bg-accent/10 text-accent" : "text-muted hover:bg-card-hover hover:text-foreground"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />{label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Management</div>
          <ul className="space-y-0.5">
            {NAV.slice(6, 10).map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${pathname === href ? "bg-accent/10 text-accent" : "text-muted hover:bg-card-hover hover:text-foreground"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />{label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">System</div>
          <ul className="space-y-0.5">
            {NAV.slice(10).map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${pathname === href ? "bg-accent/10 text-accent" : "text-muted hover:bg-card-hover hover:text-foreground"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />{label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-[12px] font-bold text-accent">A</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-semibold text-foreground">Super Admin</p>
              <p className="truncate text-[11px] text-muted">admin@uychi.uz</p>
            </div>
            <button onClick={handleLogout} aria-label="Chiqish" className="text-muted hover:text-red-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
          <button onClick={() => setSidebarOpen(true)} aria-label="Menyu" className="text-muted hover:text-foreground lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 lg:flex-1">
            <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 lg:flex">
              <Search className="h-4 w-4 text-muted" />
              <input aria-label="Qidirish" type="text" placeholder="Search..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              API Online
            </div>
            <button aria-label="Bildirishnomalar" className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <button aria-label="Sozlamalar" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-foreground">
              <Settings className="h-4 w-4" />
            </button>
            <Link href="/" className="rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:text-foreground">
              ← Public Site
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
