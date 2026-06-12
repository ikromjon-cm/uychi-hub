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
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(fd);

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
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-2xl text-cyan-400">✓</div>
          <h2 className="text-xl font-bold text-white">Muvaffaqiyatli Ro&apos;yxatdan O&apos;tdingiz!</h2>
          <p className="mt-2 text-[14px] text-zinc-500">Elektron pochtangizni tekshiring — xush kelibsiz xabari yuborildi.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 rounded-full bg-cyan-400 px-8 py-3 text-[14px] font-bold text-black transition-all hover:bg-cyan-300"
          >
            Kirish sahifasiga o&apos;tish →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            <UserPlus className="h-3 w-3" />
            Yangi Hisob
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
            Ro&apos;yxatdan O&apos;ting
          </h1>
          <p className="mt-3 text-[14px] text-zinc-500">
            Uychi Hub platformasiga qo&apos;shiling
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/5 bg-[#0a0a0a] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "first_name", label: "Ism", placeholder: "Ismingiz" },
              { name: "last_name", label: "Familya", placeholder: "Familyangiz" },
            ].map((f) => (
              <div key={f.name}>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">{f.label}</label>
                <input name={f.name} type="text" placeholder={f.placeholder} className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/3" />
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Foydalanuvchi Nomi</label>
            <input name="username" type="text" required placeholder="foydalanuvchi_nomi" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/3" />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Elektron Pochta</label>
            <input name="email" type="email" required placeholder="siz@misol.com" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/3" />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Parol</label>
            <input name="password" type="password" required placeholder="Kamida 8 ta belgi" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/3" />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Parolni Tasdiqlang</label>
            <input name="password2" type="password" required placeholder="Parolni qayta kiriting" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/3" />
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="group w-full rounded-full bg-cyan-400 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.5)] disabled:opacity-60">
            {loading ? "Yuklanmoqda..." : <>Ro&apos;yxatdan O&apos;tish <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></>}
          </button>

          <p className="pt-2 text-center text-[13px] text-zinc-600">
            Hisobingiz bormi?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
              Kirish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
