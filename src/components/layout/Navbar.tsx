"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { SOCIAL } from "@/lib/constants";
import { useTheme } from "@/lib/theme-provider";

const NAV_ITEMS = [
  { label: "Bosh sahifa", href: "/" },
  {
    label: "Ekotizim",
    children: [
      { label: "Startaplar", href: "/startups", desc: "Uychi IT Hub rezident startaplari" },
      { label: "IT Kompaniyalar", href: "/companies", desc: "Xizmatlar katalogi va bog'lanish" },
      { label: "Hamkorlar", href: "/partners", desc: "Hukumat, universitetlar, xalqaro" },
      { label: "AI Markaz", href: "/ai-center", desc: "AI vositalar va tadqiqot loyihalari" },
    ],
  },
  { label: "Yangiliklar", href: "/news" },
  {
    label: "Tadbirlar",
    children: [
      { label: "Tadbirlar Kalendari", href: "/events", desc: "Hackathon, bootcamp, konferentsiya" },
      { label: "Uchrashuvni Rejalashtirish", href: "/schedule", desc: "Onlayn yig'ilish belgilang" },
    ],
  },
  { label: "Ta'lim", href: "/education" },
  { label: "Ish & Stajyorlik", href: "/jobs" },
  {
    label: "Media",
    children: [
      { label: "Galereya", href: "/media", desc: "Rasm va video materiallar" },
      { label: "Kutubxona", href: "/library", desc: "Kitoblar, maqolalar, hisobotlar" },
      { label: "Investorlar", href: "/investors", desc: "Investitsiya imkoniyatlari" },
    ],
  },
];

const LANGUAGES = [
  { code: "UZ", label: "O'zbek", flag: "🇺🇿" },
  { code: "RU", label: "Русский", flag: "🇷🇺" },
  { code: "EN", label: "English", flag: "🇺🇸" },
];

function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button className="flex items-center gap-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-white">
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
}

function LangDropdown() {
  const [lang, setLang] = useState("UZ");
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const current = LANGUAGES.find((l) => l.code === lang)!;
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1.5 text-[12px] font-semibold text-zinc-400 transition-all hover:border-white/15 hover:text-white">
        <Globe className="h-3 w-3" />
        {current.flag} {current.code}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-white/8 bg-[#0a0a0a]/95 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-white/4 ${lang === l.code ? "text-cyan-400" : "text-zinc-400"}`}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Top bar */}
      <div className="border-b border-white/4 bg-[#030303]/40 backdrop-blur-sm">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6 text-[11px] text-zinc-600">
          <div className="flex items-center gap-5">
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.549 4.09 1.508 5.808L0 24l6.344-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.368l-.36-.213-3.767.884.916-3.666-.234-.376A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
              WhatsApp
            </a>
            <a href={SOCIAL.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-cyan-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-blue-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
          <span className="hidden sm:block">Uychi tumani · Namangan viloyati · O'zbekiston</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-white/5 bg-[#030303]/88 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-[0.2em] text-white">
            UYCHI<span className="text-cyan-400">.</span>HUB
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} label={item.label}>
                  <div className="absolute top-full left-1/2 z-50 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a]/95 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                    <div className="p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex flex-col rounded-xl px-3.5 py-2.5 transition-all hover:bg-white/4 ${isActive(child.href) ? "text-cyan-400" : "text-white"}`}
                        >
                          <span className="text-[13px] font-semibold">{child.label}</span>
                          <span className="mt-0.5 text-[11px] text-zinc-600">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavDropdown>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-[13px] font-medium transition-colors ${isActive(item.href!) ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/3 text-zinc-500 transition-all hover:border-white/15 hover:text-white"
            >
              {theme === "dark"
                ? <Sun className="h-3.5 w-3.5" />
                : <Moon className="h-3.5 w-3.5" />
              }
            </button>
            <LangDropdown />
            <Link
              href="/login"
              className="text-[12px] font-medium text-zinc-700 transition-colors hover:text-zinc-400"
            >
              Kirish
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 px-5 py-2 text-[13px] font-semibold text-cyan-400 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:shadow-[0_0_20px_-5px_rgba(6,247,227,0.4)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Bog'lanish
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-white/5 bg-[#030303]/95 px-6 pb-6 pt-3 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/4 hover:text-white"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedMobile === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {expandedMobile === item.label && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-white/6 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 text-[13px] text-zinc-500 hover:text-cyan-400"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`rounded-xl px-3 py-2.5 text-sm hover:bg-white/4 ${isActive(item.href!) ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Language + CTA */}
            <div className="mt-3 flex gap-2">
              {LANGUAGES.map((l) => (
                <button key={l.code} className="flex-1 rounded-xl border border-white/8 bg-white/3 py-2 text-[12px] font-semibold text-zinc-500 hover:text-white">
                  {l.flag} {l.code}
                </button>
              ))}
            </div>
            <Link
              href="/#contact"
              className="mt-2 rounded-full bg-cyan-400 px-5 py-3 text-center text-sm font-bold text-black hover:bg-cyan-300"
              onClick={() => setMobileOpen(false)}
            >
              Bog'lanish
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
