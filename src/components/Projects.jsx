import { projectsInternship } from "../data/content";

const LOGO_PALETTE = ["#8fa6ff", "#e8b84b", "#5dd9b0", "#ff9a44", "#c792ea"];

// Dinding logo proyek & magang — sekarang section sendiri (slide sendiri
// saat scroll-snap), terpisah dari Perjalanan. 15 slot, 3 baris x 5 kolom.
// Tiap organisasi tampil sebagai wordmark singkat berwarna selama logoUrl
// belum diisi; begitu logoUrl terisi di `projectsInternship`
// (src/data/content.js), wordmark otomatis diganti gambar logo aslinya.
export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            Proyek &amp; Magang
          </p>
          <p className="text-xs font-mono-num" style={{ color: "var(--text-dim)" }}>
            {String(projectsInternship.length).padStart(2, "0")} / 15
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {projectsInternship.map((p, i) => (
            <LogoTile key={p.org} project={p} color={LOGO_PALETTE[i % LOGO_PALETTE.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoTile({ project, color }) {
  return (
    <div
      className="group relative aspect-[4/3] rounded-xl flex flex-col items-center justify-center gap-1.5 px-2 text-center transition-all duration-200 overflow-hidden"
      style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
      title={project.period ? `${project.org} \u00b7 ${project.period}` : project.org}
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
