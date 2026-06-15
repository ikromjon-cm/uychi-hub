"use client";

import { useState } from "react";
import { useApi, apiFormPost } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { X, CheckCircle } from "lucide-react";

type HubJob = {
  id: number;
  title_en: string;
  title_uz: string;
  title_ru: string;
  department: string;
  image: string | null;
  type: string;
  salary: string;
};

type ApplyModal = { open: boolean; job: HubJob | null; sent: boolean; sending: boolean; error: string };

const ACCENTS = ["cyan", "violet", "emerald"] as const;
type AccentKey = typeof ACCENTS[number];
const A: Record<AccentKey, { border: string; badge: string; text: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400" },
};

const TYPE_LABELS: Record<string, string> = {
  fulltime: "To'liq stavka",
  parttime: "Qisman stavka",
  remote: "Remote",
  contract: "Shartnoma",
};

const FILTER_TYPES = [
  { key: "all", label: "Barchasi" },
  { key: "fulltime", label: "To'liq stavka" },
  { key: "remote", label: "Remote" },
  { key: "contract", label: "Shartnoma" },
];

export default function JobsPage() {
  const { lang } = useLang();
  const { data: allJobs, loading } = useApi<HubJob[]>("/hub/jobs/", []);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ApplyModal>({ open: false, job: null, sent: false, sending: false, error: "" });

  function openModal(job: HubJob) {
    setModal({ open: true, job, sent: false, sending: false, error: "" });
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModal(m => ({ ...m, open: false }));
    document.body.style.overflow = "";
  }

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal.job) return;
    setModal(m => ({ ...m, sending: true, error: "" }));
    const fd = new FormData(e.currentTarget);
    const jobTitle = modal.job.title_en || modal.job.title_uz || modal.job.title_ru;
    // A job application is captured as a Lead so the applicant's contact
    // details are stored (admin → Murojaatlar), instead of creating a new
    // public job posting.
    const body = {
      name: fd.get("full_name"),
      email: fd.get("email"),
      phone: fd.get("phone") || "",
      company: modal.job.department || "",
      message: `Ish o'rni: ${jobTitle}\n\n${fd.get("cover_letter") || ""}`,
    };
    try {
      await apiFormPost("/hub/leads/", body);
    } catch {
      /* silent */
    } finally {
      setModal(m => ({ ...m, sent: true, sending: false }));
    }
  }

  const filtered = allJobs.filter((j) => {
    const matchType = typeFilter === "all" || j.type === typeFilter;
    const title = j[`title_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || j.title_uz || j.title_en;
    const matchSearch = !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(52,211,153,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Ish & Stajyorlik</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            IT Vakansiyalar &<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Stajyorlik Imkoniyatlari</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Uychi AI & IT Hub va Uychi tumani IT kompaniyalari taklif etayotgan ish o'rinlari va stajyorlik dasturlari.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Ochiq vakansiyalar", value: loading ? "—" : String(filtered.length), color: "text-emerald-400" },
              { label: "Bo'limlar", value: loading ? "—" : String(new Set(allJobs.map(j => j.department)).size), color: "text-accent" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card px-5 py-3 text-center">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Lavozim yoki bo'lim qidirish..." className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_TYPES.map((f) => (
              <button key={f.key} onClick={() => setTypeFilter(f.key)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${typeFilter === f.key ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400" : "border-border bg-card text-muted hover:text-foreground"}`}>{f.label}</button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">Vakansiya topilmadi</p>
            <button onClick={() => { setSearch(""); setTypeFilter("all"); }} className="mt-3 text-[13px] text-emerald-400 hover:underline">Filtrni tozalash</button>
          </div>
        ) : !loading && (
          <div className="space-y-4">
            {filtered.map((job, idx) => {
              const c = A[ACCENTS[idx % 3]];
              const title = job[`title_${lang.toLowerCase() as 'en'|'uz'|'ru'}`] || job.title_uz || job.title_en;
              const typeColor = `text-${job.type === "fulltime" ? "accent" : job.type === "remote" ? "violet-400" : job.type === "contract" ? "amber-400" : "emerald-400"} border-${job.type === "fulltime" ? "accent" : job.type === "remote" ? "violet-400" : job.type === "contract" ? "amber-400" : "emerald-400"}/20 bg-${job.type === "fulltime" ? "accent" : job.type === "remote" ? "violet-500" : job.type === "contract" ? "amber-500" : "emerald-500"}/8`;
              return (
                <div key={job.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-6 ${c.border}`}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-base font-bold ${c.badge}`}>
                    {job.department.charAt(0)}
                  </div>
                  <div className="mt-4 flex-1 sm:mt-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-[16px] font-bold ${c.text}`}>{title}</h3>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${typeColor}`}>{TYPE_LABELS[job.type] || job.type}</span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted">{job.department}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end">
                    {job.salary && (
                      <div className="text-right">
                        <p className={`text-[15px] font-bold ${c.text}`}>{job.salary}</p>
                      </div>
                    )}
                    <button onClick={() => openModal(job)} className={`rounded-xl border px-5 py-2 text-[12px] font-bold transition-all ${c.badge} hover:opacity-80`}>
                      Ariza topshirish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-background to-card p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">/ Rezyume Yuklab Qo&apos;ying</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Mos Vakansiya Kutib Turayotganlar Uchun</h3>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">Rezyumeyingizni yuklang — HR jamoamiz sizga mos vakansiya paydo bo&apos;lganda 24 soat ichida xabar beradi.</p>
          <a href="mailto:hr@uychi.uz" className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-3.5 text-[14px] font-bold text-emerald-400 hover:bg-emerald-500/15">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            hr@uychi.uz ga yuborish
          </a>
        </div>
      </div>

      {modal.open && modal.job && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6">
              {modal.sent ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Arizangiz qabul qilindi!</h3>
                  <p className="mt-2 text-[13px] text-muted">
                    <strong className="text-foreground">{modal.job.title_en}</strong> vakansiyasi uchun ariza qabul qilindi.
                    24 soat ichida aloqaga chiqamiz.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-6 rounded-full bg-accent px-8 py-2.5 text-[13px] font-bold text-white"
                  >
                    Yopish
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Vakansiyaga ariza topshirish</p>
                    <h3 className="mt-1 text-[16px] font-bold text-foreground">{modal.job.title_en}</h3>
                    <p className="mt-0.5 text-[12px] text-muted">{modal.job.department}</p>
                  </div>

                  <form onSubmit={handleApply} className="space-y-3">
                    {[
                      { name: "full_name", label: "Ism Familya", placeholder: "To'liq ismingiz", required: true },
                      { name: "email",     label: "Email",        placeholder: "example@mail.com", required: true, type: "email" },
                      { name: "phone",     label: "Telefon",      placeholder: "+998 XX XXX XX XX", type: "tel" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {f.label} {f.required && <span className="text-rose-500">*</span>}
                        </label>
                        <input
                          name={f.name}
                          type={f.type ?? "text"}
                          placeholder={f.placeholder}
                          required={f.required}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)]"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">Motivatsiya xati</label>
                      <textarea name="cover_letter" rows={3} placeholder="Nega bu lavozim siz uchun mos?" className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40" />
                    </div>

                    {modal.error && (
                      <p className="rounded-xl border border-rose-500/20 bg-rose-500/8 px-3 py-2 text-[12px] text-rose-500">
                        {modal.error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={modal.sending}
                      className="mt-1 w-full rounded-full bg-accent py-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark disabled:opacity-60"
                    >
                      {modal.sending ? "Yuborilmoqda..." : "Ariza Yuborish →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
