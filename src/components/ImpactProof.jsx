import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

const clusters = [
  {
    id: "design", label: "Skill Desain", hex: "#1dffa8", anchor: { x: 62.5, y: 50 },
    nodes: [
      { dx: -4.79, dy: -10.18, size: 24, value: "120+", desc: "Proyek desain yang selesai dan dikirim ke klien." },
      { dx: -0.6, dy: -14.97, size: 11, value: "95%", desc: "Desain disetujui pada iterasi pertama." },
      { dx: 3.59, dy: -5.39, size: 15, value: "3x", desc: "Lebih cepat dari brief ke mockup final." },
    ],
  },
  {
    id: "konsep", label: "Skill Konsep", hex: "#ffd60a", anchor: { x: 58.84, y: 64.14 },
    nodes: [
      { dx: -0.77, dy: -6.91, size: 26, value: "8/8", desc: "Konsep tervalidasi lewat riset sebelum eksekusi." },
      { dx: 5.38, dy: -12.29, size: 12, value: "92%", desc: "Kesesuaian hasil akhir dengan ide awal." },
      { dx: -5.38, dy: -2.3, size: 14, value: "99+", desc: "Mind mapping melihat masalah yang harus diselesaikan." },
    ],
  },
  {
    id: "intuit", label: "Intuiting Extrovert (STIFIN)", hex: "#c04dff", anchor: { x: 50, y: 30 },
    nodes: [
      { dx: -4.92, dy: -10.39, size: 26, value: "Ie", desc: "Tipe mesin kecerdasan hasil tes STIFIN." },
      { dx: -1.64, dy: -14.77, size: 12, value: "2+", desc: "Individu yang telah dipetakan potensinya." },
      { dx: 2.73, dy: -12.03, size: 11, value: "++", desc: "Reformer" },
      { dx: 6.02, dy: -7.66, size: 11, value: "++", desc: "Quality" },
      { dx: 7.11, dy: -2.19, size: 11, value: "++", desc: "Assembler" },
      { dx: 5.47, dy: 3.28, size: 11, value: "++", desc: "Innovation" },
      { dx: 1.09, dy: 6.02, size: 11, value: "++", desc: "Forecaster" },
      { dx: -3.83, dy: 4.92, size: 11, value: "++", desc: "Solver" },
      { dx: -7.11, dy: 0.55, size: 11, value: "++", desc: "Genuine" },
      { dx: -6.02, dy: -4.38, size: 10, value: "++", desc: "Benchmarker" },
    ],
  },
  {
    id: "pribadi", label: "Skill di Pribadi", hex: "#ff3d71", anchor: { x: 58.84, y: 35.86 },
    nodes: [
      { dx: -4.6, dy: -7.35, size: 23, value: "4.9", desc: "Rating personal branding dari rekan & klien." },
      { dx: 1.84, dy: -14.71, size: 11, value: "12th", desc: "Konsistensi jejak rekam personal." },
      { dx: 7.35, dy: -4.6, size: 11, value: "15th", desc: "As Graphic designer" },
      { dx: 4.6, dy: 5.52, size: 10, value: "2nd", desc: "Month Deep Dive AI" },
    ],
  },
  {
    id: "team", label: "Skill Teamwork", hex: "#3d9dff", anchor: { x: 41.16, y: 35.86 },
    nodes: [
      { dx: -5.4, dy: -6.95, size: 25, value: "25+", desc: "Tim lintas fungsi yang pernah dipimpin/didampingi." },
      { dx: 0, dy: -13.89, size: 11, value: "98%", desc: "Tingkat retensi anggota dalam tim yang sama." },
      { dx: 6.18, dy: -10.03, size: 10, value: "+++", desc: "Responsible" },
      { dx: 9.26, dy: -2.32, size: 10, value: "+++", desc: "Listener" },
      { dx: 7.72, dy: 4.63, size: 10, value: "+++", desc: "Management Conflict" },
      { dx: 1.54, dy: 9.26, size: 11, value: "++++", desc: "Problem Solver" },
      { dx: -6.18, dy: 6.95, size: 10, value: "+++", desc: "Agile" },
      { dx: -9.26, dy: 0, size: 9, value: "++", desc: "Adaptive" },
    ],
  },
  {
    id: "ai", label: "Artificial Intelligence", hex: "#00eaff", anchor: { x: 50, y: 70 },
    nodes: [
      { dx: -6.18, dy: -7.94, size: 25, value: "40+", desc: "Tools/alur kerja berbasis AI yang dibangun." },
      { dx: 0, dy: -15, size: 11, value: "99%", desc: "Akurasi proses yang diotomasi." },
      { dx: 6.18, dy: -5.29, size: 14, value: "3+", desc: "User Artificial Intelligence LLM" },
      { dx: 7.94, dy: 2.65, size: 11, value: "++", desc: "N8N Automation Workflow" },
      { dx: -1.76, dy: 7.06, size: 12, value: "90%", desc: "Menuju Automasi System Kerja" },
      { dx: -7.94, dy: 0.88, size: 11, value: ">3", desc: "Build AI Agent dengan Hermes" },
    ],
  },
  {
    id: "creative", label: "Creative Design", hex: "#ff8c1a", anchor: { x: 37.5, y: 50 },
    nodes: [
      { dx: -6, dy: -8, size: 24, value: "+++", desc: "Brand Identity" },
      { dx: 0, dy: -15, size: 11, value: "++", desc: "Logo Design" },
      { dx: 7, dy: -3, size: 11, value: "++", desc: "Program & Events" },
      { dx: 2, dy: 8, size: 14, value: "+++", desc: "Social Media Management" },
    ],
  },
  {
    id: "assembler", label: "Concepting & Assembler", hex: "#baff29", anchor: { x: 41.16, y: 64.14 },
    nodes: [
      { dx: -6, dy: -8, size: 24, value: "60+", desc: "Sistem/komponen berbeda berhasil dirakit jadi satu." },
      { dx: 0, dy: -15, size: 11, value: "18", desc: "Produk end-to-end yang dirilis." },
      { dx: 6, dy: -4, size: 12, value: "30+", desc: "Tata kelola disusun." },
      { dx: -2, dy: 8, size: 10, value: "++", desc: "System Integrasi" },
    ],
  },
];

