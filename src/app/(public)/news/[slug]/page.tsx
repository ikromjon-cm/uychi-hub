import { notFound } from "next/navigation";
import Link from "next/link";
import { NEWS } from "@/lib/mock-data";
import type { Accent } from "@/lib/mock-data";

const ACCENT_STYLES: Record<Accent, { badge: string; text: string }> = {
  cyan:    { badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent" },
  violet:  { badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400" },
};

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = NEWS.find((n) => n.id === params.slug);
  if (!item) return { title: "Yangilik topilmadi" };
  return {
    title: `${item.title} — Uychi IT Hub`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
    },
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = NEWS.find((n) => n.id === params.slug);
  if (!item) notFound();

  const styles = ACCENT_STYLES[item.accent];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Yangiliklarga qaytish
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}>
              {item.category}
            </span>
            <time className="text-[12px] text-muted">{item.date}</time>
          </div>

          <h1 className={`text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight tracking-tight ${styles.text}`}>
            {item.title}
          </h1>

          <p className="mt-6 text-[15px] leading-relaxed text-muted border-l-2 border-accent/30 pl-4 italic">
            {item.excerpt}
          </p>

          <div className="mt-8 text-[15px] leading-relaxed text-foreground space-y-4">
            <p>
              Uychi IT Hub va IT Park Uzbekistan hamkorligida amalga oshirilayotgan loyihalar doirasida
              Uychi tumanida IT sohasidagi yutuqlar va yangiliklar bilan tanishing.
            </p>
            <p>
              Uychi tumani — 1935-yilda tashkil etilgan bo'lib, bugungi kunda 237,600 aholiga ega
              va IT infratuzilmasini jadal rivojlantirmoqda. Tumanda 5 ta sanoat zonasi, 47 maktab,
              900 dan ziyod kichik korxona va 50 ta IT Park rezidenti faoliyat yuritadi.
            </p>
            <p>
              Uychi IT Hub tomonidan amalga oshirilayotgan loyihalar yoshlarning IT sohasidagi
              bilim va ko'nikmalarini oshirishga, shuningdek, tumanning raqamli transformatsiyasiga
              xizmat qilmoqda.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
