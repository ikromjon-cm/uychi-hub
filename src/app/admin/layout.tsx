"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Newspaper, Rocket, BookOpen, Mail, Settings, Menu, X, Bell, LogOut, Sun, Moon, Search, Megaphone, Lock } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

const NAV_ITEMS = [
  { label: "Boshqaruv", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Yangiliklar", href: "/admin/hub/news", icon: Newspaper },
  { label: "E'lonlar", href: "/admin/hub/announcements", icon: Megaphone },
  { label: "Startaplar", href: "/admin/hub/startups", icon: Rocket },
  { label: "Ta'lim", href: "/admin/education", icon: BookOpen },
  { label: "Murojaatlar", href: "/admin/hub/leads", icon: Mail },
  { label: "Sozlamalar", href: "/admin/hub/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, mounted: themeMounted, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const val = typeof window !== "undefined" && localStorage.getItem("uychi_admin");
    if (val === "1") {
      setUnlocked(true);
    } else {
      router.replace("/");
    }
    setChecking(false);
  }, [router]);

  useEffect(() => {
    fetch("/api/startups/startup-applications/", { signal: AbortSignal.timeout(4000) })
      .then((r) => setApiOnline(r.ok || r.status === 401))
      .catch(() => setApiOnline(false));
  }, []);

  function handleLock() {
    localStorage.removeItem("uychi_admin");
    setUnlocked(false);
    router.push("/");
  }

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-[13px] text-muted">Tekshirilmoqda...</p>
        </div>
      </div>
    );
  }

  if (!unlocked) return null;

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
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
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
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[12px] font-bold text-accent">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-semibold text-foreground">Admin</p>
              <p className="truncate text-[11px] text-muted">admin@uychi.uz</p>
            </div>
            <button onClick={handleLock} aria-label="Yopish" className="text-muted hover:text-red-400 transition-colors">
              <Lock className="h-4 w-4" />
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
              <input aria-label="Qidirish" type="text" placeholder="Qidirish..." className="w-48 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              apiOnline === null
                ? "border-border bg-card text-muted"
                : apiOnline
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                  : "border-red-500/20 bg-red-500/5 text-red-400"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${
                apiOnline === null ? "bg-muted animate-pulse" : apiOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"
              }`} />
              {apiOnline === null ? "Tekshirilmoqda" : apiOnline ? "API Ulangan" : "API Uzilgan"}
            </div>
            <Link href="/admin/hub/leads" aria-label="Bildirishnomalar (murojaatlar)" className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>
            <button onClick={toggleTheme} aria-label="Tema almashtirish" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted transition-colors hover:text-foreground">
              {themeMounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
            </button>
            <Link href="/admin/hub/settings" aria-label="Sozlamalar" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Link>
            <Link href="/" className="rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:text-foreground">
              ← Saytga
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
