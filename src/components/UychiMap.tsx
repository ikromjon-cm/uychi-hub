"use client";

import { motion } from "framer-motion";

// Uychi tumani chegara koordinatalari (haqiqiy geografik shaklga yaqin)
// Shimol: Qirg'iziston (~42 km), Sharq: Uchqo'rg'on/Norin daryo (~20 km),
// Janub: Namangan (~35 km), G'arb: Chortoq (~15 km)
// ViewBox 560×460, masshtab taxminan 1 km = 12-13 px
const BORDER: [number, number][] = [
  // G'arb-Shimol burchak (Chortoq + Qirg'iziston tutashuvi)
  [88,  90],
  // Shimoliy chegara (Qirg'iziston) — notekis tog' chizig'i
  [118, 68],
  [155, 50],
  [196, 36],
  [242, 26],
  [292, 22],
  [342, 24],
  [390, 32],
  [432, 46],
  [462, 60],
  // Sharq-Shimol burchak (Qirg'iziston + Uchqo'rg'on tutashuvi)
  [486, 76],
  // Sharqiy chegara (Norin daryosi bo'ylab — deyarli to'g'ri chiziq)
  [500, 112],
  [506, 158],
  [504, 208],
  [498, 256],
  [486, 302],
  [468, 342],
  [445, 368],
  // Janubi-Sharq burchak
  [418, 388],
  // Janubiy chegara (Namangan) — nisbatan tekis
  [368, 406],
  [312, 416],
  [256, 418],
  [200, 412],
  [155, 400],
  [120, 383],
  // Janubi-G'arb burchak
  [95,  360],
  // G'arbiy chegara (Chortoq) — qisqa
  [72,  325],
  [64,  285],
  [66,  245],
  [72,  205],
  [78,  162],
  [84,  120],
  [88,  90],
];

const mainPath = `M ${BORDER.map(([x, y]) => `${x},${y}`).join(" L ")} Z`;

// Har bir chegara bo'limining nuqtalari
const BORDERS = [
  {
    name: "Qirg'iziston", km: 42, color: "#f43f5e",
    pts: [[88,90],[118,68],[155,50],[196,36],[242,26],[292,22],[342,24],[390,32],[432,46],[462,60],[486,76]] as [number,number][],
  },
  {
    name: "Uchqo'rg'on", km: 20, color: "#a78bfa",
    pts: [[486,76],[500,112],[506,158],[504,208],[498,256],[486,302],[468,342],[445,368],[418,388]] as [number,number][],
  },
  {
    name: "Namangan", km: 35, color: "#22d3ee",
    pts: [[418,388],[368,406],[312,416],[256,418],[200,412],[155,400],[120,383],[95,360]] as [number,number][],
  },
  {
    name: "Chortoq", km: 15, color: "#fbbf24",
    pts: [[95,360],[72,325],[64,285],[66,245],[72,205],[78,162],[84,120],[88,90]] as [number,number][],
  },
];

// Qishloqlar va shaharlar (taxminiy haqiqiy joylashuv)
const VILLAGES = [
  { name: "Uychi",        x: 270, y: 228, city: true,  large: false },
  { name: "Mevazor",      x: 372, y: 185, city: false, large: true  },
  { name: "Gulbog'",      x: 444, y: 130, city: false, large: false },
  { name: "Yangi Uychi",  x: 318, y: 200, city: false, large: true  },
  { name: "Paxlakor",     x: 290, y: 315, city: false, large: true  },
  { name: "Tuyaburi",     x: 165, y: 290, city: false, large: false },
  { name: "Pastloq",      x: 232, y: 342, city: false, large: false },
  { name: "Buston",       x: 116, y: 248, city: false, large: false },
  { name: "Ertugon",      x: 142, y: 222, city: false, large: false },
  { name: "Qumtepa",      x: 218, y: 385, city: false, large: false },
];

// Norin (Naryn) daryosi — sharqiy chegara bo'ylab oqadi
const NORIN =
  "M 486,76 C 502,108 508,155 506,205 C 504,252 492,296 472,335 C 458,360 442,378 418,388";

// M-34 magistral yo'l (G'arbdan Sharqqa, tuman o'rtasidan o'tadi)
const HIGHWAY_M34 =
  "M 82,270 C 120,258 172,244 232,234 C 292,224 352,216 412,210 C 440,207 464,206 486,206";

// Ichki yo'llar
const ROAD_LOCAL_1 = "M 270,228 C 270,270 274,300 290,315";
const ROAD_LOCAL_2 = "M 270,228 C 310,220 342,210 372,185";
const ROAD_LOCAL_3 = "M 165,290 C 200,270 235,255 270,228";