const CORE = { x: 50, y: 50 };

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// flatten clusters: every non-head leaf links straight to its own head
// (star topology). Heads themselves stay perfectly still — only the small
// leaves spin locally around their head, exactly like the reference video.
let leafCounter = 0;
const { heads: headNodes, leaves } = (() => {
  const heads = [];
  const leaves = [];
  clusters.forEach((cluster) => {
    cluster.nodes.forEach((n, idx) => {
      const x = clamp(cluster.anchor.x + n.dx, 3, 97);
      const y = clamp(cluster.anchor.y + n.dy, 3, 97);
      if (idx === 0) {
        heads.push({ ...n, x, y, clusterId: cluster.id, clusterLabel: cluster.label, hex: cluster.hex, anchor: cluster.anchor });
      } else {
        const li = leafCounter++;
        const duration = (15 + (li % 7) * 3.4).toFixed(2);
        const clockwise = li % 2 === 0;
        leaves.push({
          ...n, x, y,
          clusterId: cluster.id, clusterLabel: cluster.label, hex: cluster.hex,
          head: cluster.anchor,
          duration, delay: ((li % 5) * 0.55).toFixed(2), clockwise,
        });
      }
    });
  });
  return { heads, leaves };
})();

// light beams flowing INWARD: small node -> head -> core
const coreLinks = clusters.map((c, i) => ({
  id: c.id,
  hex: c.hex,
  from: c.anchor,
  to: CORE,
  delay: (i * 0.35).toFixed(2),
  duration: (3.2 + (i % 4) * 0.5).toFixed(2),
}));

