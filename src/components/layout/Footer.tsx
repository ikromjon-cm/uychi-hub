"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SOCIAL } from "@/lib/constants";
import { useLang } from "@/lib/i18n";

type Settings = {
  telegram_url?: string;
  youtube_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  contact_phone?: string;
  contact_email?: string;
  address?: string;
};

const FOOTER_LINKS = {
  Ekotizim: [
    { label: "Startaplar",    href: "/startups" },
    { label: "IT Kompaniyalar", href: "/companies" },
    { label: "Hamkorlar",     href: "/partners" },
    { label: "AI Markaz",     href: "/ai-center" },
  ],
  Resurslar: [
    { label: "Ta'lim",        href: "/education" },
    { label: "Coworking",     href: "/coworking" },
    { label: "Talabalar",     href: "/students" },
    { label: "Ish & Stajyorlik", href: "/jobs" },
  ],
  Investorlar: [
    { label: "Imkoniyatlar",  href: "/investors" },
    { label: "Investor arizasi", href: "/apply/investor" },
    { label: "Startap arizasi", href: "/apply/startup" },
    { label: "Tadbirlar",     href: "/events" },
  ],
  Infratuzilma: [
    { label: "Kutubxona",     href: "/library" },
    { label: "Galereya",      href: "/media" },
    { label: "AI Markaz",     href: "/ai-center" },
    { label: "AI Features",   href: "/ai-features" },
  ],
  Kompaniya: [
    { label: "Yangiliklar",   href: "/news" },
    { label: "Biz haqimizda", href: "/#about" },
    { label: "Bog'lanish",    href: "/#contact" },
    { label: "Maxfiylik",     href: "/privacy" },
  ],
};

export function Footer() {
  const { t } = useLang();
  const [s, setS] = useState<Settings>({});

  useEffect(() => {
    fetch("/api/hub/settings/")
      .then((r) => (r.ok ? r.json() : {}))
      .then((d: Settings) => setS(d || {}))
      .catch(() => {});
  }, []);

  const phone = s.contact_phone || "+998 79 224 00 00";
  const email = s.contact_email || "info@uychi.uz";
  const address = s.address || "Istiqlol ko'chasi 15, Uychi, Namangan";

  const socials = [
    { url: s.telegram_url || SOCIAL.telegram, label: "Telegram", hover: "hover:border-sky-500/40 hover:text-sky-400",
      path: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
    { url: s.youtube_url, label: "YouTube", hover: "hover:border-red-500/40 hover:text-red-400",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { url: s.instagram_url, label: "Instagram", hover: "hover:border-pink-500/40 hover:text-pink-400",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
    { url: s.facebook_url, label: "Facebook", hover: "hover:border-blue-500/40 hover:text-blue-400",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  ].filter((x) => x.url);

  return (
    <footer className="bg-[#06090f] text-slate-400">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-[13px] font-black">
                U
              </span>
              <span className="text-[15px] font-bold tracking-tight text-white">
                Uychi<span className="text-indigo-400">.Hub</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-slate-500">
              {t.footer.tagline}
            </p>

            <div className="mt-5 space-y-2 text-[12px]">
              <p className="flex items-start gap-2 text-slate-500">
                <span className="mt-0.5 shrink-0 text-indigo-400">📍</span>
                {address}
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="shrink-0 text-indigo-400">📞</span>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition-colors hover:text-indigo-400">
                  {phone}
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="shrink-0 text-indigo-400">✉</span>
                <a href={`mailto:${email}`} className="transition-colors hover:text-indigo-400">
                  {email}
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="shrink-0 text-slate-600">🕐</span>
                {t.footer.hours}
              </p>
            </div>

            {/* Social icons (managed from the admin panel) */}
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                {socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.url} target="_blank" rel="noopener noreferrer" aria-label={soc.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 transition-all ${soc.hover}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d={soc.path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-slate-500 transition-colors hover:text-indigo-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-8 text-[12px] text-slate-600 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Uychi AI & IT Hub. {t.footer.rights}</p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="ml-1">{t.footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
