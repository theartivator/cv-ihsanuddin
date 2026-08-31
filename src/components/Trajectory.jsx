import { useState } from "react";
import { experience, education, training, projectsInternship } from "../data/content";
import SectionHeading from "./SectionHeading";

// Tiga kolom paralel (kerja / pendidikan / pelatihan) menggantikan satu
// timeline vertikal panjang, supaya seluruh perjalanan muat dalam satu
// layar tanpa scroll berkepanjangan. Kolom kerja memakai accordion karena
// datanya paling padat (ada bullet pencapaian).
const COLUMN_META = {
  kerja: { label: "Pengalaman kerja", color: "var(--accent)" },
  pendidikan: { label: "Pendidikan", color: "var(--gold)" },
  pelatihan: { label: "Pelatihan", color: "#5dd9b0" },
};

const LOGO_PALETTE = ["#8fa6ff", "#e8b84b", "#5dd9b0", "#ff9a44", "#c792ea"];

export default function Trajectory() {
  return (
    <section id="experience" className="relative px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          eyebrow="Perjalanan"
          title="Dari desain ke sistem, satu peran dalam satu waktu."
        />

        <Legend />

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-start">
          <CareerColumn />
          <SimpleColumn columnKey="pendidikan" items={education.map((e) => ({
            id: e.school,
            title: e.school,
            subtitle: e.detail,
            period: e.period,
          }))} />
          <SimpleColumn columnKey="pelatihan" items={training.map((t) => ({
            id: t.name,
            title: t.name,
            subtitle: "Pelatihan",
            period: t.period,
          }))} />
        </div>

        <ProjectsLogoWall />
      </div>
    </section>
  );
}

function Legend() {
  return (
    <div className="flex gap-3 mb-8 text-xs flex-wrap">
      {Object.entries(COLUMN_META).map(([key, meta]) => (
        <span
          key={key}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ border: "1px solid var(--line)", color: "var(--text-muted)" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: meta.color }} />
          {meta.label}
        </span>
      ))}
    </div>
  );
}

function ColumnHeader({ columnKey, count }) {
  const meta = COLUMN_META[columnKey];
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
      <h3 className="font-display text-sm font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
        {meta.label}
      </h3>
      <span className="text-xs font-mono-num ml-auto" style={{ color: "var(--text-dim)" }}>
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

function ColumnShell({ columnKey, count, children }) {
  return (
    <div
      className="rounded-2xl flex flex-col p-3 md:p-4"
      style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
    >
      <ColumnHeader columnKey={columnKey} count={count} />
      <div className="flex flex-col gap-1.5 md:max-h-[26rem] md:overflow-y-auto scroll-thin pr-1 -mr-1">
        {children}
      </div>
    </div>
  );
}

function CareerColumn() {
  const [openIndex, setOpenIndex] = useState(0);
  const color = COLUMN_META.kerja.color;

  return (
    <ColumnShell columnKey="kerja" count={experience.length}>
      {experience.map((e, i) => {
        const open = openIndex === i;
        return (
          <div
            key={e.role + e.period}
            className="rounded-xl transition-colors"
            style={{
              border: "1px solid",
              borderColor: open ? "var(--line)" : "transparent",
              background: open ? "var(--surface-2)" : "transparent",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="w-full text-left px-2.5 py-2.5 flex items-start gap-2.5"
              aria-expanded={open}
            >
              <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
              <span className="flex-1 min-w-0">
                <span className="block font-display text-sm font-medium leading-snug">{e.role}</span>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                  {e.org} · {e.period}
                </span>
              </span>
              <Chevron open={open} color={color} />
            </button>
            {open && e.bullets.length > 0 && (
              <ul className="px-2.5 pb-3 pl-7 space-y-1.5">
                {e.bullets.map((b, j) => (
                  <li key={j} className="text-xs leading-relaxed flex gap-2" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color }} className="mt-0.5 shrink-0">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </ColumnShell>
  );
}

function SimpleColumn({ columnKey, items }) {
  const color = COLUMN_META[columnKey].color;
  return (
    <ColumnShell columnKey={columnKey} count={items.length}>
      {items.map((item) => (
        <div key={item.id} className="px-2.5 py-2.5 rounded-xl" style={{ background: "transparent" }}>
          <div className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
            <span className="flex-1 min-w-0">
              <span className="block font-display text-sm font-medium leading-snug">{item.title}</span>
              <span className="block text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                {item.subtitle}
              </span>
            </span>
            <span className="text-xs font-mono-num shrink-0" style={{ color: "var(--text-dim)" }}>
              {item.period}
            </span>
          </div>
        </div>
      ))}
    </ColumnShell>
  );
}

function Chevron({ open, color }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-1 shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M3 5.5L7 9.5L11 5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Dinding logo proyek & magang — 10 slot (5 atas, 5 bawah). Tiap organisasi
// tampil sebagai wordmark singkat berwarna selama logoUrl belum diisi;
// begitu logoUrl terisi di `projectsInternship` (src/data/content.js),
// wordmark otomatis diganti gambar logo aslinya.
function ProjectsLogoWall() {
  return (
    <div className="mt-10 md:mt-12">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-sm" style={{ color: "var(--text-dim)" }}>
          Proyek &amp; Magang
        </p>
        <p className="text-xs font-mono-num" style={{ color: "var(--text-dim)" }}>
          {String(projectsInternship.length).padStart(2, "0")} / 10
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {projectsInternship.map((p, i) => (
          <LogoTile key={p.org} project={p} color={LOGO_PALETTE[i % LOGO_PALETTE.length]} />
        ))}
      </div>
    </div>
  );
}

function LogoTile({ project, color }) {
  return (
    <div
      className="group relative aspect-[4/3] rounded-xl flex flex-col items-center justify-center gap-1.5 px-2 text-center transition-all duration-200 overflow-hidden"
      style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      title={project.period ? `${project.org} · ${project.period}` : project.org}
    >
      {project.logoUrl ? (
        <img
          src={project.logoUrl}
          alt={project.org}
          className="max-w-[70%] max-h-[60%] object-contain"
        />
      ) : (
        <span
          className="font-display font-semibold text-sm md:text-base tracking-wide transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="group-hover:hidden">{project.short}</span>
          <span className="hidden group-hover:inline" style={{ color }}>
            {project.short}
          </span>
        </span>
      )}
      {project.period && (
        <span
          className="text-[10px] font-mono-num opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: "var(--text-dim)" }}
        >
          {project.period}
        </span>
      )}
    </div>
  );
}
