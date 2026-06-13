"use client";

import Link from "next/link";
import { SOCIAL } from "@/lib/constants";
import { useLang } from "@/lib/i18n";

const FOOTER_LINKS = {
  Ekotizim: [
    { label: "Startaplar",    href: "/startups" },
    { label: "IT Kompaniyalar", href: "/companies" },
    { label: "Hamkorlar",     href: "/partners" },
    { label: "AI Markaz",     href: "/ai-center" },
  ],
  Resurslar: [
    { label: "Ta'lim",        href: "/education" },
    { label: "Kutubxona",     href: "/library" },
    { label: "Galereya",      href: "/media" },
    { label: "Ish & Stajyorlik", href: "/jobs" },
  ],
  Investorlar: [
    { label: "Imkoniyatlar",  href: "/investors" },
    { label: "Investor arizasi", href: "/apply/investor" },
    { label: "Startap arizasi", href: "/apply/startup" },
    { label: "Tadbirlar",     href: "/events" },
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
                Istiqlol ko&apos;chasi 15, Uychi, Namangan
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="shrink-0 text-indigo-400">📞</span>
                <a href="tel:+998792240000" className="transition-colors hover:text-indigo-400">
                  +998 79 224 00 00
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="shrink-0 text-indigo-400">✉</span>
                <a href="mailto:info@uychi.uz" className="transition-colors hover:text-indigo-400">
                  info@uychi.uz
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="shrink-0 text-slate-600">🕐</span>
                {t.footer.hours}
              </p>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 transition-all hover:border-indigo-500/40 hover:text-indigo-400"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={SOCIAL.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 transition-all hover:border-indigo-500/40 hover:text-indigo-400"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 transition-all hover:border-emerald-500/40 hover:text-emerald-400"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.549 4.09 1.508 5.808L0 24l6.344-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.368l-.36-.213-3.767.884.916-3.666-.234-.376A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
              </a>
            </div>
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
