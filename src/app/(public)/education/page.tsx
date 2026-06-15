"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { X, CheckCircle } from "lucide-react";

type CourseLevel = "beginner" | "intermediate" | "advanced";
type CourseLang = "uz" | "ru" | "en";
interface Course {
  id: number; slug: string; title: string; instructor: string; category: string;
  level: CourseLevel; duration: string; lessons: number; price: number;
  is_free: boolean; lang: CourseLang; enrolled_count: number; rating: string;
  accent: "cyan" | "violet" | "emerald"; tags: string[]; description: string; status: string;
}

const MOCK_COURSES: Course[] = [
  { id: 1, slug: "react-frontend-uz", title: "React bilan Frontend Dasturlash", instructor: "Jasur Mirzayev", category: "frontend", level: "beginner", duration: "3 oy", lessons: 72, price: 0, is_free: true, lang: "uz", enrolled_count: 1200, rating: "4.8", accent: "cyan", tags: ["React", "JavaScript", "HTML", "CSS"], description: "", status: "active" },
  { id: 2, slug: "python-ai-uz", title: "Python va Sun'iy Intellekt", instructor: "Dilnoza Yusupova", category: "ai", level: "intermediate", duration: "4 oy", lessons: 96, price: 1200000, is_free: false, lang: "uz", enrolled_count: 840, rating: "4.9", accent: "violet", tags: ["Python", "AI", "ML"], description: "", status: "active" },
  { id: 3, slug: "flutter-mobile-uz", title: "Flutter bilan Mobil Dasturlash", instructor: "Sherzod Tursunov", category: "mobile", level: "beginner", duration: "3 oy", lessons: 68, price: 900000, is_free: false, lang: "uz", enrolled_count: 620, rating: "4.7", accent: "emerald", tags: ["Flutter", "Dart", "iOS"], description: "", status: "active" },
  { id: 4, slug: "nodejs-backend-uz", title: "Node.js Backend Dasturlash", instructor: "Otabek Rahimov", category: "backend", level: "intermediate", duration: "3 oy", lessons: 80, price: 1100000, is_free: false, lang: "uz", enrolled_count: 510, rating: "4.6", accent: "cyan", tags: ["Node.js", "Express", "REST API"], description: "", status: "active" },
  { id: 5, slug: "uiux-figma-uz", title: "UI/UX Dizayn — Figma Pro", instructor: "Malika Sharipova", category: "design", level: "beginner", duration: "2 oy", lessons: 48, price: 750000, is_free: false, lang: "uz", enrolled_count: 730, rating: "4.8", accent: "violet", tags: ["Figma", "UX"], description: "", status: "active" },
  { id: 6, slug: "data-science-uz", title: "Ma'lumotlar Fani va Tahlil", instructor: "Bobur Xasanov", category: "data", level: "intermediate", duration: "4 oy", lessons: 88, price: 1300000, is_free: false, lang: "uz", enrolled_count: 390, rating: "4.7", accent: "emerald", tags: ["Python", "Pandas", "SQL"], description: "", status: "active" },
];

type AccentKey = "cyan" | "violet" | "emerald";
const A: Record<AccentKey, { border: string; badge: string; text: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40",    badge: "bg-accent/10 text-accent border-accent/20",    text: "text-accent" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400" },
};

