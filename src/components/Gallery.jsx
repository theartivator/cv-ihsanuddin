import { gallery } from "../data/content";
import SectionHeading from "./SectionHeading";

const thumbGradients = [
  "linear-gradient(135deg, rgba(143,166,255,0.35), var(--surface-2))",
  "linear-gradient(135deg, rgba(93,217,176,0.30), var(--surface-2))",
  "linear-gradient(135deg, rgba(232,184,75,0.30), var(--surface-2))",
  "linear-gradient(135deg, rgba(143,166,255,0.20), rgba(93,217,176,0.20))",
  "linear-gradient(135deg, rgba(232,184,75,0.22), rgba(143,166,255,0.18))",
  "linear-gradient(135deg, rgba(93,217,176,0.22), rgba(232,184,75,0.18))",
  "linear-gradient(135deg, rgba(143,166,255,0.28), var(--bg-alt))",
  "linear-gradient(135deg, rgba(232,184,75,0.24), var(--bg-alt))",
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Galeri"
          title="Sebagian kecil dari yang pernah saya kerjakan."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gallery.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
            >
              <div
                className="relative aspect-[4/3] flex items-end p-3"
                style={{ background: thumbGradients[i % thumbGradients.length] }}
              >
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(5,7,15,0.5)",
                    color: "var(--text)",
                    border: "1px solid var(--line)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm mb-1">{item.title}</h3>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                  {item.org}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-10">
          <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
          <span
            className="text-sm px-5 py-2.5 rounded-full whitespace-nowrap"
            style={{ border: "1px solid var(--line)", background: "var(--bg-alt)" }}
          >
            <span style={{ color: "var(--gold)", fontWeight: 700 }}>
              +{gallery.moreCount}
            </span>{" "}
            <span style={{ color: "var(--text-dim)" }}>karya lainnya</span>
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
