import { experience, education, training, projectsInternship } from "../data/content";
import SectionHeading from "./SectionHeading";

// Menggabungkan tiga sumber data jadi satu timeline dengan sumbu tahun,
// setiap kategori punya warna sendiri (selaras dengan skill constellation).
const CATEGORY_COLOR = {
  kerja: "var(--accent)",
  pendidikan: "var(--gold)",
  pelatihan: "#5dd9b0",
};

function parseStartYear(period) {
  const match = period.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : new Date().getFullYear();
}

function buildTimelineItems() {
  const items = [
    ...experience.map((e) => ({
      year: parseStartYear(e.period),
      title: e.role,
      subtitle: e.org,
      period: e.period,
      category: "kerja",
      bullets: e.bullets,
    })),
    ...education.map((e) => ({
      year: parseStartYear(e.period),
      title: e.school,
      subtitle: e.detail,
      period: e.period,
      category: "pendidikan",
      bullets: [],
    })),
    ...training.map((t) => ({
      year: parseStartYear(t.period),
      title: t.name,
      subtitle: "Pelatihan",
      period: t.period,
      category: "pelatihan",
      bullets: [],
    })),
  ];
  return items.sort((a, b) => b.year - a.year);
}

export default function Trajectory() {
  const items = buildTimelineItems();

  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Perjalanan"
          title="Dari desain ke sistem, satu peran dalam satu waktu."
        />

        <div className="flex gap-3 mb-10 text-xs flex-wrap">
          {Object.entries({
            kerja: "Pengalaman kerja",
            pendidikan: "Pendidikan",
            pelatihan: "Pelatihan",
          }).map(([key, label]) => (
            <span
              key={key}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ border: "1px solid var(--line)", color: "var(--text-muted)" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: CATEGORY_COLOR[key] }}
              />
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] gap-x-2">
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "var(--line)" }}
            />
          </div>
          <div />

          {items.map((item, i) => {
            const prevYear = i > 0 ? items[i - 1].year : null;
            const showYear = item.year !== prevYear;
            return (
              <YearRow
                key={i}
                item={item}
                showYear={showYear}
                isLast={i === items.length - 1}
              />
            );
          })}
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

function YearRow({ item, showYear, isLast }) {
  const color = CATEGORY_COLOR[item.category];
  return (
    <>
      <div className="relative flex justify-center">
        <div
          className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-10"
          style={{ background: color }}
        />
        {!isLast && (
          <div
            className="absolute left-1/2 top-1.5 bottom-0 w-px -translate-x-1/2"
            style={{ background: "var(--line)" }}
          />
        )}
        {showYear && (
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full text-xs font-mono-num pb-1"
            style={{ color: "var(--text-dim)" }}
          >
            {item.year}
          </span>
        )}
      </div>

      <div className="pb-10">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h3 className="font-display text-base md:text-lg">{item.title}</h3>
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>
            {item.subtitle}
          </span>
          <span
            className="text-xs font-mono-num ml-auto"
            style={{ color: "var(--text-dim)" }}
          >
            {item.period}
          </span>
        </div>
        {item.bullets.length > 0 && (
          <ul className="space-y-1.5">
            {item.bullets.map((b, j) => (
              <li
                key={j}
                className="text-sm leading-relaxed flex gap-2.5 max-w-2xl"
                style={{ color: "var(--text-muted)" }}
              >
                <span style={{ color }} className="mt-0.5">
                  ·
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
