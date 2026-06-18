"use client";

import { useState } from "react";
import { useApi, apiFormPost } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { CheckCircle } from "lucide-react";

type CoworkingSpace = {
  id: number;
  slug: string;
  name: string;
  space_type: string;
  capacity: number;
  price_per_hour: number;
  price_per_day: number;
  description: string;
  amenities: string[];
  accent: string;
};

const T = {
  UZ: {
    badge: "/ Coworking",
    title1: "IT Hub", title2: "Coworking Maydoni",
    desc: "Zamonaviy ish joyi, meeting room va AI lab. Yuqori tezlikli internet, yopiq kabinalar va hamkorlik zonalari.",
    desk: "Desk", meeting_room: "Meeting Room", private_office: "Private Office", lab: "Lab", conference_hall: "Conference Hall",
    capacity: "sig'im",     perHour: "soatiga", perDay: "kuniga", som: "so\u02BBm", book: "Bron qilish",
    modalTitle: "Joyni bron qilish",
    fullName: "Ism Familya", email: "Email", phone: "Telefon", company: "Kompaniya", date: "Sana",
    startTime: "Boshlanish", endTime: "Tugash", purpose: "Maqsad",
    submit: "Bronni yuborish", sending: "Yuborilmoqda...",
    success: "Bron so'rovingiz qabul qilindi!", successMsg: "24 soat ichida tasdiqlaymiz.",
    close: "Yopish",
    open: "soat", hour: "soat",
    search: "Joy qidirish...",
    all: "Barchasi",
    notFound: "Joy topilmadi",
    clear: "Filtrni tozalash",
  },
  RU: {
    badge: "/ Коворкинг",
    title1: "IT Hub", title2: "Коворкинг",
    desc: "Современное рабочее пространство, переговорные и AI-лаборатория. Высокоскоростной интернет, закрытые кабинеты и зоны для сотрудничества.",
    desk: "Рабочее место", meeting_room: "Переговорная", private_office: "Офис", lab: "Лаборатория", conference_hall: "Конференц-зал",
    capacity: "вместимость",     perHour: "в час", perDay: "в день", som: "сум", book: "Забронировать",
    modalTitle: "Бронирование места",
    fullName: "Имя Фамилия", email: "Email", phone: "Телефон", company: "Компания", date: "Дата",
    startTime: "Начало", endTime: "Конец", purpose: "Цель",
    submit: "Отправить бронь", sending: "Отправка...",
    success: "Запрос на бронь принят!", successMsg: "Подтвердим в течение 24 часов.",
    close: "Закрыть",
    open: "часов", hour: "час",
    search: "Поиск места...",
    all: "Все",
    notFound: "Места не найдены",
    clear: "Очистить фильтр",
  },
  EN: {
    badge: "/ Coworking",
    title1: "IT Hub", title2: "Coworking Space",
    desc: "Modern workspace, meeting rooms and AI lab. High-speed internet, private cabins and collaboration zones.",
    desk: "Desk", meeting_room: "Meeting Room", private_office: "Private Office", lab: "Lab", conference_hall: "Conference Hall",
    capacity: "capacity",     perHour: "per hour", perDay: "per day", som: "UZS", book: "Book Now",
    modalTitle: "Book a Space",
    fullName: "Full Name", email: "Email", phone: "Phone", company: "Company", date: "Date",
    startTime: "Start Time", endTime: "End Time", purpose: "Purpose",
    submit: "Submit Booking", sending: "Sending...",
    success: "Booking request received!", successMsg: "We'll confirm within 24 hours.",
    close: "Close",
    open: "hours", hour: "hour",
    search: "Search spaces...",
    all: "All",
    notFound: "No spaces found",
    clear: "Clear filter",
  },
};

const ACCENTS: Record<string, { border: string; badge: string; text: string; glow: string }> = {
  cyan:    { border: "border-accent/20 hover:border-accent/40", badge: "bg-accent/10 text-accent border-accent/20", text: "text-accent", glow: "hover:shadow-[0_0_25px_-5px_rgba(6,247,227,0.15)]" },
  violet:  { border: "border-violet-400/20 hover:border-violet-400/40", badge: "bg-violet-500/10 text-violet-400 border-violet-400/20", text: "text-violet-400", glow: "hover:shadow-[0_0_25px_-5px_rgba(167,139,250,0.15)]" },
  emerald: { border: "border-emerald-400/20 hover:border-emerald-400/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20", text: "text-emerald-400", glow: "hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.15)]" },
};

const TYPE_ICONS: Record<string, string> = {
  desk: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  meeting_room: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  private_office: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  lab: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  conference_hall: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
};

const TYPES = ["all", "desk", "meeting_room", "private_office", "lab", "conference_hall"];

