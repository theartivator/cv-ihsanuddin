import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

const clusters = [
  {
    id: "design", label: "Skill Desain", hex: "#1dffa8", anchor: { x: 15, y: 47 },
    nodes: [
      { dx: -8, dy: -17, size: 24, value: "120+", desc: "Proyek desain yang selesai dan dikirim ke klien." },
      { dx: -1, dy: -25, size: 11, value: "95%", desc: "Desain disetujui pada iterasi pertama." },
      { dx: 6, dy: -9, size: 15, value: "3x", desc: "Lebih cepat dari brief ke mockup final." },
    ],
  },
  {
    id: "konsep", label: "Skill Konsep", hex: "#ffd60a", anchor: { x: 40, y: 26 },
    nodes: [
      { dx: -1, dy: -9, size: 26, value: "8/8", desc: "Konsep tervalidasi lewat riset sebelum eksekusi." },
      { dx: 7, dy: -16, size: 12, value: "92%", desc: "Kesesuaian hasil akhir dengan ide awal." },
      { dx: -7, dy: -3, size: 14, value: "99+", desc: "Mind mapping melihat masalah yang harus diselesaikan." },
    ],
  },
  {
    id: "intuit", label: "Intuiting Extrovert (STIFIN)", hex: "#c04dff", anchor: { x: 45, y: 79 },
    nodes: [
      { dx: -9, dy: -19, size: 26, value: "Ie", desc: "Tipe mesin kecerdasan hasil tes STIFIN." },
      { dx: -3, dy: -27, size: 12, value: "2+", desc: "Individu yang telah dipetakan potensinya." },
      { dx: 5, dy: -22, size: 11, value: "++", desc: "Reformer" },
      { dx: 11, dy: -14, size: 11, value: "++", desc: "Quality" },
      { dx: 13, dy: -4, size: 11, value: "++", desc: "Assembler" },
      { dx: 10, dy: 6, size: 11, value: "++", desc: "Innovation" },
      { dx: 2, dy: 11, size: 11, value: "++", desc: "Forecaster" },
      { dx: -7, dy: 9, size: 11, value: "++", desc: "Solver" },
      { dx: -13, dy: 1, size: 11, value: "++", desc: "Genuine" },
      { dx: -11, dy: -8, size: 10, value: "++", desc: "Benchmarker" },
    ],
  },
  {
    id: "pribadi", label: "Skill di Pribadi", hex: "#ff3d71", anchor: { x: 14, y: 76 },
    nodes: [
      { dx: -5, dy: -8, size: 23, value: "4.9", desc: "Rating personal branding dari rekan & klien." },
      { dx: 2, dy: -16, size: 11, value: "12th", desc: "Konsistensi jejak rekam personal." },
      { dx: 8, dy: -5, size: 11, value: "15th", desc: "As Graphic designer" },
      { dx: 5, dy: 6, size: 10, value: "2nd", desc: "Month Deep Dive AI" },
    ],
  },
  {
    id: "team", label: "Skill Teamwork", hex: "#3d9dff", anchor: { x: 66, y: 82 },
    nodes: [
      { dx: -7, dy: -9, size: 25, value: "25+", desc: "Tim lintas fungsi yang pernah dipimpin/didampingi." },
      { dx: 0, dy: -18, size: 11, value: "98%", desc: "Tingkat retensi anggota dalam tim yang sama." },
      { dx: 8, dy: -13, size: 10, value: "+++", desc: "Responsible" },
      { dx: 12, dy: -3, size: 10, value: "+++", desc: "Listener" },
      { dx: 10, dy: 6, size: 10, value: "+++", desc: "Management Conflict" },
      { dx: 2, dy: 12, size: 11, value: "++++", desc: "Problem Solver" },
      { dx: -8, dy: 9, size: 10, value: "+++", desc: "Agile" },
      { dx: -12, dy: 0, size: 9, value: "++", desc: "Adaptive" },
    ],
  },
  {
    id: "ai", label: "Artificial Intelligence", hex: "#00eaff", anchor: { x: 82, y: 44 },
    nodes: [
      { dx: -7, dy: -9, size: 25, value: "40+", desc: "Tools/alur kerja berbasis AI yang dibangun." },
      { dx: 0, dy: -17, size: 11, value: "99%", desc: "Akurasi proses yang diotomasi." },
      { dx: 7, dy: -6, size: 14, value: "3+", desc: "User Artificial Intelligence LLM" },
      { dx: 9, dy: 3, size: 11, value: "++", desc: "N8N Automation Workflow" },
      { dx: -2, dy: 8, size: 12, value: "90%", desc: "Menuju Automasi System Kerja" },
      { dx: -9, dy: 1, size: 11, value: ">3", desc: "Build AI Agent dengan Hermes" },
    ],
  },
  {
    id: "creative", label: "Creative Design", hex: "#ff8c1a", anchor: { x: 66, y: 59 },
    nodes: [
      { dx: -6, dy: -8, size: 24, value: "+++", desc: "Brand Identity" },
      { dx: 0, dy: -15, size: 11, value: "++", desc: "Logo Design" },
      { dx: 7, dy: -3, size: 11, value: "++", desc: "Program & Events" },
      { dx: 2, dy: 8, size: 14, value: "+++", desc: "Social Media Management" },
    ],
  },
  {
    id: "assembler", label: "Concepting & Assembler", hex: "#baff29", anchor: { x: 89, y: 71 },
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

// flatten clusters into positioned nodes + chained link segments once
const { positioned, links } = (() => {
  const positioned = [];
  const links = [];
  clusters.forEach((cluster) => {
    let prev = cluster.anchor;
    cluster.nodes.forEach((n) => {
      const x = clamp(cluster.anchor.x + n.dx, 3, 97);
      const y = clamp(cluster.anchor.y + n.dy, 3, 97);
      links.push({ from: prev, to: { x, y }, clusterId: cluster.id });
      prev = { x, y };
      positioned.push({ ...n, x, y, clusterId: cluster.id, clusterLabel: cluster.label, hex: cluster.hex });
    });
  });
  return { positioned, links };
})();

// light beams flowing OUTWARD: from the central core toward each cluster anchor
const coreLinks = clusters.map((c, i) => ({
  id: c.id,
  hex: c.hex,
  from: CORE,
  to: c.anchor,
  delay: (i * 0.35).toFixed(2),
  duration: (3.2 + (i % 4) * 0.5).toFixed(2),
}));

// the biggest / first node of every cluster acts as its labelled "head"
const heads = clusters.map((c) => {
  const head = positioned.find((p) => p.clusterId === c.id);
  const dx = head.x - CORE.x;
  const dy = head.y - CORE.y;
  const len = Math.hypot(dx, dy) || 1;
  const push = head.size * 0.11 + 8;
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
          {/* stars — static backdrop, does not rotate */}
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

          {/* everything that orbits the core: links, nodes, head labels */}
          <div className="absolute inset-0 proof-orbit-wrap">
            {/* cluster-internal links — flow outward from head to leaves */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {links.map((l, i) => {
                const active = hovered && hovered.clusterId === l.clusterId;
                return (
                  <g key={i}>
                    <line
                      x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
                      stroke={active ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)"}
                      strokeWidth={active ? 0.9 : 0.55}
                      style={{ transition: "stroke .25s, stroke-width .25s" }}
                    />
                    <line
                      className="proof-core-flow"
                      x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
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
                  </g>
                );
              })}
            </svg>

            {/* beams flowing outward from the central core to every cluster */}
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

            {/* nodes */}
            {positioned.map((n, i) => {
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
                    <span className="proof-counter-spin inline-block">{n.value}</span>
                  </span>

                  {isHovered && (
                    <div
                      className="absolute z-10 left-1/2 bottom-full mb-3 -translate-x-1/2 pointer-events-none"
                    >
                      <div
                        className="proof-counter-spin rounded-md px-3 py-2.5 max-w-[220px]"
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
                  )}
                </button>
              );
            })}

            {/* head skill labels — every cluster head is written out, like the reference */}
            {heads.map((h) => (
              <div
                key={h.id}
                className="absolute pointer-events-none"
                style={{ left: h.x + "%", top: h.y + "%", transform: "translate(-50%, -50%)" }}
              >
                <span
                  className="proof-counter-spin inline-block whitespace-nowrap font-display font-bold text-[13px] md:text-sm"
                  style={{ color: h.hex, textShadow: `0 0 10px ${h.hex}, 0 0 2px #000` }}
                >
                  {h.label}
                </span>
              </div>
            ))}
          </div>

          {/* central core — bigger, brighter, fixed (does not rotate) */}
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

        @keyframes proof-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .proof-orbit-wrap {
          animation: proof-orbit-spin 130s linear infinite;
          transform-origin: 50% 50%;
        }
        .proof-orbit-wrap:hover {
          animation-play-state: paused;
        }

        @keyframes proof-counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .proof-counter-spin {
          animation: proof-counter-spin 130s linear infinite;
        }
        .proof-orbit-wrap:hover .proof-counter-spin {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
