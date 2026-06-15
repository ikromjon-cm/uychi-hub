"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";
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

const T = {
  UZ: {
    heroBadge: "/ Ta'lim Markazi",
    title1: "IT Kurslar &",
    title2: "Dasturlash Ta'limi",
    subtitle: "Uychi tumanining 47 maktab va 42,400 o'quvchili ta'lim tizimiga tayangan holda, IT Hubda professional dasturchilar va IT mutaxassislar tayyorlaymiz.",
    statCourses: "Kurslar",
    statStudents: "Jami o'quvchi",
    statSchool: "Maktab o'quvchilari",
    statCerts: "Sertifikatlar",
    catAll: "Barchasi",
    catFrontend: "Frontend",
    catBackend: "Backend",
    catMobile: "Mobil",
    catAI: "AI & ML",
    catDesign: "Dizayn",
    catData: "Data Science",
    catSecurity: "Kiberxavfsizlik",
    catDevops: "DevOps",
    lvlAll: "Barcha daraja",
    lvlBeginner: "Boshlang'ich",
    lvlIntermediate: "O'rta",
    lvlAdvanced: "Yuqori",
    freeOnly: "Faqat bepul kurslar",
    free: "Bepul",
    notFound: "Kurs topilmadi",
    clear: "Filtrni tozalash",
    instructor: "O'qituvchi",
    duration: "Davomiylik",
    lessons: "Darslar",
    level: "Daraja",
    students: "o'quvchi",
    register: "Ro'yxatdan o't",
    lvlBegShort: "Boshlang'ich",
    lvlIntShort: "O'rta",
    lvlAdvShort: "Yuqori",
    feat1Title: "O'quv dasturlari",
    feat1Desc: "Frontend, Backend, AI, Mobile va boshqa yo'nalishlar bo'yicha sertifikatli kurslar — Uychi va Namangan yoshlari uchun.",
    feat2Title: "Sertifikat tizimi",
    feat2Desc: "Kurs yakunida IT Park Uzbekistan va Uychi IT Hub birgalikdagi sertifikati beriladi.",
    feat3Title: "Karyera Markazi",
    feat3Desc: "Kurs bitirganlarni Uychi tumani IT kompaniyalari va Namangan bozoriga ishga joylashtirish.",
    modalBadge: "Kursga ro'yxatdan o'tish",
    firstName: "Ism",
    firstNamePh: "Ismingiz",
    lastName: "Familya",
    lastNamePh: "Familyangiz",
    email: "Email",
    phone: "Telefon",
    successTitle: "Ro'yxatdan o'tdingiz!",
    successDesc: "24 soat ichida aloqaga chiqamiz.",
    close: "Yopish",
    sending: "Yuborilmoqda...",
    submit: "Ariza Yuborish →",
  },
  RU: {
    heroBadge: "/ Учебный Центр",
    title1: "IT Курсы &",
    title2: "Обучение Программированию",
    subtitle: "Опираясь на систему образования с 47 школами и 42 400 учащимися, готовим профессиональных разработчиков и IT-специалистов в IT Hub.",
    statCourses: "Курсов",
    statStudents: "Всего учащихся",
    statSchool: "Школьников",
    statCerts: "Сертификатов",
    catAll: "Все",
    catFrontend: "Frontend",
    catBackend: "Backend",
    catMobile: "Мобильное",
    catAI: "AI & ML",
    catDesign: "Дизайн",
    catData: "Data Science",
    catSecurity: "Кибербезопасность",
    catDevops: "DevOps",
    lvlAll: "Все уровни",
    lvlBeginner: "Начальный",
    lvlIntermediate: "Средний",
    lvlAdvanced: "Продвинутый",
    freeOnly: "Только бесплатные курсы",
    free: "Бесплатно",
    notFound: "Курсы не найдены",
    clear: "Сбросить фильтр",
    instructor: "Преподаватель",
    duration: "Продолжительность",
    lessons: "Уроков",
    level: "Уровень",
    students: "учащихся",
    register: "Записаться",
    lvlBegShort: "Начальный",
    lvlIntShort: "Средний",
    lvlAdvShort: "Продвинутый",
    feat1Title: "Учебные программы",
    feat1Desc: "Сертифицированные курсы по Frontend, Backend, AI, Mobile и другим направлениям — для молодёжи Уйчи и Намангана.",
    feat2Title: "Система сертификации",
    feat2Desc: "По окончании курса выдаётся совместный сертификат IT Park Uzbekistan и Uychi IT Hub.",
    feat3Title: "Карьерный центр",
    feat3Desc: "Трудоустройство выпускников в IT-компании Уйчинского района и на рынок труда Намангана.",
    modalBadge: "Регистрация на курс",
    firstName: "Имя",
    firstNamePh: "Ваше имя",
    lastName: "Фамилия",
    lastNamePh: "Ваша фамилия",
    email: "Email",
    phone: "Телефон",
    successTitle: "Вы зарегистрированы!",
    successDesc: "Мы свяжемся с вами в течение 24 часов.",
    close: "Закрыть",
    sending: "Отправка...",
    submit: "Отправить Заявку →",
  },
  EN: {
    heroBadge: "/ Education Centre",
    title1: "IT Courses &",
    title2: "Programming Education",
    subtitle: "Building on an education system with 47 schools and 42,400 students, we train professional developers and IT specialists at the IT Hub.",
    statCourses: "Courses",
    statStudents: "Total students",
    statSchool: "School students",
    statCerts: "Certificates",
    catAll: "All",
    catFrontend: "Frontend",
    catBackend: "Backend",
    catMobile: "Mobile",
    catAI: "AI & ML",
    catDesign: "Design",
    catData: "Data Science",
    catSecurity: "Cybersecurity",
    catDevops: "DevOps",
    lvlAll: "All levels",
    lvlBeginner: "Beginner",
    lvlIntermediate: "Intermediate",
    lvlAdvanced: "Advanced",
    freeOnly: "Free courses only",
    free: "Free",
    notFound: "No courses found",
    clear: "Clear filter",
    instructor: "Instructor",
    duration: "Duration",
    lessons: "Lessons",
    level: "Level",
    students: "students",
    register: "Enroll",
    lvlBegShort: "Beginner",
    lvlIntShort: "Intermediate",
    lvlAdvShort: "Advanced",
    feat1Title: "Programmes",
    feat1Desc: "Certified courses in Frontend, Backend, AI, Mobile and more — for youth in Uychi and Namangan.",
    feat2Title: "Certificate system",
    feat2Desc: "A joint certificate from IT Park Uzbekistan and Uychi IT Hub is issued upon course completion.",
    feat3Title: "Career Centre",
    feat3Desc: "Graduates are placed in IT companies in Uychi district and the Namangan job market.",
    modalBadge: "Course enrolment",
    firstName: "First Name",
    firstNamePh: "Your first name",
    lastName: "Last Name",
    lastNamePh: "Your last name",
    email: "Email",
    phone: "Phone",
    successTitle: "You are enrolled!",
    successDesc: "We will be in touch within 24 hours.",
    close: "Close",
    sending: "Sending...",
    submit: "Submit Application →",
  },
} as const;

function formatNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

type RegisterModal = { open: boolean; course: Course | null; sent: boolean; sending: boolean; error: string };

export default function EducationPage() {
  const { lang } = useLang();
  const t = T[lang];
  const { data: allCourses, loading } = useApi<Course[]>("/education/courses/", [], MOCK_COURSES);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [modal, setModal] = useState<RegisterModal>({ open: false, course: null, sent: false, sending: false, error: "" });

  const CATEGORIES = [
    { key: "all", label: t.catAll }, { key: "frontend", label: t.catFrontend },
    { key: "backend", label: t.catBackend }, { key: "mobile", label: t.catMobile },
    { key: "ai", label: t.catAI }, { key: "design", label: t.catDesign },
    { key: "data", label: t.catData }, { key: "security", label: t.catSecurity },
    { key: "devops", label: t.catDevops },
  ];

  const LEVELS = [
    { key: "all", label: t.lvlAll }, { key: "beginner", label: t.lvlBeginner },
    { key: "intermediate", label: t.lvlIntermediate }, { key: "advanced", label: t.lvlAdvanced },
  ];

  const LEVEL_LABELS: Record<string, string> = {
    beginner: t.lvlBegShort,
    intermediate: t.lvlIntShort,
    advanced: t.lvlAdvShort,
  };

  const LANG_FLAGS: Record<string, string> = { uz: "🇺🇿", ru: "🇷🇺", en: "🇺🇸" };

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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.heroBadge}</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.title1}<br />
            <span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">{t.title2}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: t.statCourses, value: loading ? "..." : String(active.length), color: "text-accent" },
              { label: t.statStudents, value: loading ? "..." : formatNum(totalEnrolled) + "+", color: "text-violet-400" },
              { label: t.statSchool, value: "42,400+", color: "text-emerald-400" },
              { label: t.statCerts, value: "2,400+", color: "text-accent" },
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
              {t.freeOnly}
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
            <p className="text-[15px] text-muted">{t.notFound}</p>
            <button onClick={() => { setCategory("all"); setLevel("all"); setFreeOnly(false); }} className="mt-3 text-[13px] text-accent hover:underline">{t.clear}</button>
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
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">{t.free.toUpperCase()}</span>
                      )}
                    </div>
                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-400">★ {course.rating}</span>
                  </div>
                  <h3 className={`mt-4 text-[15px] font-bold leading-snug ${c.text}`}>{course.title}</h3>
                  <p className="mt-1 text-[12px] text-muted">{t.instructor}: {course.instructor}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border-subtle bg-card p-3 text-center text-[11px]">
                    <div><p className="font-bold text-foreground">{course.duration}</p><p className="text-muted">{t.duration}</p></div>
                    <div><p className="font-bold text-foreground">{course.lessons}</p><p className="text-muted">{t.lessons}</p></div>
                    <div><p className="font-bold text-foreground">{LEVEL_LABELS[course.level] || course.level}</p><p className="text-muted">{t.level}</p></div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(course.tags || []).slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded bg-card-hover px-1.5 py-0.5 font-mono text-[10px] text-muted">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div>
                      <p className={`text-[15px] font-bold ${c.text}`}>{course.is_free ? t.free : formatNum(course.price) + " UZS"}</p>
                      <p className="text-[11px] text-muted">{formatNum(course.enrolled_count)} {t.students} · {LANG_FLAGS[course.lang]}</p>
                    </div>
                    <button
                      onClick={() => openModal(course)}
                      className={`rounded-xl border px-4 py-2 text-[12px] font-bold transition-all ${c.badge} hover:opacity-80`}
                    >
                      {t.register}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {[
            { title: t.feat1Title, desc: t.feat1Desc, accent: "cyan", icon: "📚" },
            { title: t.feat2Title, desc: t.feat2Desc, accent: "violet", icon: "🏆" },
            { title: t.feat3Title, desc: t.feat3Desc, accent: "emerald", icon: "💼" },
          ].map((item) => (
            <div key={item.title} className={`rounded-2xl border p-6 ${item.accent === "cyan" ? "border-accent/15 bg-accent/5" : item.accent === "violet" ? "border-violet-400/15 bg-violet-500/5" : "border-emerald-400/15 bg-emerald-500/5"}`}>
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h3 className="text-[15px] font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {modal.open && modal.course && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative my-8 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl"
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
                  <h3 className="text-xl font-bold text-foreground">{t.successTitle}</h3>
                  <p className="mt-2 text-[13px] text-muted">
                    <strong className="text-foreground">{modal.course.title}</strong> — {t.successDesc}
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-6 rounded-full bg-accent px-8 py-2.5 text-[13px] font-bold text-white"
                  >
                    {t.close}
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent">{t.modalBadge}</p>
                    <h3 className="mt-1 text-[16px] font-bold text-foreground">{modal.course.title}</h3>
                    <p className="mt-0.5 text-[12px] text-muted">{t.instructor}: {modal.course.instructor}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    {[
                      { name: "first_name", label: t.firstName, placeholder: t.firstNamePh, required: true },
                      { name: "last_name",  label: t.lastName,  placeholder: t.lastNamePh,  required: true },
                      { name: "email",      label: t.email,     placeholder: "email@example.com", required: true, type: "email" },
                      { name: "phone",      label: t.phone,     placeholder: "+998 XX XXX XX XX", required: true, type: "tel" },
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

                    <button
                      type="submit"
                      disabled={modal.sending}
                      className="mt-1 w-full rounded-full bg-accent py-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark disabled:opacity-60"
                    >
                      {modal.sending ? t.sending : t.submit}
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