export default function CoworkingPage() {
  const { lang } = useLang();
  const t = T[lang];
  const { data: spaces, loading } = useApi<CoworkingSpace[]>("/coworking/coworking-spaces/", []);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; space: CoworkingSpace | null; sent: boolean; sending: boolean; error: string }>({ open: false, space: null, sent: false, sending: false, error: "" });

  const filtered = spaces.filter((s) => {
    const matchType = typeFilter === "all" || s.space_type === typeFilter;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  function openModal(space: CoworkingSpace) {
    setModal({ open: true, space, sent: false, sending: false, error: "" });
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModal((m) => ({ ...m, open: false }));
    document.body.style.overflow = "";
  }

  async function handleBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal.space) return;
    setModal((m) => ({ ...m, sending: true, error: "" }));
    const fd = new FormData(e.currentTarget);
    try {
      await apiFormPost("/coworking/bookings/", {
        space: modal.space.id,
        full_name: fd.get("full_name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        company: fd.get("company") || "",
        date: fd.get("date"),
        start_time: fd.get("start_time"),
        end_time: fd.get("end_time"),
        purpose: fd.get("purpose") || "",
      });
      setModal((m) => ({ ...m, sent: true, sending: false }));
    } catch {
      setModal((m) => ({ ...m, sending: false, error: "Xatolik yuz berdi. Qayta urinib ko'ring." }));
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border-subtle px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,247,227,0.10)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{t.badge}</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {t.title1}<br /><span className="bg-gradient-to-r from-accent via-violet-400 to-emerald-400 bg-clip-text text-transparent">{t.title2}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{t.desc}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Joylar", value: loading ? "—" : String(spaces.length), color: "text-accent" },
              { label: "24/7", value: "Open", color: "text-emerald-400" },
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
            {TYPES.map((key) => (
              <button key={key} onClick={() => setTypeFilter(key)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${typeFilter === key ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-card text-muted hover:text-foreground"}`}>
                {key === "all" ? t.all : t[key as keyof typeof t]}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-60 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[15px] text-muted">{t.notFound}</p>
            <button onClick={() => { setSearch(""); setTypeFilter("all"); }} className="mt-3 text-[13px] text-accent hover:underline">{t.clear}</button>
          </div>
        ) : !loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((space) => {
              const c = ACCENTS[space.accent] || ACCENTS.cyan;
              return (
                <div key={space.id} className={`group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.glow}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-base font-bold ${c.badge}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={TYPE_ICONS[space.space_type] || TYPE_ICONS.desk} />
                      </svg>
                    </div>
                    <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                      {t[space.space_type as keyof typeof t] || space.space_type}
                    </span>
                  </div>
                  <h3 className={`mt-4 text-[16px] font-bold ${c.text}`}>{space.name}</h3>
                  <p className="mt-1 text-[12px] text-muted line-clamp-2">{space.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-[12px] text-muted">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      {space.capacity} {t.capacity}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(space.amenities || []).slice(0, 4).map((a) => (
                      <span key={a} className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${c.badge}`}>{a}</span>
                    ))}
                    {(space.amenities || []).length > 4 && (
                      <span className="text-[10px] text-muted">+{space.amenities.length - 4}</span>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border-subtle">
                    <div className="space-y-0.5">
                      {space.price_per_hour > 0 && (
                        <p className={`text-[13px] font-bold ${c.text}`}>{space.price_per_hour.toLocaleString()} {t.som}/{t.hour}</p>
                      )}
                      {space.price_per_day > 0 && (
                        <p className="text-[11px] text-muted">{space.price_per_day.toLocaleString()} {t.som}/{t.perDay}</p>
                      )}
                    </div>
                    <button onClick={() => openModal(space)} className={`rounded-lg border px-4 py-1.5 text-[11px] font-bold transition-all ${c.badge} hover:opacity-80`}>
                      {t.book}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal.open && modal.space && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative my-8 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-6">
              {modal.sent ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t.success}</h3>
                  <p className="mt-2 text-[13px] text-muted">{t.successMsg}</p>
                  <button onClick={closeModal} className="mt-6 rounded-full bg-accent px-8 py-2.5 text-[13px] font-bold text-white">{t.close}</button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent">{t.modalTitle}</p>
                    <h3 className="mt-1 text-[16px] font-bold text-foreground">{modal.space.name}</h3>
                  </div>
                  <form onSubmit={handleBook} className="space-y-3">
                    {[
                      { name: "full_name", label: t.fullName, required: true },
                      { name: "email", label: t.email, required: true, type: "email" },
                      { name: "phone", label: t.phone, required: true, type: "tel" },
                      { name: "company", label: t.company },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label} {f.required && <span className="text-rose-500">*</span>}</label>
                        <input name={f.name} type={f.type ?? "text"} required={f.required}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)]" />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.date} *</label>
                        <input name="date" type="date" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none transition-all focus:border-accent/40" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.startTime} *</label>
                        <input name="start_time" type="time" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none transition-all focus:border-accent/40" />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.endTime} *</label>
                        <input name="end_time" type="time" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none transition-all focus:border-accent/40" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">{t.purpose}</label>
                      <textarea name="purpose" rows={2} className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-accent/40" />
                    </div>
                    {modal.error && (
                      <p className="rounded-xl border border-rose-500/20 bg-rose-500/8 px-3 py-2 text-[12px] text-rose-500">
                        {modal.error}
                      </p>
                    )}
                    <button type="submit" disabled={modal.sending}
                      className="mt-1 w-full rounded-full bg-accent py-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-all hover:bg-accent-dark disabled:opacity-60">
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
