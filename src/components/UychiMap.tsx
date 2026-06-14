"use client";

import { motion } from "framer-motion";

const PTS: [number, number][] = [
  [142, 54],   // 0  A
  [191, 31],   // 1
  [243, 17],   // 2
  [317, 15],   // 3
  [390, 19],   // 4
  [442, 29],   // 5
  [479, 44],   // 6
  [486, 52],   // 7  B
  [501, 89],   // 8
  [505, 140],  // 9
  [500, 191],  // 10
  [486, 245],  // 11
  [463, 286],  // 12
  [439, 316],  // 13
  [348, 354],  // 14 V
  [311, 371],  // 15
  [273, 387],  // 16
  [235, 405],  // 17
  [198, 420],  // 18
  [160, 432],  // 19
  [126, 440],  // 20
  [91,  432],  // 21
  [65,  418],  // 22
  [42,  392],  // 23
  [23,  362],  // 24
  [15,  328],  // 25
  [15,  293],  // 26 D
  [17,  262],  // 27
  [19,  232],  // 28
  [23,  206],  // 29  ← lower section left ends
  [44,  196],  // 30  ← notch: goes RIGHT
  [65,  186],  // 31
  [86,  176],  // 32  ← upper section left begins
  [88,  155],  // 33
  [86,  138],  // 34 E
  [95,  123],  // 35
  [101, 105],  // 36
  [109,  86],  // 37
  [124,  68],  // 38
  [137,  54],  // 39
];

const mainPath = `M ${PTS.map(([x, y]) => `${x},${y}`).join(" L ")} Z`;
const seg = (idx: number[]) =>
  `M ${idx.map(i => `${PTS[i][0]},${PTS[i][1]}`).join(" L ")}`;

const BORDERS = [
  { name: "Qirg'iziston", km: 14.4, color: "#f43f5e",
    idx: [0,1,2,3,4,5,6,7] },
  { name: "Uchqo'rg'on",  km: 24.0, color: "#a78bfa",
    idx: [7,8,9,10,11,12,13,14] },
  { name: "Namangan",     km: 13.0, color: "#22d3ee",
    idx: [14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34] },
  { name: "Chortoq",      km: 5.0,  color: "#fbbf24",
    idx: [34,35,36,37,38,39,0] },
];

const VILLAGES = [
  { name: "Uychi",     x: 245, y: 245, city: true  },
  { name: "Mevazor",  x: 344, y: 203, large: true  },
  { name: "Gulbog'",  x: 432, y: 108, large: false },
  { name: "Paxlakor", x: 267, y: 314, large: true  },
  { name: "Tuyaburi", x: 149, y: 299, large: false },
  { name: "Pastloq",  x: 235, y: 328, large: false },
  { name: "Buston",   x: 107, y: 244, large: false },
  { name: "Ertugon",  x: 128, y: 221, large: false },
];

const ROAD =
  "M 17,248 C 65,247 118,246 162,245 C 205,245 245,245 283,240 C 330,233 385,214 432,199";
const RIVER =
  "M 499,93 C 505,118 507,143 502,183 C 497,214 483,240 467,272 C 452,297 440,314 422,326";

function Badge({ label, x, y, dx, dy }: { label: string; x: number; y: number; dx: number; dy: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x={x + dx} y={y + dy} fontSize="8.5" fill="rgba(255,255,255,0.65)" fontWeight="700">{label}</text>
    </g>
  );
}

