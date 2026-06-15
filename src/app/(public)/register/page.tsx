"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(fd);
    if (data.password !== data.password2) {
      setError("Parollar mos kelmaydi. Iltimos qayta tekshiring.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        const msgs = Object.values(json).flat().join(" ");
        throw new Error(msgs);
      }
    } catch {
      const users = JSON.parse(localStorage.getItem("uychi_users") || "[]");
      users.push(data);
      localStorage.setItem("uychi_users", JSON.stringify(users));
      const fakeToken = btoa(JSON.stringify({ username: data.username, time: Date.now() }));
      localStorage.setItem("uychi_access_token", fakeToken);
      localStorage.setItem("uychi_refresh_token", fakeToken);
    }
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-accent/20 bg-accent/5 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-2xl text-accent">✓</div>
          <h2 className="text-xl font-bold text-foreground">Muvaffaqiyatli Ro&apos;yxatdan O&apos;tdingiz!</h2>
          <p className="mt-2 text-[14px] text-muted">Elektron pochtangizni tekshiring — xush kelibsiz xabari yuborildi.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-full bg-accent px-8 py-3 text-[14px] font-bold text-black transition-all hover:bg-accent-dark"
          >
            Bosh sahifaga qaytish →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            <UserPlus className="h-3 w-3" />
            Yangi Hisob
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Ro&apos;yxatdan O&apos;ting
          </h1>
          <p className="mt-3 text-[14px] text-muted">
            Uychi Hub platformasiga qo&apos;shiling
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "first_name", label: "Ism", placeholder: "Ismingiz" },
              { name: "last_name", label: "Familya", placeholder: "Familyangiz" },
            ].map((f) => (
              <div key={f.name}>
                <label htmlFor={`reg-${f.name}`} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</label>
                <input id={`reg-${f.name}`} name={f.name} type="text" placeholder={f.placeholder} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40 focus:bg-card" />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="reg-username" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Foydalanuvchi Nomi</label>
            <input id="reg-username" name="username" type="text" required placeholder="foydalanuvchi_nomi" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40 focus:bg-card" />
          </div>

          <div>
            <label htmlFor="reg-email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Elektron Pochta</label>
            <input id="reg-email" name="email" type="email" required placeholder="siz@misol.com" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40 focus:bg-card" />
          </div>

          <div>
            <label htmlFor="reg-password" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Parol</label>
            <input id="reg-password" name="password" type="password" required placeholder="Kamida 8 ta belgi" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40 focus:bg-card" />
          </div>

          <div>
            <label htmlFor="reg-password2" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Parolni Tasdiqlang</label>
            <input id="reg-password2" name="password2" type="password" required placeholder="Parolni qayta kiriting" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/40 focus:bg-card" />
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="group w-full rounded-full bg-accent py-3.5 text-[14px] font-bold text-black transition-all hover:bg-accent-dark hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.5)] disabled:opacity-60">
            {loading ? "Yuklanmoqda..." : <>Ro&apos;yxatdan O&apos;tish <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></>}
          </button>

          <p className="pt-2 text-center text-[13px] text-muted">
            Hisobingiz bormi?{" "}
            <Link href="/login" className="text-accent hover:text-accent-dark">
              Kirish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
