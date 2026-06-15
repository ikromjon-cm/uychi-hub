import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Sahifa Topilmadi | Uychi AI & IT Hub",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.08)_0%,transparent_70%)]" />

      <div className="relative">
        <p className="text-[120px] font-black leading-none tracking-tight text-foreground opacity-[0.06] select-none">
          404
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            404 — Topilmadi
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Sahifa Topilmadi
          </h1>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
            Siz qidirayotgan sahifa mavjud emas yoki ko&apos;chirilgan bo&apos;lishi mumkin.
          </p>
        </div>
      </div>

      <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-accent px-8 py-3 text-[14px] font-bold text-black shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark"
        >
          Bosh Sahifaga Qaytish
        </Link>
        <Link
          href="/news"
          className="rounded-full border border-border bg-card px-8 py-3 text-[14px] font-semibold text-muted transition-all hover:text-foreground"
        >
          Yangiliklar
        </Link>
      </div>

      <div className="relative mt-12 flex flex-wrap justify-center gap-4 text-[13px] text-muted">
        {[
          { label: "Startaplar", href: "/startups" },
          { label: "Ta'lim", href: "/education" },
          { label: "Tadbirlar", href: "/events" },
          { label: "Ish o'rinlari", href: "/jobs" },
          { label: "Bog'lanish", href: "/#contact" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-accent transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
