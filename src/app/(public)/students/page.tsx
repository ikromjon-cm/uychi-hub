"use client";

import { useState } from "react";
import { useApi } from "@/lib/api";
import { useLang } from "@/lib/i18n";

type StudentProfile = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  avatar_url: string;
  bio: string;
  course: string;
  specialization: string;
  score: number;
  rank: number;
  projects_count: number;
  certificates_count: number;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  skills: string[];
  accent: string;
  is_featured: boolean;
  achievements_count: number;
};

const T = {
  UZ: {
    badge: "/ Talabalar",
    title1: "Uychi Hub", title2: "Iqtidorli Talabalari",
    desc: "IT yo'nalishida o'qiyotgan, loyihalar yaratayotgan va o'z bilimini oshiruvchi talabalar jamoasi.",
    search: "Talaba qidirish...",
    notFound: "Talaba topilmadi",
    clear: "Filtrni tozalash",
    all: "Barchasi",
    student: "Talaba", graduate: "Bitiruvchi", mentor: "Mentor",
    score: "ball", projects: "loyiha", certs: "sertifikat",
    rank: "reyting", course: "Kurs", specialization: "Mutaxassislik",
    contact: "Bog'lanish",
    featured: "Featured",
  },
  RU: {
    badge: "/ Студенты",
    title1: "Uychi Hub", title2: "Талантливые Студенты",
    desc: "Студенты, изучающие IT, создающие проекты и повышающие свои знания.",
    search: "Поиск студента...",
    notFound: "Студенты не найдены",
    clear: "Очистить фильтр",
    all: "Все",
    student: "Студент", graduate: "Выпускник", mentor: "Ментор",
    score: "баллов", projects: "проектов", certs: "сертификатов",
    rank: "рейтинг", course: "Курс", specialization: "Специализация",
    contact: "Связаться",
    featured: "Featured",
  },
  EN: {
    badge: "/ Students",
    title1: "Uychi Hub", title2: "Talented Students",
    desc: "Students studying IT, building projects and advancing their knowledge.",
    search: "Search students...",
    notFound: "No students found",
    clear: "Clear filter",
    all: "All",
    student: "Student", graduate: "Graduate", mentor: "Mentor",
    score: "points", projects: "projects", certs: "certificates",
    rank: "rank", course: "Course", specialization: "Specialization",
    contact: "Contact",
    featured: "Featured",
  },
};

const ACCENTS: Record<string, { border: string; badge: string; text: string; glow: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40", badge: "bg-accent/10 text-accent border-accent/20", text: "text-accent", glow: "hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.15)]" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400", glow: "hover:shadow-[0_0_25px_-5px_rgba(167,139,250,0.15)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", glow: "hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.15)]" },
};

const ROLES = ["all", "student", "graduate", "mentor"] as const;

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-sm font-bold text-foreground">
      {initials}
    </div>
  );
}

export default function StudentsPage() {
  const { lang } = useLang();
  const t = T[lang];
  const { data: students, loading } = useApi<StudentProfile[]>("/students/profiles/", []);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchRole = roleFilter === "all" || s.role === roleFilter;
    const matchSearch = !search || s.full_name.toLowerCase().includes(search.toLowerCase()) || s.specialization.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(167,139,250,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">{t.badge}</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.title1}<br /><span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{t.title2}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{t.desc}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: t.score, value: loading ? "—" : String(students.reduce((s, st) => s + st.score, 0)), color: "text-accent" },
              { label: t.projects, value: loading ? "—" : String(students.reduce((s, st) => s + st.projects_count, 0)), color: "text-emerald-400" },
              { label: t.certs, value: loading ? "—" : String(students.reduce((s, st) => s + st.certificates_count, 0)), color: "text-violet-400" },
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
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((key) => (
              <button key={key} onClick={() => setRoleFilter(key)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${roleFilter === key ? "border-violet-400/40 bg-violet-500/10 text-violet-400" : "border-border bg-card text-muted hover:text-foreground"}`}>
                {key === "all" ? t.all : t[key as keyof typeof t]}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">{t.notFound}</p>
            <button onClick={() => { setSearch(""); setRoleFilter("all"); }} className="mt-3 text-[13px] text-violet-400 hover:underline">{t.clear}</button>
          </div>
        ) : !loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((student) => {
              const c = ACCENTS[student.accent] || ACCENTS.cyan;
              return (
                <div key={student.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.full_name} />
                      <div>
                        <h3 className={`text-[15px] font-bold ${c.text}`}>{student.full_name}</h3>
                        <p className="text-[11px] text-muted">{t[student.role as keyof typeof t] || student.role}</p>
                      </div>
                    </div>
                    {student.is_featured && (
                      <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${c.badge}`}>{t.featured}</span>
                    )}
                  </div>

                  {student.specialization && (
                    <p className="mt-3 text-[12px] text-muted">{student.specialization}</p>
                  )}

                  {student.bio && (
                    <p className="mt-2 text-[12px] text-muted line-clamp-2">{student.bio}</p>
                  )}

                  <div className="mt-4 flex items-center gap-4 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                      {student.score} {t.score}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>
                      {student.projects_count} {t.projects}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {student.certificates_count} {t.certs}
                    </span>
                  </div>

                  {student.skills && student.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {student.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${c.badge}`}>{skill}</span>
                      ))}
                      {student.skills.length > 4 && (
                        <span className="text-[10px] text-muted">+{student.skills.length - 4}</span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-center gap-2 border-t border-border-subtle">
                    {student.github_url && (
                      <a href={student.github_url} target="_blank" rel="noopener noreferrer" className={`rounded-lg border px-3 py-1 text-[11px] font-semibold transition-all ${c.badge} hover:opacity-80`}>GitHub</a>
                    )}
                    {student.linkedin_url && (
                      <a href={student.linkedin_url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted transition-all hover:text-foreground">LinkedIn</a>
                    )}
                    {student.portfolio_url && (
                      <a href={student.portfolio_url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted transition-all hover:text-foreground">Portfolio</a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
