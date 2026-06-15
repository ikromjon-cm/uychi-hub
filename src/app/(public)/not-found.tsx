import Link from "next/link";

export default function PublicNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(79,70,229,0.06)_0%,transparent_70%)]" />

      <div className="relative">
        <p className="text-[100px] font-black leading-none tracking-tight text-foreground opacity-[0.05] select-none">
          404
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mb-4 text-4xl">🔍</span>
          <h2 className="text-xl font-bold text-foreground">Sahifa Topilmadi</h2>
          <p className="mt-2 text-[13px] text-muted">
            Bu sahifa mavjud emas yoki o&apos;chirilgan.
          </p>
        </div>
      </div>

      <div className="relative mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-accent px-6 py-2.5 text-[13px] font-bold text-black transition-all hover:bg-accent-dark">
          Bosh sahifa
        </Link>
        <Link href="/news" className="rounded-full border border-border px-6 py-2.5 text-[13px] font-semibold text-muted transition-all hover:text-foreground">
          Yangiliklar
        </Link>
      </div>
    </div>
  );
}
