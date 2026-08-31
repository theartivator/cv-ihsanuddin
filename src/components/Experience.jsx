import { experience, projectsInternship } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Perjalanan" title="Dari desain ke sistem, satu peran dalam satu waktu." />

        <div
          className="relative"
          style={{ borderLeft: "1px solid var(--line)" }}
        >
          {experience.map((role, i) => (
            <div key={i} className="relative pl-8 pb-14 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-display text-lg md:text-xl">
                  {role.role}
                  <span style={{ color: "var(--text-dim)" }}> · {role.org}</span>
                </h3>
                <span
                  className="text-sm font-mono-num"
                  style={{ color: "var(--text-dim)" }}
                >
                  {role.period}
                </span>
              </div>
              <ul className="space-y-2">
                {role.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed flex gap-3 max-w-2xl"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: "var(--gold)" }} className="mt-0.5">
                      ·
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-sm mb-5" style={{ color: "var(--text-dim)" }}>
            Proyek & Magang
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {projectsInternship.map((p) => (
              <div
                key={p.org}
                className="p-4 rounded-xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                <p className="text-sm font-medium">{p.org}</p>
                <p
                  className="text-xs mt-1 font-mono-num"
                  style={{ color: "var(--text-dim)" }}
                >
                  {p.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
