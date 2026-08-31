import { featuredWork } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function FeaturedWork() {
  return (
    <section id="work" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Karya" title="Sistem dan kampanye yang saya bangun." />

        <div className="grid md:grid-cols-3 gap-6">
          {featuredWork.map((w) => (
            <article
              key={w.title}
              className="p-6 rounded-2xl flex flex-col"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
              }}
            >
              <span
                className="text-xs px-2.5 py-1 rounded-full self-start mb-4"
                style={{ background: "var(--gold-soft)", color: "var(--gold)" }}
              >
                {w.tag}
              </span>
              <h3 className="font-display text-lg mb-1">{w.title}</h3>
              <p className="text-xs mb-5" style={{ color: "var(--text-dim)" }}>
                {w.org}
              </p>

              <div className="space-y-4 text-sm flex-1">
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Konteks
                  </p>
                  <p style={{ color: "var(--text-muted)" }}>{w.context}</p>
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Pendekatan
                  </p>
                  <p style={{ color: "var(--text-muted)" }}>{w.approach}</p>
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    Hasil
                  </p>
                  <p style={{ color: "var(--text)" }}>{w.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
