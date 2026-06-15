"use client";

/**
 * CardArt — a deterministic, branded visual used to fill image slots when no
 * real image is available. Renders a tech-flavoured gradient mesh with a dot
 * grid, drifting nodes and a soft glow so empty cards still look designed
 * rather than blank. Pick a palette with `seed` and an optional `icon`/`label`.
 */

const PALETTES = [
  { a: "#6366f1", b: "#a78bfa", glow: "rgba(167,139,250,0.45)" }, // indigo / violet
  { a: "#06b6d4", b: "#22d3ee", glow: "rgba(34,211,238,0.40)" }, // cyan
  { a: "#10b981", b: "#34d399", glow: "rgba(52,211,153,0.40)" }, // emerald
];

export function CardArt({
  seed = 0,
  label,
  className = "",
}: {
  seed?: number;
  label?: string;
  className?: string;
}) {
  const p = PALETTES[Math.abs(seed) % PALETTES.length];
  const uid = `art${Math.abs(seed)}`;
  const initials = (label || "Uychi Hub")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.a} stopOpacity="0.18" />
            <stop offset="100%" stopColor={p.b} stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="72%" cy="30%" r="60%">
            <stop offset="0%" stopColor={p.glow} />
            <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <pattern id={`${uid}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill={p.a} fillOpacity="0.16" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill={`url(#${uid}-bg)`} />
        <rect width="400" height="300" fill={`url(#${uid}-dots)`} />
        <rect width="400" height="300" fill={`url(#${uid}-glow)`} />

        {/* circuit-ish connecting lines */}
        <g stroke={p.a} strokeOpacity="0.30" strokeWidth="1.4" fill="none">
          <path d="M40 230 L120 230 L150 180 L250 180" />
          <path d="M150 180 L150 90 L300 90" />
          <path d="M250 180 L320 140" />
        </g>
        <g fill={p.b}>
          <circle cx="40" cy="230" r="4" />
          <circle cx="150" cy="180" r="5" />
          <circle cx="150" cy="90" r="4" />
          <circle cx="300" cy="90" r="5" />
          <circle cx="320" cy="140" r="4" />
        </g>

        {/* brand monogram */}
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          fontSize="84"
          fontWeight="800"
          fill={p.a}
          fillOpacity="0.14"
          fontFamily="system-ui, sans-serif"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
