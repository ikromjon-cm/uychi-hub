"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { useApi, apiFormPost } from "@/lib/api"
import { useLang } from "@/lib/i18n"
import { CardArt } from "@/components/ui/CardArt"
import { UychiMap } from "@/components/UychiMap"
import { ArrowRight, ArrowUpRight, Play, Mail, Phone, MapPin, Calendar, Clock, Users, Briefcase, DollarSign, ChevronRight, CheckCircle, Loader2 } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const ACCENTS = ["cyan", "emerald", "violet", "amber"] as const

type AccentKey = typeof ACCENTS[number]

const accentClasses: Record<AccentKey, { bg: string; border: string; num: string; glow: string }> = {
  cyan:    { bg: "bg-accent/5",   border: "border-accent/15",   num: "text-accent",    glow: "hover:shadow-[0_0_50px_-10px_rgba(6,247,227,0.22)]" },
  emerald: { bg: "bg-emerald-500/5",  border: "border-emerald-400/15",  num: "text-emerald-400",  glow: "hover:shadow-[0_0_50px_-10px_rgba(52,211,153,0.22)]" },
  violet:  { bg: "bg-violet-500/5",   border: "border-violet-400/15",   num: "text-violet-400",   glow: "hover:shadow-[0_0_50px_-10px_rgba(167,139,250,0.22)]" },
  amber:   { bg: "bg-amber-500/5",    border: "border-amber-400/15",    num: "text-amber-400",    glow: "hover:shadow-[0_0_50px_-10px_rgba(251,191,36,0.22)]" },
}

type NewsItem = { id: number; title_en: string; title_uz: string; title_ru: string; body_en: string; body_uz: string; body_ru: string; image: string; images: string[]; links: { title: string; url: string }[]; created_at: string }
type AnnouncementItem = { id: number; title_en: string; title_uz: string; title_ru: string; body_en: string; body_uz: string; body_ru: string; image: string; images: string[]; links: { title: string; url: string }[]; date: string }
type StartupItem = { id: number; title: string; sector: string; problem_en: string; problem_uz: string; problem_ru: string; solution_en: string; solution_uz: string; solution_ru: string; image: string; tech_stack: string; developer_images: string[]; links: { title: string; url: string }[] }
type JobItem = { id: number; title_en: string; title_uz: string; title_ru: string; department: string; image: string; type: string; salary: string }
type StatItem = { id: number; title: string; value: string }

const CATEGORY_LABEL: Record<string, string> = { "Government": "Davlat", "Corporate": "Korporatsiya", "University": "Universitet", "Accelerator": "Akselerator", "International": "Xalqaro", "Tech Park": "Tech Park" }
const CATEGORY_BADGE: Record<string, string> = { "Government": "border-accent/15 text-accent/60", "Corporate": "border-emerald-400/15 text-emerald-400/60", "University": "border-violet-400/15 text-violet-400/60", "Accelerator": "border-amber-400/15 text-amber-400/60", "International": "border-pink-400/15 text-pink-400/60", "Tech Park": "border-blue-400/15 text-blue-400/60" }

function CountUp({ to, suffix = "", active }: { to: number; suffix?: string; active: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const dur = 1200
    const step = 16
    const inc = Math.ceil(to / (dur / step))
    const timer = setInterval(() => {
      start += inc
      if (start >= to) { setVal(to); clearInterval(timer) }
      else setVal(start)
    }, step)
    return () => clearInterval(timer)
  }, [to, active])
  return <>{val}{suffix}</>
}

