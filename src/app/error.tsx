"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="uz">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#06090f] px-6 text-center font-sans">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-red-400">
          Xatolik Yuz Berdi
        </div>
        <h1 className="text-2xl font-bold text-white">Kutilmagan Xatolik</h1>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-400">
          Sahifani yuklashda muammo yuz berdi. Iltimos qayta urinib ko&apos;ring.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-indigo-600 px-8 py-3 text-[14px] font-bold text-white transition-all hover:bg-indigo-500"
          >
            Qayta Urinish
          </button>
          <a
            href="/"
            className="rounded-full border border-slate-700 px-8 py-3 text-[14px] font-semibold text-slate-400 transition-all hover:text-white"
          >
            Bosh Sahifa
          </a>
        </div>
      </body>
    </html>
  );
}
