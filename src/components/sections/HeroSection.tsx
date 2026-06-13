"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Globe, Zap } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

const FLOAT_KEYWORDS = [
  { text: "Machine Learning", x: "7%",  y: "20%", delay: 1.6, color: "text-accent/50" },
  { text: "Computer Vision",  x: "75%", y: "13%", delay: 1.9, color: "text-violet-400/50" },
  { text: "Edge AI",          x: "86%", y: "65%", delay: 2.1, color: "text-emerald-400/50" },
  { text: "Blockchain",       x: "3%",  y: "75%", delay: 2.3, color: "text-accent/40" },
  { text: "MLOps",            x: "47%", y: "87%", delay: 2.5, color: "text-violet-400/40" },
  { text: "Cloud Native",     x: "61%", y: "7%",  delay: 1.7, color: "text-emerald-400/50" },
  { text: "Neural Networks",  x: "18%", y: "54%", delay: 2.8, color: "text-accent/35" },
  { text: "Deep Learning",    x: "69%", y: "41%", delay: 3.0, color: "text-violet-400/35" },
];

const ALL_WORDS = "Uychi Tumanida IT va Sun'iy Intellekt Innovatsiyalar Markazini Quramiz".split(" ");
const GRADIENT_WORDS = new Set(["IT", "va", "Sun'iy", "Intellekt"]);

