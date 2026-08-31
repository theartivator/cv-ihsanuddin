import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

const clusters = [
  {
    id: "design", label: "Skill Desain", hex: "#34d399", anchor: { x: 15, y: 47 },
    nodes: [
      { dx: -8, dy: -17, size: 22, value: "120+", desc: "Proyek desain yang selesai dan dikirim ke klien." },
      { dx: -2, dy: -25, size: 11, value: "95%", desc: "Desain disetujui pada iterasi pertama." },
      { dx: 4, dy: -9, size: 15, value: "3x", desc: "Lebih cepat dari brief ke mockup final." },
      { dx: 8, dy: -3, size: 13, value: "8th", desc: "Pengalaman merancang produk digital." },
      { dx: -1, dy: 2, size: 9, value: "40+", desc: "Design system dan komponen library dibangun." },
    ],
  },
  {
    id: "konsep", label: "Skill Konsep", hex: "#fbbf24", anchor: { x: 40, y: 26 },
    nodes: [
      { dx: -1, dy: -9, size: 24, value: "8/8", desc: "Konsep tervalidasi lewat riset sebelum eksekusi." },
      { dx: 6, dy: -17, size: 12, value: "92%", desc: "Kesesuaian hasil akhir dengan ide awal." },
      { dx: -6, dy: -4, size: 16, value: "15+", desc: "Kerangka berpikir (framework) yang disusun." },
      { dx: 1, dy: 6, size: 9, value: "6bln", desc: "Rata-rata konsep tetap relevan tanpa revisi besar." },
    ],
  },
  {
    id: "intuit", label: "Intuiting Extrovert (STIFIN)", hex: "#a78bfa", anchor: { x: 45, y: 79 },
    nodes: [
      { dx: -6, dy: -8, size: 23, value: "Ie", desc: "Tipe mesin kecerdasan hasil tes STIFIN." },
      { dx: 0, dy: -15, size: 11, value: "87%", desc: "Akurasi membaca karakter dan potensi tim." },
      { dx: 6, dy: -5, size: 15, value: "200+", desc: "Individu yang telah dipetakan potensinya." },
      { dx: -9, dy: 2, size: 13, value: "15+", desc: "Kombinasi tipe kepribadian yang dipetakan." },
      { dx: 8, dy: 3, size: 8, value: "3th", desc: "Rutin memperbarui pemetaan potensi tim tiap tahun." },
      { dx: 1, dy: 6, size: 9, value: "4x", desc: "Kecepatan mengambil keputusan intuitif." },
    ],
  },
  {
    id: "pribadi", label: "Skill di Pribadi", hex: "#fb7185", anchor: { x: 14, y: 76 },
    nodes: [
      { dx: -5, dy: -8, size: 21, value: "4.9", desc: "Rating personal branding dari rekan & klien." },
      { dx: 2, dy: -16, size: 11, value: "50K+", desc: "Jangkauan total konten dan portofolio personal." },
      { dx: 6, dy: -4, size: 14, value: "12th", desc: "Konsistensi jejak rekam personal." },
    ],
  },
  {
    id: "team", label: "Skill Teamwork", hex: "#60a5fa", anchor: { x: 66, y: 82 },
    nodes: [
      { dx: -6, dy: -8, size: 22, value: "25+", desc: "Tim lintas fungsi yang pernah dipimpin/didampingi." },
      { dx: 0, dy: -16, size: 11, value: "98%", desc: "Tingkat retensi anggota dalam tim yang sama." },
      { dx: 6, dy: -5, size: 15, value: "10x", desc: "Proyek kolaborasi selesai tepat waktu." },
      { dx: -9, dy: 1, size: 13, value: "A+", desc: "Predikat kolaborasi dari review 360°." },
      { dx: 9, dy: 2, size: 10, value: "6", desc: "Departemen berbeda yang pernah diajak kerja sama." },
      { dx: -2, dy: 8, size: 9, value: "1.5th", desc: "Rata-rata masa kerja sama dengan tiap tim." },
      { dx: 2, dy: 6, size: 8, value: "0", desc: "Konflik tim yang dibiarkan tak terselesaikan." },
    ],
  },
  {
    id: "ai", label: "Artificial Intelligence", hex: "#22d3ee", anchor: { x: 82, y: 44 },
    nodes: [
      { dx: -6, dy: -9, size: 23, value: "40+", desc: "Tools/alur kerja berbasis AI yang dibangun." },
      { dx: 0, dy: -17, size: 11, value: "<200ms", desc: "Rata-rata waktu respons sistem AI." },
      { dx: 6, dy: -6, size: 15, value: "99%", desc: "Akurasi proses yang diotomasi." },
      { dx: 9, dy: 1, size: 13, value: "12", desc: "Model/API berbeda yang telah diintegrasikan." },
      { dx: -2, dy: 6, size: 9, value: "5x", desc: "Peningkatan efisiensi kerja setelah AI diterapkan." },
    ],
  },
  {
    id: "eq", label: "Emotional Intelligence", hex: "#fb923c", anchor: { x: 66, y: 59 },
    nodes: [
      { dx: -5, dy: -8, size: 21, value: "9.2/10", desc: "Skor kecerdasan emosional dari asesmen tim." },
      { dx: 0, dy: -15, size: 11, value: "300+", desc: "Sesi mediasi & mentoring yang difasilitasi." },
      { dx: 6, dy: -5, size: 14, value: "0", desc: "Eskalasi konflik yang tak tertangani baik." },
      { dx: 1, dy: 5, size: 8, value: "100%", desc: "Anggota tim merasa didengar (survei internal)." },
    ],
  },
  {
    id: "assembler", label: "Concepting & Assembler", hex: "#a3e635", anchor: { x: 89, y: 71 },
    nodes: [
      { dx: -5, dy: -8, size: 22, value: "60+", desc: "Sistem/komponen berbeda berhasil dirakit jadi satu." },
      { dx: 0, dy: -15, size: 11, value: "5x", desc: "Kecepatan dari konsep ke prototipe jalan." },
      { dx: 6, dy: -5, size: 14, value: "100%", desc: "Modul yang dapat dipakai ulang lintas proyek." },
      { dx: -9, dy: 1, size: 13, value: "9", desc: "Kategori sistem berbeda yang berhasil diintegrasikan." },
      { dx: 9, dy: 3, size: 9, value: "2mgu", desc: "Rata-rata waktu dari ide ke sistem berjalan." },
      { dx: 1, dy: 5, size: 8, value: "18", desc: "Produk end-to-end yang dirilis." },
    ],
  },
];

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
      <div className="max-w-6xl mx-auto">
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

          {/* links */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map((l, i) => {
              const active = hovered && hovered.clusterId === l.clusterId;
              return (
                <line
                  key={i}
                  x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
                  stroke={active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.05)"}
                  strokeWidth={active ? 0.9 : 0.5}
                  style={{ transition: "stroke .25s, stroke-width .25s" }}
                />
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
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1.35 : 1})`,
                  background: n.hex,
                  boxShadow: `0 0 ${n.size * 1.4}px ${n.hex}99`,
                  transition: "transform .18s ease, filter .18s ease",
                  filter: isHovered ? "brightness(1.3)" : "none",
                  border: "none",
                  padding: 0,
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
              </button>
            );
          })}

          {/* tooltip */}
          {hovered && (
            <div
              className="absolute z-10 rounded-md px-3 py-2.5 pointer-events-none max-w-[220px]"
              style={{
                left: hovered.x + "%",
                top: hovered.y + "%",
                transform: "translate(-50%, -125%)",
                background: "#0b0e1d",
                border: "1px solid var(--line)",
              }}
            >
              <div className="font-display font-bold text-xl" style={{ color: hovered.hex }}>
                {hovered.value}
              </div>
              <div className="text-[9px] uppercase tracking-wide mb-1.5" style={{ color: "var(--text-dim)" }}>
                {hovered.clusterLabel}
              </div>
              <div className="text-[11px] leading-snug" style={{ color: "var(--text-muted)" }}>
                {hovered.desc}
              </div>
            </div>
          )}
        </div>

        {/* legend */}
        <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-6 text-xs">
          {clusters.map((c) => (
            <span key={c.id} className="flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: c.hex }} />
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
      `}</style>
    </section>
  );
}
