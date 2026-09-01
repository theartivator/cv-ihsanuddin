import { toolsForSystem } from "../data/content";
import SectionHeading from "./SectionHeading";

// Section 16:9 tunggal untuk menampilkan kolase/screenshot tools kerja.
// Box diberi background solid (var(--surface)) supaya logo/gambar PNG
// frameless (transparan, grafis putih) tetap kontras jelas — bukan
// menyatu dengan background jaringan titik-titik di belakangnya.
export default function ToolsForSystem() {
  const { eyebrow, title, description, imageUrl, imageAlt } = toolsForSystem;

  return (
    <section id="tools" className="relative px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading eyebrow={eyebrow} title={title} />
        {description && (
          <p
            className="text-sm md:text-base max-w-2xl -mt-8 mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            {description}
          </p>
        )}

        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || eyebrow}
              className="w-full h-full object-contain p-6 md:p-10"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <span
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ border: "1px dashed var(--line)", color: "var(--text-dim)" }}
              >
                Menunggu gambar diunggah
              </span>
              <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                Isi <code>toolsForSystem.imageUrl</code> di src/data/content.js
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