/* ─── Canvas particle field ────────────────────────────────────────────────── */
function ParticleField({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string };
    const pts: P[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Dark palette: bright neon; Light palette: deeper, more saturated tones
    const darkPalette  = ["#06f7e3", "#a78bfa", "#34d399", "#06f7e3", "#a78bfa"];
    const lightPalette = ["#0891b2", "#7c3aed", "#059669", "#0891b2", "#7c3aed"];

    const palette = isDarkRef.current ? darkPalette : lightPalette;
    for (let i = 0; i < 70; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        // Light mode: higher base alpha so dots are visible on white
        alpha: isDarkRef.current
          ? Math.random() * 0.55 + 0.15
          : Math.random() * 0.25 + 0.70,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 125) {
            ctx.beginPath();
            // Dark: barely-visible cyan glow; Light: visible cyan-blue lines
            const lineAlpha = isDarkRef.current
              ? 0.09 * (1 - d / 125)
              : 0.15 * (1 - d / 125);
            ctx.strokeStyle = isDarkRef.current
              ? `rgba(6,247,227,${lineAlpha})`
              : `rgba(8,145,178,${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      // dots
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const hex = Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = p.color + hex;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-45" />;
}

/* ─── 3-D orbit-ring decoration ─────────────────────────────────────────────── */
function OrbitRings() {
  return (
    <div
      className="pointer-events-none absolute right-[4%] top-[12%] hidden xl:block"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", rotateX: 62 }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="relative h-72 w-72"
      >
        {/* rings */}
        <div className="absolute inset-0 rounded-full border border-accent/12" />
        <div className="absolute inset-5 rounded-full border border-violet-400/10" />
        <div className="absolute inset-10 rounded-full border border-emerald-400/8" />

        {/* cyan dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="h-2.5 w-2.5 rounded-full bg-accent"
            style={{
              transform: "translateX(136px)",
              boxShadow: "0 0 10px 3px rgba(6,247,227,0.7)",
            }}
          />
        </motion.div>

        {/* violet dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="h-2 w-2 rounded-full bg-violet-400"
            style={{
              transform: "translateX(88px)",
              boxShadow: "0 0 8px 3px rgba(167,139,250,0.6)",
            }}
          />
        </motion.div>

        {/* emerald dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 3 }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{
              transform: "translateX(56px)",
              boxShadow: "0 0 6px 2px rgba(52,211,153,0.5)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Main HeroSection ───────────────────────────────────────────────────────── */
export function HeroSection() {
  const { theme, mounted } = useTheme();
  // Treat unmounted state as light (SSR default) to avoid flicker
  const isDark = mounted ? theme === "dark" : false;

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY         = useTransform(scrollYProgress, [0, 1], ["0%",  "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY    = useTransform(scrollYProgress, [0, 0.6], [0, -55]);

  // subtle magnetic shift on the CTA cluster
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const magnetX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const magnetY = useSpring(rawY, { stiffness: 180, damping: 22 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left - rect.width  / 2) * 0.012);
      rawY.set((e.clientY - rect.top  - rect.height / 2) * 0.012);
    },
    [rawX, rawY],
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-40"
    >
      {/* Particle network */}
      <ParticleField isDark={isDark} />

      {/* Orbit rings */}
      <OrbitRings />

      {/* ── Parallax background layer ── */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        {/* Aurora glow — stronger in light mode where the color is less saturated */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 80% 55% at 50% -8%, rgba(6,247,227,0.13) 0%, transparent 65%)"
              : "radial-gradient(ellipse 80% 55% at 50% -8%, rgba(8,145,178,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Breathing orbs — higher opacity in light mode to remain visible on white */}
        <motion.div
          animate={{
            scale:   [1, 1.18, 1],
            opacity: isDark ? [0.08, 0.16, 0.08] : [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[18%] top-[22%] h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ background: isDark ? "rgb(124 58 237 / 0.25)" : "rgb(124 58 237 / 0.40)" }}
        />
        <motion.div
          animate={{
            scale:   [1, 1.22, 1],
            opacity: isDark ? [0.06, 0.13, 0.06] : [0.10, 0.20, 0.10],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute right-[12%] top-[33%] h-80 w-80 rounded-full blur-[110px]"
          style={{ background: isDark ? "rgb(6 247 227 / 0.18)" : "rgb(8 145 178 / 0.20)" }}
        />
        <motion.div
          animate={{
            scale:   [1, 1.3, 1],
            opacity: isDark ? [0.04, 0.10, 0.04] : [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[14%] left-[6%] h-64 w-64 rounded-full blur-[90px]"
          style={{ background: isDark ? "rgb(52 211 153 / 0.12)" : "rgb(5 150 105 / 0.15)" }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.28] hero-grid" />

        {/* Horizontal scan beams */}
        <motion.div
          animate={{ x: ["-110%", "210%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
          className="absolute left-0 top-[38%] h-px w-[40%] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />
        <motion.div
          animate={{ x: ["210%", "-110%"] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear", repeatDelay: 7, delay: 6 }}
          className="absolute left-0 top-[60%] h-px w-[55%] bg-gradient-to-r from-transparent via-violet-400/35 to-transparent"
        />
        {/* Vertical scan */}
        <motion.div
          animate={{ y: ["-110%", "210%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 8, delay: 3 }}
          className="absolute left-[70%] top-0 h-[45%] w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent"
        />

        {/* Corner accent lines */}
        <div className="absolute left-8 top-24 h-16 w-px bg-gradient-to-b from-accent/30 to-transparent" />
        <div className="absolute left-8 top-24 h-px w-16 bg-gradient-to-r from-accent/30 to-transparent" />
        <div className="absolute bottom-16 right-8 h-16 w-px bg-gradient-to-t from-violet-400/30 to-transparent" />
        <div className="absolute bottom-16 right-8 h-px w-16 bg-gradient-to-l from-violet-400/30 to-transparent" />
      </motion.div>

      {/* Floating keyword tags */}
      {FLOAT_KEYWORDS.map((kw) => (
        <motion.span
          key={kw.text}
          className={`pointer-events-none absolute hidden font-mono text-[10px] font-semibold lg:block ${kw.color}`}
          style={{ left: kw.x, top: kw.y }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{
            opacity: [0, 0.9, 0.35, 0.75, 0],
            scale:   [0.75, 1, 1, 1, 0.75],
            y:       [0, -6, 3, -3, 0],
          }}
          transition={{
            delay: kw.delay,
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {kw.text}
        </motion.span>
      ))}

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent"
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          Xalqaro hamkorlik va investitsiyalarga ochiq · 2026
          <Globe className="h-3 w-3 opacity-70" />
        </motion.div>

        {/* Headline — word-by-word 3-D reveal */}
        <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[1.06] tracking-[-0.025em]">
          {ALL_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`mr-[0.22em] inline-block last:mr-0 ${
                GRADIENT_WORDS.has(word) ? "gradient-text" : "text-foreground"
              }`}
              initial={{ opacity: 0, y: 64, filter: "blur(12px)", rotateX: -55 }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)",  rotateX: 0 }}
              transition={{
                delay: 0.08 + i * 0.055,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-muted"
        >
          Uychi AI &amp; IT Hub — startaplarga inkubatsiya, IT kompaniyalarga zamonaviy ofis maydoni,
          yoshlarga sifatli texnologiya ta&apos;limi va xalqaro investorlarga qulay muhit yaratuvchi
          kompleks ekotizim.
        </motion.p>

        {/* CTAs — slight magnetic follow */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.div style={{ x: magnetX, y: magnetY }}>
            <Link
              href="/apply/startup"
              className="btn-ripple group relative flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-black transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_0_55px_-5px_rgba(6,247,227,0.65)] sm:w-auto"
            >
              <Zap className="h-3.5 w-3.5" />
              Startap Ariza Topshiring
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div style={{ x: magnetX, y: magnetY }}>
            <Link
              href="/#contact"
              className="group w-full rounded-full border border-border bg-card px-8 py-3.5 text-center text-[13px] font-semibold text-foreground transition-all duration-300 hover:border-accent/30 hover:bg-card-hover hover:shadow-[0_0_28px_-5px_rgba(6,247,227,0.18)] sm:w-auto"
            >
              Bog&apos;lanish
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2.5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ko&apos;proq Ko&apos;ring
          </span>
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.9, 0.2, 0.9] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="h-9 w-px bg-gradient-to-b from-accent/70 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
