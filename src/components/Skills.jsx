import { focusAreas, education, training, skillCategories } from "../data/content";
import SectionHeading from "./SectionHeading";
import SkillGraph from "./SkillGraph";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Keahlian" title="Yang saya bawa ke setiap proyek." />

        <div className="flex flex-wrap gap-4 mb-6 text-xs">
          {Object.values(skillCategories).map((c) => (
            <span
              key={c.label}
              className="flex items-center gap-2"
              style={{ color: "var(--text-dim)" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: c.color }}
              />
              {c.label}
            </span>
          ))}
        </div>

        <div className="mb-14">
          <SkillGraph />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-sm mb-5" style={{ color: "var(--text-dim)" }}>
              Kompetensi Inti
            </p>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((s) => (
                <span
                  key={s}
                  className="text-sm px-3.5 py-2 rounded-full"
                  style={{
                    border: "1px solid var(--line)",
                    color: "var(--text-muted)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm mb-5" style={{ color: "var(--text-dim)" }}>
              Pendidikan
            </p>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-display text-sm">{e.school}</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {e.detail}
                  </p>
                  <p
                    className="text-xs mt-0.5 font-mono-num"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm mb-5" style={{ color: "var(--text-dim)" }}>
              Pelatihan
            </p>
            <ul className="space-y-3">
              {training.map((t) => (
                <li
                  key={t.name}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span style={{ color: "var(--text-muted)" }}>{t.name}</span>
                  <span
                    className="font-mono-num shrink-0"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {t.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
