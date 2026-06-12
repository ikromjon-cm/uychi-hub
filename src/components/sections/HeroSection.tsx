"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Zap } from "lucide-react";
const FLOAT_KEYWORDS = [
  { text: "Machine Learning", x: "8%", y: "22%", delay: 1.6 },
  { text: "Computer Vision", x: "76%", y: "14%", delay: 1.9 },
  { text: "Edge AI", x: "87%", y: "66%", delay: 2.1 },
  { text: "Blockchain", x: "4%", y: "76%", delay: 2.3 },
  { text: "MLOps", x: "48%", y: "88%", delay: 2.5 },
  { text: "Cloud Native", x: "62%", y: "8%", delay: 1.7 },
];

const ALL_WORDS = "Uychi Tumanida IT va Sun'iy Intellekt Innovatsiyalar Markazini Quramiz".split(" ");
const GRADIENT_WORDS = new Set(["IT", "va", "Sun'iy", "Intellekt"]);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-40"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-8%,rgba(6,247,227,0.1)_0%,transparent_65%)]" />
        <div className="absolute left-[20%] top-[25%] h-80 w-80 rounded-full bg-violet-600/7 blur-[120px]" />
        <div className="absolute right-[15%] top-[40%] h-64 w-64 rounded-full bg-accent/5 blur-[90px]" />
        <div className="absolute bottom-[20%] left-[10%] h-48 w-48 rounded-full bg-emerald-400/4 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.35] hero-grid" />
      </motion.div>

      {FLOAT_KEYWORDS.map((kw) => (
        <motion.span
          key={kw.text}
          className="pointer-events-none absolute hidden font-mono text-[10px] font-medium text-muted-foreground lg:block"
          style={{ left: kw.x, top: kw.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.25, 0.5] }}
          transition={{
            delay: kw.delay,
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {kw.text}
        </motion.span>
      ))}

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Xalqaro hamkorlik va investitsiyalarga ochiq · 2026
          <Globe className="h-3 w-3 opacity-70" />
        </motion.div>

        <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[1.06] tracking-[-0.025em]">
          {ALL_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`mr-[0.22em] inline-block last:mr-0 ${
                GRADIENT_WORDS.has(word) ? "gradient-text" : "text-foreground"
              }`}
              initial={{ opacity: 0, y: 44, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.15 + i * 0.045,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-muted"
        >
          Uychi AI & IT Hub — startaplarga inkubatsiya, IT kompaniyalarga zamonaviy ofis maydoni,
          yoshlarga sifatli texnologiya ta&apos;limi va xalqaro investorlarga qulay muhit yaratuvchi
          kompleks ekotizim.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/apply/startup"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold text-black transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_0_35px_-5px_rgba(6,247,227,0.5)] sm:w-auto"
          >
            <Zap className="h-3.5 w-3.5" />
            Startap Ariza Topshiring
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#contact"
            className="w-full rounded-full border border-border bg-card px-8 py-3.5 text-center text-[13px] font-semibold text-foreground transition-all duration-300 hover:bg-card-hover sm:w-auto"
          >
            Bog&apos;lanish
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2.5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ko&apos;proq Ko&apos;ring
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-7 w-px bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