export default function Home() {
  const { lang, t } = useLang()
  const router = useRouter()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState("")

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const { data: heroVideos } = useApi<{ id: number; video_file: string; video_url: string }[]>("/hub/hero-video/", [])
  const { data: news } = useApi<NewsItem[]>("/hub/news/", [])
  const { data: announcements } = useApi<AnnouncementItem[]>("/hub/announcements/", [])
  const { data: startups } = useApi<StartupItem[]>("/hub/startups/", [])
  const { data: jobs } = useApi<JobItem[]>("/hub/jobs/", [])
  const { data: partners } = useApi<{ id: number; name: string; category: string }[]>("/hub/partners/", [])
  const { data: stats } = useApi<StatItem[]>("/hub/stats/", [])

  const heroVideo = heroVideos[0]
  const partnerRow1 = partners.slice(0, Math.ceil(partners.length / 2))
  const partnerRow2 = partners.slice(Math.ceil(partners.length / 2))

  function tl(fields: Record<string, string>): string {
    return fields[`${lang.toLowerCase()}` as keyof typeof fields] || fields.en || Object.values(fields)[0] || ""
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError("")
    setSending(true)
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd) as Record<string, string>
    if (!data.name || data.name.length < 2) { setFormError("Ismingizni to'liq kiriting"); setSending(false); return }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { setFormError("Email noto'g'ri"); setSending(false); return }
    await apiFormPost("/hub/leads/", { ...data, lead_type: "contact" }).catch(() => {})
    setSent(true)
    setSending(false)
  }

  return (
    <div className="cyber-grid flex flex-col">
      <Navbar />

      <section ref={heroRef} className="hero">
        <div className="hero-mesh absolute inset-0" />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-500/6 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-12 pt-28">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="badge">{t.hero.badge}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mt-5 text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-foreground">
                {t.hero.title}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                {t.hero.desc}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/#contact" className="btn btn-primary gap-2 rounded-full bg-accent px-6 py-3 text-[14px] font-bold text-black shadow-[0_2px_20px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark hover:shadow-[0_4px_30px_rgba(79,70,229,0.45)]">
                  {t.hero.reach} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/apply/startup" className="btn btn-outline gap-2 rounded-full border border-border px-6 py-3 text-[14px] font-semibold text-muted transition-all hover:border-accent/40 hover:text-foreground">
                  {t.hero.apply} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="perspective-1000">
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
                  {heroVideo?.video_url ? (
                    <video
                      src={heroVideo.video_url}
                      autoPlay muted loop playsInline
                      className="w-full aspect-video object-cover"
                    />
                  ) : heroVideo?.video_file ? (
                    <video
                      src={heroVideo.video_file}
                      autoPlay muted loop playsInline
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                      <CardArt seed={3} label="Uychi Hub" className="absolute inset-0" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-card/70 ring-1 ring-accent/20 backdrop-blur-sm transition-transform hover:scale-105">
                        <Play className="h-7 w-7 translate-x-0.5 text-accent" />
                      </div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-accent/10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="badge">/ Geografiya</span>
            <h2 className="title mt-3">Uychi tumani xaritasi</h2>
            <p className="desc">Uychi tumani Namangan viloyatining shimoli-sharqida joylashgan</p>
          </motion.div>
          <UychiMap />
        </div>
      </section>

      <section className="section cyber-grid-glow">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-xl"
          >
            <span className="badge">/ {t.stats.badge.replace("/ ", "")}</span>
            <h2 className="title mt-3">{t.stats.title}</h2>
            <p className="desc">{t.stats.desc}</p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => {
              const accent = ACCENTS[i % ACCENTS.length] as AccentKey
              const c = accentClasses[accent]
              const match = stat.value.match(/^(\d+)(.*)$/)
              const num = match ? parseInt(match[1]) : 0
              const sfx = match ? match[2] : ""
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className={`card ${c.bg} ${c.border} ${c.glow}`}
                >
                  <div className={`text-2xl font-bold tracking-tight md:text-3xl ${c.num}`}>
                    <CountUp to={num} suffix={sfx} active={statsInView} />
                  </div>
                  <div className="mt-2 text-[13px] font-semibold text-foreground">{stat.title}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {heroVideo && (
        <section className="section">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 text-center"
            >
              <span className="badge">{t.video.badge}</span>
              <h2 className="title mt-3">{t.video.title}</h2>
              <p className="desc mx-auto">{t.video.desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="video shadow-2xl"
            >
              <video
                src={heroVideo.video_url || heroVideo.video_file}
                controls
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <span className="badge">{t.news.badge}</span>
            <h2 className="title mt-3">{t.news.title}</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {news.slice(0, 6).map((item) => (
              <motion.div key={item.id} variants={fadeUp} className="card group relative">
                <Link href={`/news/${item.id}`} className="absolute inset-0 z-10" aria-label={tl({ en: item.title_en, uz: item.title_uz, ru: item.title_ru })} />
                {item.image && (
                  <img src={item.image} alt="" className="card-image" loading="lazy" />
                )}
                {item.created_at && (
                  <span className="mb-2 text-[11px] font-medium text-muted-foreground">
                    {item.created_at.slice(0, 10)}
                  </span>
                )}
                <h3 className="text-[15px] font-bold text-foreground leading-snug">
                  {tl({ en: item.title_en, uz: item.title_uz, ru: item.title_ru })}
                </h3>
                <p className="mt-2 text-[13px] text-muted line-clamp-2">
                  {tl({ en: item.body_en, uz: item.body_uz, ru: item.body_ru })}
                </p>
                {item.images?.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {item.images.slice(0, 3).map((url, i) => (
                      <img key={i} src={url} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-border object-cover" />
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-3">
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent opacity-0 transition-all group-hover:opacity-100">
                    {t.news.more} <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {news.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Link href="/news" className="btn btn-outline gap-2 rounded-full border border-border px-6 py-2.5 text-[13px] font-semibold text-muted transition-all hover:border-accent/30 hover:text-foreground">
                {t.news.more} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {announcements.length > 0 && (
        <section className="section">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <span className="badge">{t.announcements.badge}</span>
              <h2 className="title mt-3">{t.announcements.title}</h2>
              <p className="desc">{t.announcements.desc}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {announcements.slice(0, 6).map((item) => (
                <motion.div key={item.id} variants={fadeUp} className="card">
                  <div className="flex items-start justify-between">
                    <span className="badge text-[10px]">
                      <Calendar className="h-3 w-3" />
                      {item.date?.slice(0, 10) || ""}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[15px] font-bold text-foreground leading-snug">
                    {tl({ en: item.title_en, uz: item.title_uz, ru: item.title_ru })}
                  </h3>
                  <p className="mt-2 text-[13px] text-muted line-clamp-3">
                    {tl({ en: item.body_en, uz: item.body_uz, ru: item.body_ru })}
                  </p>
                  {item.images?.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {item.images.slice(0, 3).map((url, i) => (
                        <img key={i} src={url} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-border object-cover" />
                      ))}
                    </div>
                  )}
                  {item.links?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.links.slice(0, 2).map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] text-muted hover:border-accent/30 hover:text-accent">
                          {link.title || link.url}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <span className="badge">{t.startups.badge}</span>
            <h2 className="title mt-3">{t.startups.title}</h2>
            <p className="desc">{t.startups.desc}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {startups.slice(0, 6).map((item, idx) => {
              const accent = ACCENTS[idx % ACCENTS.length] as AccentKey
              const c = accentClasses[accent]
              const techs = item.tech_stack?.split(",").map(t => t.trim()).filter(Boolean) || []
              return (
                <motion.div
                  key={item.id} variants={fadeUp}
                  className={`card ${c.border} ${c.glow} relative`}
                >
                  <Link href={`/startups/${item.id}`} className="absolute inset-0 z-10" aria-label={item.title} />
                  {item.image && <img src={item.image} alt="" className="card-image" loading="lazy" />}
                  <span className={`badge ${c.bg} ${c.border}`}>{item.sector}</span>
                  <h3 className="mt-3 text-[15px] font-bold text-foreground">{item.title}</h3>
                  <div className="mt-3 space-y-2 text-[13px]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{t.startups.problem}</span>
                      <p className="mt-0.5 text-muted">{tl({ en: item.problem_en, uz: item.problem_uz, ru: item.problem_ru })}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{t.startups.solution}</span>
                      <p className="mt-0.5 text-muted">{tl({ en: item.solution_en, uz: item.solution_uz, ru: item.solution_ru })}</p>
                    </div>
                  </div>
                  {techs.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {techs.map((tech) => (
                        <span key={tech} className={`rounded-lg border ${c.border} px-2.5 py-1 text-[11px] font-medium ${c.num}`}>{tech}</span>
                      ))}
                    </div>
                  )}
                  {item.developer_images?.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {item.developer_images.map((url, i) => (
                        <img key={i} src={url} alt="" className="h-20 w-20 shrink-0 rounded-xl border border-border object-cover" />
                      ))}
                    </div>
                  )}
                  {item.links?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.links.slice(0, 3).map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] text-muted hover:border-accent/30 hover:text-accent">
                          {link.title || link.url}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/apply/startup" className="btn btn-outline gap-2 rounded-full border border-border px-6 py-2.5 text-[13px] font-semibold text-muted transition-all hover:border-accent/30 hover:text-foreground">
              {t.how.applyBtn} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/apply/investor" className="btn btn-outline gap-2 rounded-full border border-violet-400/20 px-6 py-2.5 text-[13px] font-semibold text-violet-400 transition-all hover:border-violet-400/40">
              {t.how.investorBtn} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {jobs.length > 0 && (
        <section className="section">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <span className="badge">{t.careers.badge}</span>
              <h2 className="title mt-3">{t.careers.title}</h2>
              <p className="desc">{t.careers.desc}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {jobs.slice(0, 6).map((item) => (
                <motion.div
                  key={item.id} variants={fadeUp}
                  className="card relative"
                >
                  <Link href="/jobs" className="absolute inset-0 z-10" aria-label={tl({ en: item.title_en, uz: item.title_uz, ru: item.title_ru })} />
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-[14px] font-bold text-accent">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-foreground leading-snug">
                          {tl({ en: item.title_en, uz: item.title_uz, ru: item.title_ru })}
                        </h3>
                        {item.department && (
                          <p className="text-[12px] text-muted">{item.department}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                    {item.type && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.type === "fulltime" ? "Full-time" : item.type === "parttime" ? "Part-time" : item.type === "remote" ? "Remote" : "Contract"}
                      </span>
                    )}
                    {item.salary && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {item.salary}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {partners.length > 0 && (
        <section className="section overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 max-w-6xl px-6 text-center"
          >
            <span className="badge">/ {t.nav.partners}</span>
            <h2 className="title mt-2.5">{t.nav.partners}</h2>
          </motion.div>
          <div className="mx-auto max-w-7xl space-y-3">
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
              <div className="flex animate-marquee gap-3 whitespace-nowrap" style={{ animationDuration: "35s" }}>
                {[...partnerRow1, ...partnerRow1].map((p, i) => (
                  <div key={`${p.id}-${i}`} className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-5 py-3 transition-all duration-300 hover:border-border hover:bg-card-hover">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-foreground/8 text-[10px] font-bold text-foreground">
                      {p.name.charAt(0)}
                    </div>
                    <span className="whitespace-nowrap text-[13px] font-semibold text-muted">{p.name}</span>
                    <span className={`hidden rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:block ${CATEGORY_BADGE[p.category] || "border-zinc-500/15 text-muted/60"}`}>
                      {CATEGORY_LABEL[p.category] || p.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="section">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <span className="badge">{t.contact.badge}</span>
              <h2 className="title mt-3 text-[clamp(1.6rem,3vw,2.2rem)]">{t.contact.title}</h2>
              <p className="desc">{t.contact.desc}</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-[13px] text-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span>Istiqlol ko'chasi 15, Uychi, Namangan viloyati</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-muted">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <a href="mailto:info@uychi.uz" className="hover:text-foreground">info@uychi.uz</a>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-muted">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <a href="tel:+998792240000" className="hover:text-foreground">+998 79 224 00 00</a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{t.contact.successTitle}</h3>
                  <p className="mt-2 text-[14px] text-muted">{t.contact.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: t.contact.fields.name, name: "name", type: "text", placeholder: t.contact.fields.namePh, span: 1 },
                    { label: t.contact.fields.company, name: "company", type: "text", placeholder: t.contact.fields.companyPh, span: 1 },
                    { label: t.contact.fields.country, name: "country", type: "text", placeholder: t.contact.fields.countryPh, span: 1 },
                    { label: t.contact.fields.email, name: "email", type: "email", placeholder: t.contact.fields.emailPh, span: 1 },
                    { label: t.contact.fields.phone, name: "phone", type: "tel", placeholder: t.contact.fields.phonePh, span: 2 },
                    { label: t.contact.fields.message, name: "message", type: "textarea", placeholder: t.contact.fields.messagePh, span: 2 },
                  ].map((f) => (
                    <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                      <label className="mb-1.5 block text-[12px] font-medium text-muted">{f.label}</label>
                      {f.type === "textarea" ? (
                        <textarea name={f.name} placeholder={f.placeholder} rows={3} required
                          className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                        />
                      ) : (
                        <input type={f.type} name={f.name} placeholder={f.placeholder} required={f.name === "name"}
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                        />
                      )}
                    </div>
                  ))}
                  {formError && (
                    <div className="sm:col-span-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-[13px] text-red-400">{formError}</div>
                  )}
                  <div className="sm:col-span-2 pt-1">
                    <button type="submit" disabled={sending}
                      className="btn btn-primary w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-[14px] font-bold text-black shadow-[0_2px_16px_rgba(79,70,229,0.25)] transition-all hover:bg-accent-dark disabled:opacity-60"
                    >
                      {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                      {sending ? t.contact.sending : t.contact.send}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
