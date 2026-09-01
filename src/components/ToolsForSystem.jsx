import { toolsForSystem } from "../data/content";
import SectionHeading from "./SectionHeading";

// Section 16:9 tunggal untuk menampilkan kolase/screenshot tools kerja.
// Frameless & transparan — tanpa box/background sendiri — supaya logo PNG
// (grafis putih, tanpa background) langsung menyatu dengan background
// gelap halaman, tanpa ada kotak/shape navy yang kelihatan sebagai frame.
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

        <div className="relative w-full aspect-video flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || eyebrow}
              className="w-full h-full object-contain"
            />
          ) : (
            <div
              className="flex flex-col items-center gap-2 px-6 text-center w-full h-full justify-center rounded-2xl"
              style={{ border: "1px dashed var(--line)" }}
            >
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
