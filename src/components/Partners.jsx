import { partners } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Partners() {
  return (
    <section id="partners" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Kolaborasi"
          title="Organisasi yang pernah saya ajak kerja sama."
        />

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="aspect-[3/2] rounded-xl flex items-center justify-center p-4"
              style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
            >
              {p.logoUrl ? (
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span
                  className="text-xs text-center leading-snug"
                  style={{ color: "var(--text-dim)" }}
                >
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
