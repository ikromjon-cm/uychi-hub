"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { useLang, type Lang } from "@/lib/i18n";

const LANGUAGES: { code: Lang; flag: string }[] = [
  { code: "UZ", flag: "🇺🇿" },
  { code: "RU", flag: "🇷🇺" },
  { code: "EN", flag: "🇺🇸" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, mounted: themeMounted, toggle: toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const NAV_ITEMS = [
    { label: t.nav.startups, href: "/startups" },
    { label: t.nav.education, href: "/education" },
    { label: t.nav.news, href: "/news" },
    { label: t.nav.partners, href: "/partners" },
    { label: t.nav.jobs, href: "/jobs" },
    { label: t.nav.events, href: "/events" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-nav backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-[0.2em] text-foreground">
          UYCHI<span className="text-accent">.</span>HUB
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-card-hover hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language switcher */}
          <div className="flex items-center rounded-lg border border-border bg-card">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1.5 text-[11px] font-bold transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  lang === l.code
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.flag} {l.code}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted transition-all hover:text-foreground"
          >
            {themeMounted && (theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            ))}
          </button>

          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-[13px] font-bold text-black transition-all hover:bg-accent-dark"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
            {t.nav.contact}
          </Link>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Tema"
            suppressHydrationWarning
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted"
          >
            {themeMounted && (theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />)}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Yopish" : "Menyu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-nav px-6 pb-5 pt-3 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-card-hover hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile lang switcher */}
            <div className="mt-3 flex gap-1 rounded-xl border border-border bg-card p-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex-1 rounded-lg py-2 text-[12px] font-bold transition-colors ${
                    lang === l.code ? "bg-accent/15 text-accent" : "text-muted"
                  }`}
                >
                  {l.flag} {l.code}
                </button>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-border bg-card py-2.5 text-center text-[13px] font-medium text-muted"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-accent py-2.5 text-center text-[13px] font-bold text-black"
              >
                {t.nav.contact}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