// Tog' chizig'i (shimoliy qismdagi tog'lar)
const MOUNTAIN_LINES = [
  "M 138,84 L 152,70 L 166,84",
  "M 188,62 L 204,46 L 220,62",
  "M 250,40 L 268,24 L 286,40",
  "M 322,32 L 342,16 L 362,32",
  "M 398,44 L 416,30 L 434,44",
];

function seg(pts: [number, number][]) {
  return `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")}`;
}

export function UychiMap() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#060f1e] to-[#0c1a2e]">
      <svg
        viewBox="0 0 560 460"
        className="h-auto w-full"
        style={{ maxHeight: 520 }}
        aria-label="Uychi tumani xaritasi"
      >
        <defs>
          <radialGradient id="bgGrad" cx="45%" cy="42%" r="62%">
            <stop offset="0%"   stopColor="#1a3a2a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#060f1e"  stopOpacity="0"   />
          </radialGradient>
          <radialGradient id="northFog" cx="50%" cy="0%" r="55%">
            <stop offset="0%"   stopColor="#4f46e5" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#060f1e"  stopOpacity="0"   />
          </radialGradient>
          <linearGradient id="distFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#10b981" stopOpacity="0.055" />
            <stop offset="100%" stopColor="#0f172a"  stopOpacity="0.01" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
          </filter>
          <clipPath id="districtClip">
            <path d={mainPath} />
          </clipPath>
        </defs>

        {/* Fon */}
        <rect width="560" height="460" fill="url(#bgGrad)" />

        {/* Tuman soyasi */}
        <path d={mainPath} fill="#0b1e30" filter="url(#softShadow)" />

        {/* Tuman ichki to'ldirish */}
        <path d={mainPath} fill="url(#distFill)" />

        {/* Shimoliy tog' tuman effekti */}
        <g clipPath="url(#districtClip)">
          <rect x="60" y="20" width="450" height="140" fill="url(#northFog)" />
        </g>

        {/* Tog' siluetlari (shimolda) */}
        <g clipPath="url(#districtClip)" opacity="0.35">
          {MOUNTAIN_LINES.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#818cf8" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </g>

        {/* Norin daryosi */}
        <path d={NORIN} fill="none" stroke="#38bdf8" strokeWidth="4.5"
          strokeOpacity="0.4" strokeLinecap="round" filter="url(#glow)" />
        <path d={NORIN} fill="none" stroke="#bae6fd" strokeWidth="1.8"
          strokeOpacity="0.28" strokeLinecap="round" strokeDasharray="5,8" />
        <text fontSize="6.5" fill="#38bdf8" fillOpacity="0.5" fontStyle="italic"
          fontFamily="system-ui">
          <textPath href="#norinPath" startOffset="30%">Norin daryosi</textPath>
        </text>
        <defs>
          <path id="norinPath" d={NORIN} />
        </defs>

        {/* M-34 magistral yo'l */}
        <path d={HIGHWAY_M34} fill="none" stroke="#fbbf24" strokeWidth="2.5"
          strokeOpacity="0.45" strokeLinecap="round" strokeDasharray="10,6" />
        <text x="280" y="255" fontSize="6.5" fill="#fbbf24" fillOpacity="0.5"
          textAnchor="middle" fontFamily="system-ui">M-34</text>

        {/* Ichki yo'llar */}
        {[ROAD_LOCAL_1, ROAD_LOCAL_2, ROAD_LOCAL_3].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#64748b" strokeWidth="1.2"
            strokeOpacity="0.4" strokeLinecap="round" strokeDasharray="4,5" />
        ))}

        {/* Tashqi chegara chizig'i (ingichka) */}
        <path d={mainPath} fill="none" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.18" />

        {/* Animatsiyali chegara bo'limlari */}
        {BORDERS.map((b, i) => (
          <motion.path
            key={b.name}
            d={seg(b.pts)}
            fill="none"
            stroke={b.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.08 + i * 0.15, ease: "easeInOut" }}
          />
        ))}

        {/* Qo'shni viloyat/davlat yozuvlari */}
        <text x="288" y="13" textAnchor="middle" fontSize="8.5" fill="#f43f5e"
          fontWeight="800" letterSpacing="0.13em" fontFamily="system-ui"
          filter="url(#glow)">QIRGʻIZISTON</text>
        <text x="546" y="232" textAnchor="middle" fontSize="8.5" fill="#a78bfa"
          fontWeight="800" letterSpacing="0.09em" fontFamily="system-ui"
          transform="rotate(90 546 232)">UCHQOʻRGʻON</text>
        <text x="255" y="452" textAnchor="middle" fontSize="8.5" fill="#22d3ee"
          fontWeight="800" letterSpacing="0.09em" fontFamily="system-ui">NAMANGAN</text>
        <text x="12" y="230" textAnchor="middle" fontSize="8.5" fill="#fbbf24"
          fontWeight="800" letterSpacing="0.09em" fontFamily="system-ui"
          transform="rotate(-90 12 230)">CHORTOQ</text>

        {/* Chegara uzunligi yozuvlari */}
        {BORDERS.map(b => {
          const mid = b.pts[Math.floor(b.pts.length / 2)];
          const prev = b.pts[Math.max(0, Math.floor(b.pts.length / 2) - 1)];
          const dx = mid[0] - prev[0];
          const dy = mid[1] - prev[1];
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const norm = Math.sqrt(dx * dx + dy * dy) || 1;
          const ox = (-dy / norm) * 16;
          const oy = (dx / norm) * 16;
          return (
            <text key={`km-${b.name}`}
              x={mid[0] + ox} y={mid[1] + oy}
              textAnchor="middle" fontSize="6.5"
              fill={b.color} fillOpacity="0.65"
              transform={`rotate(${angle},${mid[0] + ox},${mid[1] + oy})`}
              fontFamily="system-ui">
              {b.km} km
            </text>
          );
        })}

        {/* Qishloq va shaharlar */}
        {VILLAGES.map((v, i) => (
          <motion.g
            key={v.name}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.06, duration: 0.35, ease: "backOut" }}
          >
            {v.city && (
              <>
                <circle cx={v.x} cy={v.y} r={22} fill="#06b6d4" fillOpacity="0.07" />
                <circle cx={v.x} cy={v.y} r={14} fill="#06b6d4" fillOpacity="0.05" />
              </>
            )}
            <circle
              cx={v.x} cy={v.y}
              r={v.city ? 7 : v.large ? 4.5 : 3}
              fill={v.city ? "#06b6d4" : "#34d399"}
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={v.city ? 2.5 : 1.5}
              filter="url(#glow)"
            />
            <text
              x={v.x + (v.city ? 12 : 7)}
              y={v.y + (v.city ? 4.5 : 3.5)}
              fontSize={v.city ? 12 : v.large ? 9 : 7.5}
              fill={v.city ? "#22d3ee" : "#94a3b8"}
              fontWeight={v.city ? "800" : "500"}
              fontFamily="system-ui"
            >
              {v.name}
            </text>
          </motion.g>
        ))}

        {/* Kompas */}
        <g transform="translate(526,422)">
          <circle r="20" fill="rgba(2,10,25,0.88)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <polygon points="0,-14 3,-4 -3,-4"  fill="#10b981" />
          <polygon points="0,14 3,4 -3,4"    fill="#374151" />
          <polygon points="-14,0 -4,3 -4,-3" fill="#374151" />
          <polygon points="14,0 4,3 4,-3"    fill="#374151" />
          <text x="0" y="-18" textAnchor="middle" fontSize="8"
            fill="#10b981" fontWeight="900" fontFamily="system-ui">N</text>
        </g>

        {/* Masshtab chizig'i (~10 km) */}
        <g transform="translate(28,446)">
          <line x1="0"  y1="0" x2="58" y2="0" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0"  y1="-4" x2="0"  y2="4" stroke="#4b5563" strokeWidth="1.5" />
          <line x1="29" y1="-3" x2="29" y2="3" stroke="#4b5563" strokeWidth="1"   strokeOpacity="0.5" />
          <line x1="58" y1="-4" x2="58" y2="4" stroke="#4b5563" strokeWidth="1.5" />
          <text x="29" y="-8" textAnchor="middle" fontSize="7.5"
            fill="#4b5563" fontFamily="system-ui">~10 km</text>
        </g>
      </svg>

      {/* Izoh */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 bg-white/[0.02] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
          <span className="text-[11px] font-medium text-muted">Tuman markazi</span>
        </div>
        {BORDERS.map(b => (
          <div key={b.name} className="flex items-center gap-2">
            <span className="inline-block h-[3px] w-5 rounded-full"
              style={{ backgroundColor: b.color, boxShadow: `0 0 6px ${b.color}50` }} />
            <span className="text-[11px] text-muted">{b.name}</span>
            <span className="text-[10px] text-muted/50">{b.km} km</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="inline-block h-px w-5 border-t-2 border-dashed border-sky-400/60" />
          <span className="text-[11px] text-muted">Norin daryosi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-px w-5 border-t-2 border-dashed border-amber-400/60" />
          <span className="text-[11px] text-muted">M-34 yo'l</span>
        </div>
      </div>
    </div>
  );
}