const CATEGORIES = [
  { key: "all", label: "Barchasi" }, { key: "frontend", label: "Frontend" }, { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobil" }, { key: "ai", label: "AI & ML" }, { key: "design", label: "Dizayn" },
  { key: "data", label: "Data Science" }, { key: "security", label: "Kiberxavfsizlik" }, { key: "devops", label: "DevOps" },
];
const LEVELS = [
  { key: "all", label: "Barcha daraja" }, { key: "beginner", label: "Boshlang'ich" },
  { key: "intermediate", label: "O'rta" }, { key: "advanced", label: "Yuqori" },
];
const LEVEL_LABELS: Record<string, string> = { beginner: "Boshlang'ich", intermediate: "O'rta daraja", advanced: "Yuqori daraja" };
const LANG_LABELS: Record<string, string> = { uz: "O'zbekcha", ru: "Ruscha", en: "English" };
const LANG_FLAGS: Record<string, string> = { uz: "🇺🇿", ru: "🇷🇺", en: "🇺🇸" };

function formatNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatPrice(price: number, isFree: boolean): string {
  if (isFree) return "Bepul";
  return formatNum(price) + " UZS";
}

type RegisterModal = { open: boolean; course: Course | null; sent: boolean; sending: boolean; error: string };

export default function EducationPage() {
  const { data: allCourses, loading } = useApi<Course[]>("/education/courses/", [], MOCK_COURSES);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [modal, setModal] = useState<RegisterModal>({ open: false, course: null, sent: false, sending: false, error: "" });

  function openModal(course: Course) {
    setModal({ open: true, course, sent: false, sending: false, error: "" });
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModal(m => ({ ...m, open: false }));
    document.body.style.overflow = "";
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal.course) return;
    setModal(m => ({ ...m, sending: true, error: "" }));
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const data = {
      course: modal.course.id,
      full_name: `${raw.first_name || ""} ${raw.last_name || ""}`.trim(),
      email: raw.email || "",
      phone: raw.phone || "",
    };
    try {
      const res = await fetch("/api/education/applications/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setModal(m => ({ ...m, sent: true, sending: false }));
      } else {
        setModal(m => ({ ...m, sending: false, error: "Xatolik yuz berdi. Qayta urinib ko'ring." }));
      }
    } catch {
      const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
      submissions.push({ endpoint: "/education/applications/", body: data, timestamp: new Date().toISOString() });
      localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
      setModal(m => ({ ...m, sent: true, sending: false }));
    }
  }

  const active = allCourses.filter(c => c.status === "active");
  const filtered = active.filter((c) => {
    if (category !== "all" && c.category !== category) return false;
    if (level !== "all" && c.level !== level) return false;
    if (freeOnly && !c.is_free) return false;
    return true;
  });

  const totalEnrolled = active.reduce((sum, c) => sum + c.enrolled_count, 0);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">/ Ta&apos;lim Markazi</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            IT Kurslar &amp;<br />
            <span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">Dasturlash Ta&apos;limi</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Uychi tumanining 47 maktab va 42,400 o&apos;quvchili ta&apos;lim tizimiga tayangan holda, IT Hubda professional dasturchilar va IT mutaxassislar tayyorlaymiz.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Kurslar", value: loading ? "..." : String(active.length), color: "text-accent" },
              { label: "Jami o'quvchi", value: loading ? "..." : formatNum(totalEnrolled) + "+", color: "text-violet-400" },
              { label: "Maktab o'quvchilari", value: "42,400+", color: "text-emerald-400" },
              { label: "Sertifikatlar", value: "2,400+", color: "text-accent" },
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
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat.key} onClick={() => setCategory(cat.key)}
                className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all ${category === cat.key ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {LEVELS.map((l) => (
              <button key={l.key} onClick={() => setLevel(l.key)}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all ${level === l.key ? "border-violet-400/40 bg-violet-500/10 text-violet-400" : "border-border bg-card text-muted hover:text-foreground"}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => setFreeOnly(!freeOnly)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all ${freeOnly ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400" : "border-border bg-card text-muted hover:text-foreground"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${freeOnly ? "bg-emerald-400" : "bg-muted"}`} />
              Faqat bepul kurslar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">Kurs topilmadi</p>
            <button onClick={() => { setCategory("all"); setLevel("all"); setFreeOnly(false); }} className="mt-3 text-[13px] text-accent hover:underline">Filtrni tozalash</button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => {
              const accent = (course.accent as AccentKey) in A ? course.accent as AccentKey : "cyan";
              const c = A[accent];
              return (
                <div key={course.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.badge}`}>
                        {CATEGORIES.find((x) => x.key === course.category)?.label || course.category}
                      </span>
                      {course.is_free && (
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">BEPUL</span>
                      )}
                    </div>
                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-400">★ {course.rating}</span>
                  </div>
                  <h3 className={`mt-4 text-[15px] font-bold leading-snug ${c.text}`}>{course.title}</h3>
                  <p className="mt-1 text-[12px] text-muted">O&apos;qituvchi: {course.instructor}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border-subtle bg-card p-3 text-center text-[11px]">
                    <div><p className="font-bold text-foreground">{course.duration}</p><p className="text-muted">Davomiylik</p></div>
                    <div><p className="font-bold text-foreground">{course.lessons}</p><p className="text-muted">Darslar</p></div>
                    <div><p className="font-bold text-foreground">{LEVEL_LABELS[course.level]?.split(" ")[0]}</p><p className="text-muted">Daraja</p></div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(course.tags || []).slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded bg-card-hover px-1.5 py-0.5 font-mono text-[10px] text-muted">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div>
                      <p className={`text-[15px] font-bold ${c.text}`}>{formatPrice(course.price, course.is_free)}</p>
                      <p className="text-[11px] text-muted">{formatNum(course.enrolled_count)} o&apos;quvchi · {LANG_FLAGS[course.lang]} {LANG_LABELS[course.lang]}</p>
                    </div>
                    <button
                      onClick={() => openModal(course)}
                      className={`rounded-xl border px-4 py-2 text-[12px] font-bold transition-all ${c.badge} hover:opacity-80`}
                    >
                      Ro&apos;yxatdan o&apos;t
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {[
            { title: "O'quv dasturlari", desc: "Frontend, Backend, AI, Mobile va boshqa yo'nalishlar bo'yicha sertifikatli kurslar — Uychi va Namangan yoshlari uchun.", accent: "cyan", icon: "📚" },
            { title: "Sertifikat tizimi", desc: "Kurs yakunida IT Park Uzbekistan va Uychi IT Hub birgalikdagi sertifikati beriladi.", accent: "violet", icon: "🏆" },
            { title: "Career Center", desc: "Kurs bitirganlarni Uychi tumani IT kompaniyalari va Namangan bozoriga ishga joylashtirish.", accent: "emerald", icon: "💼" },
          ].map((item) => (
            <div key={item.title} className={`rounded-2xl border p-6 ${item.accent === "cyan" ? "border-accent/15 bg-accent/5" : item.accent === "violet" ? "border-violet-400/15 bg-violet-500/5" : "border-emerald-400/15 bg-emerald-500/5"}`}>
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h3 className="text-[15px] font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {modal.open && modal.course && (
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
                  <h3 className="text-xl font-bold text-foreground">Ro&apos;yxatdan o&apos;tdingiz!</h3>
                  <p className="mt-2 text-[13px] text-muted">
                    <strong className="text-foreground">{modal.course.title}</strong> kursi uchun ariza qabul qilindi.
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
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Kursga ro&apos;yxatdan o&apos;tish</p>
                    <h3 className="mt-1 text-[16px] font-bold text-foreground">{modal.course.title}</h3>
                    <p className="mt-0.5 text-[12px] text-muted">O&apos;qituvchi: {modal.course.instructor}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    {[
                      { name: "first_name",  label: "Ism",        placeholder: "Ismingiz",          required: true },
                      { name: "last_name",   label: "Familya",    placeholder: "Familyangiz",       required: true },
                      { name: "email",       label: "Email",      placeholder: "email@example.com", required: true, type: "email" },
                      { name: "phone",       label: "Telefon",    placeholder: "+998 XX XXX XX XX", required: true, type: "tel" },
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
