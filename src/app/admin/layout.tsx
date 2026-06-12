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
    <div className="flex h-screen overflow-hidden bg-[#030303]">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-white/5 bg-[#080808] transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-5">
          <Link href="/" className="text-[15px] font-bold tracking-[0.15em] text-white">
            UYCHI<span className="text-cyan-400">.</span>ADMIN
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-zinc-600 hover:text-white lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">Main</div>
          <ul className="space-y-0.5">
            {NAV.slice(0, 6).map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${pathname === href ? "bg-cyan-500/10 text-cyan-400" : "text-zinc-500 hover:bg-white/4 hover:text-white"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />{label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">Management</div>
          <ul className="space-y-0.5">
            {NAV.slice(6, 10).map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${pathname === href ? "bg-cyan-500/10 text-cyan-400" : "text-zinc-500 hover:bg-white/4 hover:text-white"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />{label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">System</div>
          <ul className="space-y-0.5">
            {NAV.slice(10).map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${pathname === href ? "bg-cyan-500/10 text-cyan-400" : "text-zinc-500 hover:bg-white/4 hover:text-white"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />{label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-[12px] font-bold text-cyan-400">A</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">Super Admin</p>
              <p className="truncate text-[11px] text-zinc-600">admin@uychi.uz</p>
            </div>
            <button onClick={handleLogout} title="Chiqish" className="text-zinc-600 hover:text-red-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 bg-[#080808] px-6">
          <button onClick={() => setSidebarOpen(true)} className="text-zinc-500 hover:text-white lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 lg:flex-1">
            <div className="hidden items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2 lg:flex">
              <Search className="h-4 w-4 text-zinc-600" />
              <input type="text" placeholder="Search..." className="w-48 bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              API Online
            </div>
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/6 bg-white/2 text-zinc-500 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/6 bg-white/2 text-zinc-500 hover:text-white">
              <Settings className="h-4 w-4" />
            </button>
            <Link href="/" className="rounded-lg border border-white/6 bg-white/2 px-3 py-1.5 text-[12px] font-medium text-zinc-500 transition-colors hover:text-white">
              ← Public Site
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
