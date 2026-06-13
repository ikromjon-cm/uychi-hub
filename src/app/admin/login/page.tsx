"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login xatosi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-foreground">
            UYCHI<span className="text-accent">.</span>ADMIN
          </Link>
          <p className="mt-2 text-[13px] text-muted">Boshqaruv paneliga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-7">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted">
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Foydalanuvchi nomi"
              required
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-11 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-muted"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-[13px] text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-[14px] font-bold text-black transition-all hover:bg-accent-dark disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>

          <div className="pt-1 text-center">
            <p className="text-[11px] text-muted-foreground">
              Admin: <code className="rounded bg-card-hover px-1 text-accent">admin</code>{" "}
              Parol: <code className="rounded bg-card-hover px-1 text-accent">admin123</code>
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          <Link href="/" className="hover:text-muted">← Saytga qaytish</Link>
        </p>
      </div>
    </div>
  );
}
