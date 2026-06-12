"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await login(fd.get("username") as string, fd.get("password") as string);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Foydalanuvchi nomi yoki parol noto'g'ri.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-400">
            <LogIn className="h-3 w-3" />
            Tizimga Kirish
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
            Xush Kelibsiz
          </h1>
          <p className="mt-3 text-[14px] text-zinc-500">
            Uychi Hub boshqaruv paneliga kirish
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/5 bg-[#0a0a0a] p-6">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Foydalanuvchi Nomi</label>
            <input name="username" type="text" required autoComplete="username" placeholder="foydalanuvchi_nomi" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-violet-400/40 focus:bg-white/3" />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Parol</label>
            <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-700 focus:border-violet-400/40 focus:bg-white/3" />
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="group w-full rounded-full bg-violet-400 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-violet-300 hover:shadow-[0_0_35px_-5px_rgba(167,139,250,0.5)] disabled:opacity-60">
            {loading ? "Kirilmoqda..." : <>Kirish <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></>}
          </button>

          <p className="pt-2 text-center text-[13px] text-zinc-600">
            Hisobingiz yo&apos;qmi?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300">
              Ro&apos;yxatdan o&apos;tish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
