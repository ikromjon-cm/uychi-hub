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
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(6,247,227,0.04)_0%,transparent_70%)]" />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-white">
            UYCHI<span className="text-cyan-400">.</span>ADMIN
          </Link>
          <p className="mt-2 text-[13px] text-zinc-600">Boshqaruv paneliga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/8 bg-[#0a0a0a] p-7">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-500">
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-[14px] text-white outline-none transition-all placeholder:text-zinc-700 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-zinc-500">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 pr-11 text-[14px] text-white outline-none transition-all placeholder:text-zinc-700 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 text-[14px] font-bold text-black transition-all hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>

          <div className="pt-1 text-center">
            <p className="text-[11px] text-zinc-700">
              Default: <span className="font-mono text-zinc-600">admin</span> / <span className="font-mono text-zinc-600">admin123</span>
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-[12px] text-zinc-700">
          <Link href="/" className="hover:text-zinc-500">← Saytga qaytish</Link>
        </p>
      </div>
    </div>
  );
}