// every cluster head gets its label written out, pushed a little further
// from the core so it doesn't sit on top of the node itself
const headLabels = clusters.map((c) => {
  const head = headNodes.find((p) => p.clusterId === c.id);
  const dx = head.x - CORE.x;
  const dy = head.y - CORE.y;
  const len = Math.hypot(dx, dy) || 1;
  const push = head.size * 0.1 + 6.5;
  return {
    id: c.id,
    label: c.label,
    hex: c.hex,
    x: head.x + (dx / len) * push,
    y: head.y + (dy / len) * push,
  };
});

function useStars(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
      })),
    [count]
  );
}

export default function ImpactProof() {
  const [hovered, setHovered] = useState(null);
  const stars = useStars(110);

  return (
    <section id="proof" className="relative px-6 py-28">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Bukti" title="Proven, reliable!" />
        <p className="text-sm max-w-xl -mt-8 mb-10" style={{ color: "var(--text-dim)" }}>
          Solusi dari masalahmu. Setiap angka dari pengalaman nyata, bukan proyeksi.
        </p>

        <div
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 30% 20%, #0b0f22 0%, #05070f 55%)", border: "1px solid var(--line)" }}
        >
          {/* stars */}
          <div className="absolute inset-0">
            {stars.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: s.left + "%",
                  top: s.top + "%",
                  width: s.size,
                  height: s.size,
                  opacity: 0.4,
                  animation: `proof-twinkle 4s ease-in-out ${s.delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* head -> core beams (static endpoints, flow travels inward) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {coreLinks.map((l) => {
              const active = hovered && hovered.clusterId === l.id;
              return (
                <g key={l.id}>
                  <line
                    x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
                    stroke={l.hex}
                    strokeWidth={active ? 0.55 : 0.3}
                    opacity={active ? 0.55 : 0.24}
                    style={{ transition: "opacity .25s, stroke-width .25s" }}
                  />
                  <line
                    className="proof-core-flow"
                    x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
                    stroke="#ffffff"
                    strokeWidth={active ? 0.65 : 0.42}
                    strokeLinecap="round"
                    strokeDasharray="0.6 7"
                    opacity={active ? 1 : 0.65}
                    style={{
                      animationDuration: `${l.duration}s`,
                      animationDelay: `${l.delay}s`,
                      filter: `drop-shadow(0 0 1.6px ${l.hex})`,
                      transition: "opacity .25s, stroke-width .25s",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* each leaf orbits locally around its own head; the connecting
              line to the head swings together with it (same rotating group) */}
          {leaves.map((n, i) => {
            const isHovered = hovered === n;
            const spin = n.clockwise ? "proof-leaf-spin-cw" : "proof-leaf-spin-ccw";
            const counter = n.clockwise ? "proof-leaf-counter-cw" : "proof-leaf-counter-ccw";
            const active = hovered && hovered.clusterId === n.clusterId;
            return (
              <div
                key={i}
                className={`absolute inset-0 proof-leaf-orbit ${spin}`}
                style={{
                  transformOrigin: `${n.head.x}% ${n.head.y}%`,
                  animationDuration: `${n.duration}s`,
                  animationDelay: `${n.delay}s`,
                }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line
                    x1={n.head.x} y1={n.head.y} x2={n.x} y2={n.y}
                    stroke={active ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)"}
                    strokeWidth={active ? 0.9 : 0.55}
                    style={{ transition: "stroke .25s, stroke-width .25s" }}
                  />
                  <line
                    className="proof-core-flow"
                    x1={n.x} y1={n.y} x2={n.head.x} y2={n.head.y}
                    stroke="#ffffff"
                    strokeWidth={active ? 0.5 : 0.3}
                    strokeLinecap="round"
                    strokeDasharray="0.5 6"
                    opacity={active ? 0.9 : 0.5}
                    style={{
                      animationDuration: `${(2.2 + (i % 5) * 0.4).toFixed(2)}s`,
                      animationDelay: `${(i * 0.12).toFixed(2)}s`,
                      transition: "opacity .25s, stroke-width .25s",
                    }}
                  />
                </svg>

                <button
                  type="button"
                  aria-label={`${n.clusterLabel}: ${n.value}`}
                  className="absolute rounded-full cursor-pointer"
                  style={{
                    left: n.x + "%",
                    top: n.y + "%",
                    width: n.size,
                    height: n.size,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`,
                    background: n.hex,
                    boxShadow: `0 0 ${n.size * 2}px ${n.hex}, 0 0 ${n.size * 0.6}px ${n.hex}`,
                    transition: "transform .18s ease, filter .18s ease",
                    filter: isHovered ? "brightness(1.4)" : "none",
                    border: "none",
                    padding: 0,
                    zIndex: isHovered ? 5 : 1,
                  }}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(n)}
                  onBlur={() => setHovered(null)}
                >
                  <span
                    className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono-num text-[10px]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    <span className={`inline-block ${counter}`} style={{ animationDuration: `${n.duration}s`, animationDelay: `${n.delay}s` }}>
                      {n.value}
                    </span>
                  </span>

                  {isHovered && (
                    <div className="absolute z-10 left-1/2 bottom-full mb-3 -translate-x-1/2 pointer-events-none">
                      <div
                        className={`inline-block ${counter}`}
                        style={{ animationDuration: `${n.duration}s`, animationDelay: `${n.delay}s` }}
                      >
                        <div
                          className="rounded-md px-3 py-2.5 max-w-[220px] text-left"
                          style={{ background: "#0b0e1d", border: "1px solid var(--line)" }}
                        >
                          <div className="font-display font-bold text-xl" style={{ color: n.hex }}>
                            {n.value}
                          </div>
                          <div className="text-[9px] uppercase tracking-wide mb-1.5" style={{ color: "var(--text-dim)" }}>
                            {n.clusterLabel}
                          </div>
                          <div className="text-[11px] leading-snug" style={{ color: "var(--text-muted)" }}>
                            {n.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}

          {/* head nodes — completely static, always connected to the core */}
          {headNodes.map((n, i) => {
            const isHovered = hovered === n;
            return (
              <button
                key={i}
                type="button"
                aria-label={`${n.clusterLabel}: ${n.value}`}
                className="absolute rounded-full cursor-pointer"
                style={{
                  left: n.x + "%",
                  top: n.y + "%",
                  width: n.size,
                  height: n.size,
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`,
                  background: n.hex,
                  boxShadow: `0 0 ${n.size * 2}px ${n.hex}, 0 0 ${n.size * 0.6}px ${n.hex}`,
                  transition: "transform .18s ease, filter .18s ease",
                  filter: isHovered ? "brightness(1.4)" : "none",
                  border: "none",
                  padding: 0,
                  zIndex: isHovered ? 6 : 2,
                }}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n)}
                onBlur={() => setHovered(null)}
              >
                <span
                  className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono-num text-[10px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {n.value}
                </span>
                {isHovered && renderTooltipStatic(n)}
              </button>
            );
          })}

          {/* head skill labels */}
          {headLabels.map((h) => (
            <div
              key={h.id}
              className="absolute pointer-events-none"
              style={{ left: h.x + "%", top: h.y + "%", transform: "translate(-50%, -50%)" }}
            >
              <span
                className="inline-block whitespace-nowrap font-display font-bold text-[13px] md:text-sm"
                style={{ color: h.hex, textShadow: `0 0 10px ${h.hex}, 0 0 2px #000` }}
              >
                {h.label}
              </span>
            </div>
          ))}

          {/* central core — bigger, brighter, always fixed */}
          <div
            className="absolute pointer-events-none"
            style={{ left: CORE.x + "%", top: CORE.y + "%", transform: "translate(-50%, -50%)" }}
          >
            <div
              className="proof-core-halo absolute rounded-full"
              style={{
                width: 230, height: 230, left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(180,200,255,0.55) 0%, rgba(143,166,255,0) 68%)",
                filter: "blur(1px)",
              }}
            />
            <svg
              className="proof-core-brain relative"
              width="70" height="58" viewBox="0 0 46 38"
              style={{ overflow: "visible" }}
            >
              <defs>
                <radialGradient id="proof-core-grad" cx="50%" cy="45%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="55%" stopColor="#d8e0ff" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#8fa6ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M23 3
                   C14 -1 3 4 3 14
                   C3 19 6 21 5 25
                   C4 30 9 34 15 33
                   C18 36 28 36 31 33
                   C37 34 42 30 41 25
                   C40 21 43 19 43 14
                   C43 4 32 -1 23 3 Z"
                fill="url(#proof-core-grad)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="0.6"
              />
              <path d="M23 5 C21 12 21 22 23 32" stroke="rgba(11,15,34,0.35)" strokeWidth="0.5" fill="none" />
              <path d="M12 10 C15 15 15 22 11 27" stroke="rgba(11,15,34,0.25)" strokeWidth="0.4" fill="none" />
              <path d="M34 10 C31 15 31 22 35 27" stroke="rgba(11,15,34,0.25)" strokeWidth="0.4" fill="none" />
            </svg>
            <div
              className="proof-core-pulse absolute rounded-full"
              style={{
                width: 16, height: 16, left: "50%", top: "58%",
                transform: "translate(-50%, -50%)",
                background: "#ffffff",
                boxShadow: "0 0 30px 10px rgba(255,255,255,0.95)",
              }}
            />
          </div>
        </div>

        {/* legend */}
        <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-6 text-xs">
          {clusters.map((c) => (
            <span key={c.id} className="flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: c.hex, boxShadow: `0 0 6px ${c.hex}` }} />
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes proof-twinkle {
          0%, 100% { opacity: .15; }
          50% { opacity: .75; }
        }
        @keyframes proof-flow-dash {
          to { stroke-dashoffset: -30; }
        }
        .proof-core-flow {
          animation-name: proof-flow-dash;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes proof-core-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .95; }
          50% { transform: translate(-50%, -50%) scale(1.6); opacity: .6; }
        }
        .proof-core-pulse {
          animation: proof-core-pulse 2.6s ease-in-out infinite;
        }
        @keyframes proof-core-halo-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .9; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: .5; }
        }
        .proof-core-halo {
          animation: proof-core-halo-pulse 3.4s ease-in-out infinite;
        }
        @keyframes proof-core-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(180,200,255,0.7)); }
          50% { filter: drop-shadow(0 0 24px rgba(180,200,255,1)); }
        }
        .proof-core-brain {
          animation: proof-core-glow 3.4s ease-in-out infinite;
        }

        /* every small leaf node orbits its own head — heads and core never move */
        @keyframes proof-leaf-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes proof-leaf-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .proof-leaf-orbit {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .proof-leaf-spin-cw { animation-name: proof-leaf-spin-cw; }
        .proof-leaf-spin-ccw { animation-name: proof-leaf-spin-ccw; }
        .proof-leaf-orbit:hover {
          animation-play-state: paused;
        }

        /* counter-rotation keeps each leaf's value/tooltip text upright */
        @keyframes proof-counter-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes proof-counter-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .proof-leaf-counter-cw {
          animation-name: proof-counter-cw;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .proof-leaf-counter-ccw {
          animation-name: proof-counter-ccw;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .proof-leaf-orbit:hover .proof-leaf-counter-cw,
        .proof-leaf-orbit:hover .proof-leaf-counter-ccw {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function renderTooltipStatic(n) {
  return (
    <div className="absolute z-10 left-1/2 bottom-full mb-3 -translate-x-1/2 pointer-events-none">
      <div
        className="rounded-md px-3 py-2.5 max-w-[220px]"
        style={{ background: "#0b0e1d", border: "1px solid var(--line)" }}
      >
        <div className="font-display font-bold text-xl" style={{ color: n.hex }}>
          {n.value}
        </div>
        <div className="text-[9px] uppercase tracking-wide mb-1.5" style={{ color: "var(--text-dim)" }}>
          {n.clusterLabel}
        </div>
        <div className="text-[11px] leading-snug" style={{ color: "var(--text-muted)" }}>
          {n.desc}
        </div>
      </div>
    </div>
  );
}