export function UychiMap() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
      <svg
        viewBox="0 0 560 460"
        className="h-auto w-full"
        style={{ maxHeight: 480 }}
        aria-label="Uychi tumani xaritasi"
      >
        <defs>
          <linearGradient id="ugFill" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"  stopColor="#10b981" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
          </linearGradient>
          <filter id="ugShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.22" />
          </filter>
          <pattern id="ugDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.7" fill="#34d399" fillOpacity="0.22" />
          </pattern>
          <clipPath id="ugClip">
            <path d={mainPath} />
          </clipPath>
        </defs>

        <motion.path d={mainPath} fill="url(#ugFill)" filter="url(#ugShadow)"
          initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "260px 228px" }} />

        <g clipPath="url(#ugClip)">
          <rect width="560" height="460" fill="url(#ugDots)" />
        </g>

        <path d={RIVER} fill="none" stroke="#60a5fa" strokeWidth="2.5"
          strokeOpacity="0.5" strokeDasharray="7,4" strokeLinecap="round" />
        <text x="494" y="175" fontSize="7" fill="#60a5fa" fillOpacity="0.6" fontStyle="italic">daryo</text>

        <path d={ROAD} fill="none" stroke="#fbbf24" strokeWidth="1.6"
          strokeOpacity="0.45" strokeLinecap="round" strokeDasharray="8,5" />

        {BORDERS.map((b, i) => (
          <motion.path key={b.name} d={seg(b.idx)} fill="none"
            stroke={b.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.15 + i * 0.18, ease: "easeOut" }} />
        ))}

        <path d={mainPath} fill="none" stroke="#10b981" strokeWidth="0.6" strokeOpacity="0.2" />

        <text x="315" y="6" textAnchor="middle" fontSize="9" fill="#f43f5e"
          fontWeight="700" letterSpacing="0.1em">QIRGʻIZISTON</text>
        <text x="547" y="200" textAnchor="middle" fontSize="9" fill="#a78bfa"
          fontWeight="700" letterSpacing="0.08em" transform="rotate(90 547 200)">UCHQOʻRGʻON</text>
        <text x="170" y="452" textAnchor="middle" fontSize="9" fill="#22d3ee"
          fontWeight="700" letterSpacing="0.08em">NAMANGAN</text>
        <text x="7" y="94" textAnchor="middle" fontSize="9" fill="#fbbf24"
          fontWeight="700" letterSpacing="0.08em" transform="rotate(-90 7 94)">CHORTOQ</text>

        {VILLAGES.map((v, i) => (
          <motion.g key={v.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}>
            {v.city && <circle cx={v.x} cy={v.y} r={14} fill="#f43f5e" fillOpacity="0.10" />}
            <circle cx={v.x} cy={v.y} r={v.city ? 6 : v.large ? 4 : 2.8}
              fill={v.city ? "#f43f5e" : "#34d399"} stroke="rgba(255,255,255,0.85)"
              strokeWidth={v.city ? 2 : 1.5} />
            <text x={v.x + (v.city ? 10 : 6)} y={v.y + (v.city ? 4 : 3.5)}
              fontSize={v.city ? 11 : v.large ? 8.5 : 7.5}
              fill={v.city ? "#f43f5e" : "#94a3b8"} fontWeight={v.city ? "800" : "500"}>
              {v.name}
            </text>
          </motion.g>
        ))}

        <Badge label="A" x={142} y={54}  dx={6}   dy={-6} />
        <Badge label="B" x={486} y={52}  dx={6}   dy={-4} />
        <Badge label="V" x={348} y={354} dx={6}   dy={4}  />
        <Badge label="D" x={15}  y={293} dx={8}   dy={4}  />
        <Badge label="E" x={86}  y={138} dx={-14} dy={4}  />

        <g transform="translate(530, 418)">
          <circle r="20" fill="rgba(2,10,25,0.72)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <polygon points="0,-15 3,-5 -3,-5" fill="#10b981" />
          <polygon points="0,15 3,5 -3,5" fill="#475569" />
          <text x="0" y="-19" textAnchor="middle" fontSize="8" fill="#10b981" fontWeight="900">N</text>
        </g>

        <g transform="translate(30, 450)">
          <line x1="0" y1="0" x2="54" y2="0" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0"  y1="-4" x2="0"  y2="4" stroke="#64748b" strokeWidth="1.5" />
          <line x1="54" y1="-4" x2="54" y2="4" stroke="#64748b" strokeWidth="1.5" />
          <text x="27" y="-7" textAnchor="middle" fontSize="7.5" fill="#64748b">~10 km</text>
        </g>
      </svg>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="text-[10px] text-muted">Tuman markazi</span>
        </div>
        {BORDERS.map(b => (
          <div key={b.name} className="flex items-center gap-1.5">
            <span className="inline-block h-[3px] w-5 rounded-full" style={{ backgroundColor: b.color }} />
            <span className="text-[10px] text-muted">{b.name} · {b.km} km</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-px w-5 rounded-full border-t-2 border-dashed border-blue-400" />
          <span className="text-[10px] text-muted">Daryo</span>
        </div>
      </div>
    </div>
  );
}
