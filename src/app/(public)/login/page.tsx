"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { login, logout, getMe, isAuthenticated } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) router.push("/admin/dashboard");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await login(fd.get("username") as string, fd.get("password") as string);
      const me = await getMe();
      if (!me || !me.is_staff) {
        logout();
        setError("Sizda admin panelga kirish huquqi yo'q. admin@uychi.uz ga murojaat qiling.");
        return;
      }
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
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Xush Kelibsiz
          </h1>
          <p className="mt-3 text-[14px] text-muted">
            Uychi Hub boshqaruv paneliga kirish
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <label htmlFor="login-username" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Foydalanuvchi Nomi</label>
            <input id="login-username" name="username" type="text" required autoComplete="username" placeholder="foydalanuvchi_nomi" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">Parol</label>
            <input id="login-password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/40 focus:bg-card" />
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="group w-full rounded-full bg-violet-400 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-violet-300 hover:shadow-[0_0_35px_-5px_rgba(167,139,250,0.5)] disabled:opacity-60">
            {loading ? "Kirilmoqda..." : <>Kirish <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></>}
          </button>

          <p className="pt-2 text-center text-[13px] text-muted">
            Kirish huquqi uchun{" "}
            <a href="mailto:admin@uychi.uz" className="text-violet-400 hover:text-violet-300">
              admin@uychi.uz
            </a>{" "}
            ga murojaat qiling.
          </p>
        </form>
      </div>
    </div>
  );
}
