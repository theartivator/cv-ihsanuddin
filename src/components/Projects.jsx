import { projectsInternship } from "../data/content";

// Dinding logo proyek & magang — sekarang satu gambar wide 16:10
// (kolase logo yang sudah dirancang), section sendiri (slide sendiri
// saat scroll-snap), terpisah dari Perjalanan.
// imageUrl diisi lewat `projectsInternship` (src/data/content.js) —
// kosongkan lagi (null) kalau mau ganti gambar nanti.
export default function Projects() {
  const { imageUrl, imageAlt } = projectsInternship;

  return (
    <section id="projects" className="relative px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            Proyek &amp; Magang
          </p>
        </div>

        <div
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || "Proyek & Magang"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="flex flex-col items-center gap-2 px-6 text-center w-full h-full justify-center"
              style={{ border: "1px dashed var(--line)" }}
            >
              <span
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ border: "1px dashed var(--line)", color: "var(--text-dim)" }}
              >
                Menunggu gambar diunggah
              </span>
              <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                Isi <code>projectsInternship.imageUrl</code> di src/data/content.js
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
