import { about } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Tentang" title={about.heading} />

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-5">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="leading-relaxed text-[15px] md:text-base max-w-[62ch]"
                style={{ color: "var(--text-muted)" }}
              >
                {p}
              </p>
            ))}

            <div className="pt-4">
              <p className="text-sm mb-3" style={{ color: "var(--text-dim)" }}>
                Yang tidak saya lakukan
              </p>
              <ul className="space-y-2">
                {about.notDo.map((line, i) => (
                  <li
                    key={i}
                    className="text-sm flex gap-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: "var(--gold)" }}>—</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            {about.principles.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 className="font-display text-base mb-2">{p.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
